// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

/**
 * NextAuth API route handler
 * @date 2025-11-21 (Taiwan Time)
 */

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
