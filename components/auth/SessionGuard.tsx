// components/auth/SessionGuard.tsx
"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * Session Guard component that monitors authentication state
 * Automatically redirects to login when:
 * 1. Token refresh fails (RefreshAccessTokenError)
 * 2. Session becomes invalid
 * 3. User is unauthenticated
 *
 * @evaluated 2025-11-22 (Taiwan Time)
 */
export default function SessionGuard({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // Check session status on mount and when it changes
        if (status === "loading") {
            return; // Still loading, wait
        }

        if (status === "unauthenticated") {
            // User is not authenticated, redirect to login
            router.push("/login");
            return;
        }

        if (session?.error === "RefreshAccessTokenError") {
            // Token refresh failed, sign out and redirect to login
            signOut({ callbackUrl: "/login" });
        }
    }, [session, status, router]);

    // Show loading or return children based on authentication status
    if (status === "loading") {
        return null; // Or a loading spinner
    }

    if (status === "unauthenticated") {
        return null; // Will redirect via useEffect
    }

    return <>{children}</>;
}
