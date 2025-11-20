"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

/**
 * SessionProvider wrapper component
 * Provides NextAuth session context for the application
 *
 * @evaluated 2025-01-20 (Taiwan Time)
 */
export default function SessionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
