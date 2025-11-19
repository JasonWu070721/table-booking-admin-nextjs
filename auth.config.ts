/**
 * NextAuth configuration
 * Centralized authentication settings for multi-tenant SaaS
 * @date 2025-11-19 (Taiwan Time)
 */
export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },

  providers: [], // Add providers in [...nextauth]/route.ts
};