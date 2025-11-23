import axios, { type AxiosRequestConfig, type AxiosError } from "axios";
import { getSession, signOut } from "next-auth/react";

const API_BASE_URL = "http://localhost:8000";

type AuthAwareRequestConfig = AxiosRequestConfig & {
    skipAuth?: boolean;
    accessTokenOverride?: string;
};

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

const unauthenticatedPaths = new Set([
    "/api/v1/token/",
    "/api/v1/token/refresh/",
]);

export const axiosClient = async <T>(config: AuthAwareRequestConfig): Promise<T> => {
    const { skipAuth, accessTokenOverride, ...axiosConfig } = config;
    const shouldSkipAuth =
        skipAuth === true ||
        (typeof axiosConfig.url === "string" && unauthenticatedPaths.has(axiosConfig.url)) ||
        Boolean(accessTokenOverride);

    const session = await getSession();

    // Check if session exists and token is not expired
    if (!shouldSkipAuth) {
        if (!session || session.error === "RefreshAccessTokenError") {
            // Redirect to login if no valid session or token refresh failed
            await signOut({ callbackUrl: "/login" });
            throw new Error("Authentication required");
        }
    }

    const headers: Record<string, string> = {
        ...(axiosConfig.headers as Record<string, string>),
    };

    if (!shouldSkipAuth && session?.access) {
        headers["Authorization"] = `Bearer ${session.access}`;
    }

    if (shouldSkipAuth && accessTokenOverride) {
        headers["Authorization"] = `Bearer ${accessTokenOverride}`;
    }

    // Optional: for logging
    headers["X-Request-ID"] ??= crypto.randomUUID?.() ?? "";

    const response = await rawAxios.request<T>({ ...axiosConfig, headers });

    return response.data as T;
};
