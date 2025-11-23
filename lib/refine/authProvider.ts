// lib/refine/authProvider.ts
import type { AuthProvider } from "@refinedev/core";
import { signIn, signOut, getSession } from "next-auth/react";
import { getToken } from "@/generated/token/token";
import { getUsers } from "@/generated/users/users";
import type { User } from "@/generated/models/user";

/**
 * Refine AuthProvider for Django REST Framework + SimpleJWT
 *
 * All authentication operations go through refine authProvider:
 * - Login → tokenCreate (Orval client)
 * - Logout → next-auth signOut
 * - Check auth → getSession (next-auth)
 * - Get identity → usersMeRetrieve (Orval client)
 * - Token refresh → handled by next-auth callbacks (authOptions.ts)
 *
 * Flow:
 * 1. User logs in → refine authProvider.login
 * 2. authProvider calls Orval tokenCreate API
 * 3. Pass credentials to next-auth signIn
 * 4. next-auth stores tokens in session
 * 5. axiosClient automatically uses session token for API calls
 *
 * @date 2025-11-22 (Taiwan Time)
 */

const tokenApi = getToken();
const usersApi = getUsers();

export const orvalAuthProvider: AuthProvider = {
  /**
   * Login handler
   * Called when user submits login form
   *
   * @param email - User email
   * @param password - User password
   * @returns Promise<{ success: true, redirectTo?: string }> on success
   * @throws Error on failure
   */
  login: async ({ email, password }) => {
    try {
      // Call next-auth signIn with credentials
      // next-auth will call authOptions.authorize which uses Orval client
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.error("[AuthProvider] Login failed:", result.error);
        return {
          success: false,
          error: {
            name: "LoginError",
            message: result.error || "Invalid credentials",
          },
        };
      }

      console.log("[AuthProvider] Login successful");
      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error) {
      console.error("[AuthProvider] Login error:", error);
      return {
        success: false,
        error: {
          name: "LoginError",
          message: error instanceof Error ? error.message : "Login failed",
        },
      };
    }
  },

  /**
   * Logout handler
   * Called when user clicks logout button
   *
   * @returns Promise<{ success: true, redirectTo: string }>
   */
  logout: async () => {
    console.log("[AuthProvider] Logging out");
    await signOut({
      redirect: false,
    });

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  /**
   * Check authentication status
   * Called on every route change and page load
   *
   * @returns Promise<{ authenticated: boolean }>
   */
  check: async () => {
    const session = await getSession();

    // Check if session exists and token is not expired
    if (!session || session.error === "RefreshAccessTokenError") {
      console.warn("[AuthProvider] Authentication check failed - no valid session");
      return {
        authenticated: false,
        redirectTo: "/login",
        logout: true,
      };
    }

    return {
      authenticated: true,
    };
  },

  /**
   * Get user identity
   * Called by refine to display user info in UI
   * Uses Orval client to fetch user profile from Django API
   *
   * @returns Promise<User> - User profile from Django API
   */
  getIdentity: async (): Promise<User | null> => {
    try {
      const session = await getSession();

      if (!session?.access) {
        console.warn("[AuthProvider] No access token in session");
        return null;
      }

      // Use Orval-generated client to fetch user profile
      // axiosClient will automatically attach Bearer token from session
      const response = await usersApi.usersMeRetrieve();

      // API returns envelope format: { data: User, meta?: ..., links?: ... }
      const user = response.data;

      console.log("[AuthProvider] User identity retrieved:", user.email);
      return user;
    } catch (error) {
      console.error("[AuthProvider] Failed to get user identity:", error);
      return null;
    }
  },

  /**
   * Handle authentication errors
   * Called when API returns 401 or 403
   *
   * @param error - Error object from API call
   * @returns Promise<{ redirectTo?: string, logout?: boolean, error?: any }>
   */
  onError: async (error) => {
    console.error("[AuthProvider] Error occurred:", error);

    // If 401 Unauthorized, redirect to login
    if (error?.status === 401 || error?.statusCode === 401) {
      return {
        redirectTo: "/login",
        logout: true,
        error,
      };
    }

    // For other errors, don't logout
    return {
      error,
    };
  },

  /**
   * Get permissions
   * Called by refine to check user permissions (optional)
   *
   * @returns Promise<any> - User permissions (future: RBAC roles)
   */
  getPermissions: async () => {
    const session = await getSession();

    if (!session) {
      return null;
    }

    // Future: Return user role (Owner/Admin/Member) from session or API
    // For now, return basic auth status
    return session.user;
  },
};
