/**
 * Authentication utility functions
 * @date 2025-11-19 (Taiwan Time)
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";

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
 * API: POST /api/v1/token/
 * Schema Reference: schema.yaml - TokenObtainPair
 *
 * Request Body:
 * {
 *   "email": "user@example.com",
 *   "password": "password123"
 * }
 *
 * Response (200 OK):
 * {
 *   "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
 *   "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
 * }
 */
export async function obtainToken(email: string, password: string): Promise<TokenResponse> {
  const apiUrl = `${API_BASE_URL}/v1/token/`;

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({
      detail: "Authentication failed"
    }));
    console.error(`[Auth] Token API error:`, error);
    throw new Error(error.detail || "Invalid credentials");
  }

  const data = await res.json();

  // Django API returns data in envelope format: {"data": {"access": "...", "refresh": "..."}}
  // Unwrap the envelope if present
  const tokens = data.data || data;

  // Validate token structure
  if (!tokens.access || !tokens.refresh) {
    console.error("[Auth] Invalid token response structure:", data);
    throw new Error("Invalid token response from server");
  }

  return tokens;
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
  const res = await fetch(`${API_BASE_URL}/v1/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!res.ok) {
    throw new Error("Failed to refresh token");
  }

  return res.json();
}

/**
 * Fetch user profile from Django backend
 */
export async function getUserProfile(accessToken: string): Promise<UserProfile> {
  const res = await fetch(`${API_BASE_URL}/v1/users/me/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return res.json();
}

/**
 * Calculate token expiration time (in seconds)
 * Django SimpleJWT default: access token expires in 5 minutes
 */
export function getTokenExpiration(): number {
  return Math.floor(Date.now() / 1000) + 5 * 60; // 5 minutes
}
