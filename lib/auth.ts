/**
 * Authentication utility functions
 * Uses Orval-generated API clients (NO direct fetch/axios)
 *
 * @date 2025-11-22 (Taiwan Time)
 */

import { axiosClient } from "./axiosClient";
import { getToken } from "@/generated/token/token";
import type { TokenCreate200 } from "@/generated/models/tokenCreate200";
import type { TokenRefreshCreate200 } from "@/generated/models/tokenRefreshCreate200";
import type { UsersMeRetrieve200 } from "@/generated/models/usersMeRetrieve200";
import type { AxiosError } from "axios";

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  current_tenant: string | null;
  created_at: string;
}

/**
 * Obtain JWT tokens from Django backend
 * Uses Orval-generated tokenCreate client
 *
 * API: POST /api/v1/token/
 * Schema Reference: schema.yaml - TokenObtainPair
 *
 * Flow: refine authProvider → lib/auth → Orval client → Django API
 *
 * @param email - User email
 * @param password - User password
 * @returns Promise<TokenResponse> - Access and refresh tokens
 * @throws Error on authentication failure
 */
export async function obtainToken(email: string, password: string): Promise<TokenResponse> {
  const tokenApi = getToken();

  try {
    const envelope = await tokenApi.tokenCreate({ email, password });
    const tokens = (envelope as TokenCreate200).data;

    // Validate token structure
    if (!tokens.access || !tokens.refresh) {
      throw new Error("Invalid token response from server");
    }

    return {
      access: tokens.access,
      refresh: tokens.refresh,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ detail?: string }>;
    const errorMessage = axiosError?.response?.data?.detail || axiosError?.message || "Authentication failed";
    console.error("[Auth] Token API error:", errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Refresh access token using refresh token
 * Uses Orval-generated tokenRefreshCreate client
 *
 * API: POST /api/v1/token/refresh/
 * Called by next-auth JWT callback when access token expires
 *
 * @param refreshToken - Refresh token from session
 * @returns Promise<TokenResponse> - New access token
 * @throws Error on refresh failure
 */
export async function refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
  const tokenApi = getToken();
  try {
    const envelope = await tokenApi.tokenRefreshCreate({ refresh: refreshToken });
    const tokens = (envelope as TokenRefreshCreate200).data;

    return {
      access: tokens.access,
      refresh: refreshToken, // Keep the same refresh token (Django doesn't return a new one)
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ detail?: string }>;
    const errorMessage = axiosError?.response?.data?.detail || axiosError?.message || "Token refresh failed";
    console.error("[Auth] Token refresh error:", errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Fetch user profile from Django backend
 * Uses the shared Orval axios client to call /api/v1/users/me/ with an explicit token
 *
 * API: GET /api/v1/users/me/
 * Called by next-auth authorize callback during login
 *
 * @param accessToken - Access token from login
 * @returns Promise<UserProfile> - User profile data
 * @throws Error on fetch failure
 */
export async function getUserProfile(accessToken: string): Promise<UserProfile> {
  try {
    // Use Orval-generated client with explicit token (pre-session)
    const envelope = await axiosClient<UsersMeRetrieve200>({
      url: `/api/v1/users/me`,  // No trailing slash - backend has APPEND_SLASH=False
      method: "GET",
      skipAuth: true,
      accessTokenOverride: accessToken,
    });

    const user = envelope.data;

    return {
      id: user.id,
      email: user.email,
      name: user.name || "",
      current_tenant: user.current_tenant,
      created_at: user.created_at,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ detail?: string }>;
    const errorMessage = axiosError?.response?.data?.detail || axiosError?.message || "Failed to fetch user profile";
    console.error("[Auth] User profile error:", errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Calculate token expiration time (in seconds)
 * Django SimpleJWT default: access token expires in 5 minutes
 *
 * Used by next-auth JWT callback to track token expiration
 *
 * @returns number - Unix timestamp when token expires
 */
export function getTokenExpiration(): number {
  return Math.floor(Date.now() / 1000) + 5 * 60; // 5 minutes
}
