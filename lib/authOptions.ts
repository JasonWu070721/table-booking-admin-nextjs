// lib/authOptions.ts
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { obtainToken, getUserProfile, refreshAccessToken, getTokenExpiration } from "@/lib/auth";


export const authOptions: NextAuthOptions = {
    ...authConfig,

    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "your@email.com" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.error("[NextAuth] Missing credentials");
                    throw new Error("Email and password are required");
                }

                try {

                    const tokens = await obtainToken(credentials.email, credentials.password);
                    const userProfile = await getUserProfile(tokens.access);
                    const user = {
                        id: userProfile.id,
                        email: userProfile.email,
                        name: userProfile.name,
                        current_tenant: userProfile.current_tenant,
                        access: tokens.access,
                        refresh: tokens.refresh,
                    };

                    return user;
                } catch (error) {
                    console.error("[NextAuth] Authentication failed:", error);
                    return null;
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    callbacks: {
        async jwt({ token, user }) {
            // Initial sign in
            if (user) {
                token.id = Number(user.id);
                token.email = user.email;
                token.name = user.name;
                token.current_tenant = user.current_tenant;
                token.access = user.access;
                token.refresh = user.refresh;
                token.accessTokenExpires = getTokenExpiration();
            }

            // Token refresh logic
            // Check if access token has expired
            if (token.accessTokenExpires && Date.now() / 1000 > token.accessTokenExpires) {
                try {
                    const refreshedTokens = await refreshAccessToken(token.refresh as string);

                    return {
                        ...token,
                        access: refreshedTokens.access,
                        refresh: refreshedTokens.refresh ?? token.refresh,
                        accessTokenExpires: getTokenExpiration(),
                    };
                } catch (error) {
                    console.error("Token refresh error:", error);
                    return {
                        ...token,
                        error: "RefreshAccessTokenError",
                    };
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (token.error) {
                session.error = token.error;
            }

            session.user = {
                id: token.id as number,
                email: token.email as string,
                name: token.name as string,
                current_tenant: token.current_tenant as string | null,
            };

            session.access = token.access as string;
            session.refresh = token.refresh as string;

            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,

    debug: process.env.NODE_ENV === "development",
};
