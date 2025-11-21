import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const API_BASE_URL = "http://localhost:8000";

export const rawAxios = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false,
});

export const axiosClient = async <T>(config: AxiosRequestConfig): Promise<T> => {
    const session = await getSession();

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
