// app/(admin)/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

import SessionProvider from "@/components/providers/SessionProvider";
import SessionGuard from "@/components/auth/SessionGuard";
import Providers from "./providers";
import RootLayout from "@/components/layout/RootLayout";


export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await getServerSession(authOptions);
    if (!session || !session.access) {

        redirect("/login");
    }

    return (
        <SessionProvider>
            <SessionGuard>
                <Providers>
                    <RootLayout>{children}</RootLayout>
                </Providers>
            </SessionGuard>
        </SessionProvider>
    );
}
