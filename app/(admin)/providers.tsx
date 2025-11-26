"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Refine } from "@refinedev/core";
import { RefineSnackbarProvider, useNotificationProvider } from "@refinedev/mui";
import { orvalDataProvider } from "@/lib/refine/dataProvider";
import { orvalAuthProvider } from "@/lib/refine/authProvider";

const queryClient = new QueryClient();

/**
 * Refine Providers
 * Centralized configuration for refine + React Query + MUI
 *
 * Architecture:
 * - authProvider: Handles all authentication (login, logout, check, getIdentity)
 * - dataProvider: Handles all API calls via Orval clients
 * - notificationProvider: MUI Snackbar for notifications
 *
 * Flow:
 * 1. User logs in → authProvider.login → next-auth → Django API
 * 2. Session stored in next-auth
 * 3. All API calls → dataProvider → Orval client → axiosClient → Django API
 * 4. axiosClient automatically attaches Bearer token from session
 *
 * @date 2025-11-22 (Taiwan Time)
 */
export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <RefineSnackbarProvider>
                <Refine
                    authProvider={orvalAuthProvider}
                    dataProvider={orvalDataProvider}
                    notificationProvider={useNotificationProvider}
                    resources={[
                        { name: "tables", list: "/tables", create: "/tables/create", edit: "/tables/edit/:id" },
                        { name: "table-zones", list: "/tables/zones", create: "/tables/zones/create", edit: "/tables/zones/edit/:id" },
                        { name: "reservations", list: "/reservations" },
                        { name: "menus", list: "/menus", create: "/menus/create", edit: "/menus/edit/:id" },
                        { name: "categories", list: "/categories", create: "/categories/create", edit: "/categories/edit/:id" },
                        { name: "customers", list: "/customers" },
                        { name: "orders", list: "/orders" },
                    ]}
                    options={{
                        // Disable auth redirect on check failure (we handle this in authProvider)
                        disableTelemetry: true,
                    }}
                >
                    {children}
                </Refine>
            </RefineSnackbarProvider>
        </QueryClientProvider>
    );
}
