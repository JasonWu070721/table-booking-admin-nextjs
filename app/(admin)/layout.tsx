import RootLayout from "@/components/layout/RootLayout";
import SessionProvider from "@/components/providers/SessionProvider";

/**
 * Admin Layout
 * Wraps admin routes with SessionProvider and RootLayout
 *
 * @evaluated 2025-01-20 (Taiwan Time)
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <RootLayout>{children}</RootLayout>
        </SessionProvider>
    );
}