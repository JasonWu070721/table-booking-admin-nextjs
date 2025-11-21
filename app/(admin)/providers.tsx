"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Refine } from "@refinedev/core";
import { RefineSnackbarProvider, useNotificationProvider } from "@refinedev/mui";
import { orvalDataProvider } from "@/lib/refine/dataProvider";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <RefineSnackbarProvider>
                <Refine
                    dataProvider={orvalDataProvider}
                    notificationProvider={useNotificationProvider}
                    resources={[
                        { name: "tables", list: "/tables", create: "/tables/create", edit: "/tables/edit/:id" },
                        { name: "table-zones", list: "/tables/zones", create: "/tables/zones/create", edit: "/tables/zones/edit/:id" },
                        { name: "reservations", list: "/reservations" },
                        { name: "menus", list: "/menus", create: "/menus/create", edit: "/menus/edit/:id" },
                    ]}
                >
                    {children}
                </Refine>
            </RefineSnackbarProvider>
        </QueryClientProvider>
    );
}
