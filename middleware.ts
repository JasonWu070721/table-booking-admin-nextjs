import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * NextAuth Middleware
 * Protected routes configuration for multi-tenant SaaS
 * @date 2025-11-19 (Taiwan Time)
 */
export default withAuth(
  function middleware(req) {
    // Custom middleware logic can be added here
    // For example: tenant verification, role-based access control
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // User must have a valid token to access protected routes
        return !!token;
      },
    },
  }
);

// Protected routes configuration
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/reservations/:path*",
    "/tables/:path*",
    "/orders/:path*",
    "/floor/:path*",
    "/closures/:path*",
  ],
};
