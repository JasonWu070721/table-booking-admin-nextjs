// app/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

/**
 * Root page that handles authentication routing
 * Checks token expiration and redirects accordingly:
 * - Token expired or invalid → /login
 * - Token valid → /dashboard
 * @date 2025-11-22 (Taiwan Time)
 */
export default async function Home() {
  const session = await getServerSession(authOptions);

  // Check if user has valid session with access token
  if (!session || !session.access || session.error === "RefreshAccessTokenError") {
    // Token expired or no session, redirect to login
    redirect("/login");
  }

  // Valid session, redirect to dashboard
  redirect("/dashboard");
}
