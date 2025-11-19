import "next-auth";
import "next-auth/jwt";

/**
 * Extended NextAuth types for multi-tenant SaaS platform
 * @date 2025-11-19 (Taiwan Time)
 */

declare module "next-auth" {
  interface User {
    id?: number;
    email?: string;
    name?: string;
    access?: string;
    refresh?: string;
    current_tenant?: string | null;
  }

  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      current_tenant: string | null;
    };
    access: string;
    refresh: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: number;
    email?: string;
    name?: string;
    access?: string;
    refresh?: string;
    current_tenant?: string | null;
    accessTokenExpires?: number;
    error?: string;
  }
}
