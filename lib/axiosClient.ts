import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { getSession, signOut } from "next-auth/react";

const API_BASE_URL = "http://localhost:8000";

export const rawAxios = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false,
});

// Response interceptor for handling authentication errors
rawAxios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        // Handle 401 Unauthorized errors
        if (error.response?.status === 401) {
            // Redirect to login page
            await signOut({ callbackUrl: "/login" });
        }
        return Promise.reject(error);
    }
);

export const axiosClient = async <T>(config: AxiosRequestConfig): Promise<T> => {
    const session = await getSession();

    // Check if session exists and token is not expired
    if (!session || session.error === "RefreshAccessTokenError") {
        // Redirect to login if no valid session or token refresh failed
        await signOut({ callbackUrl: "/login" });
        throw new Error("Authentication required");
    }

    const headers: Record<string, string> = {
        ...(config.headers as Record<string, string>),
    };

    if (session?.access) {
        headers["Authorization"] = `Bearer ${session.access}`;
    }

    // Optional: for logging
    headers["X-Request-ID"] ??= crypto.randomUUID?.() ?? "";

    const response = await rawAxios.request<T>({
        ...config,
        headers,
    });

    return response.data as T;
};
