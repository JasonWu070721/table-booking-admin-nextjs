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

  // Note: providers are added in lib/authOptions.ts
  // Do NOT add empty providers array here as it may interfere with the spread operator
};