"use client";

import { useEffect, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import AppBarTop from "./AppBar";
import { resources } from "@/config/resources";
import { getAutoExpandedItems } from "./sidebarUtils";

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

/**
 * Root layout component with integrated AppBar and Sidebar
 * Manages drawer state for coordinated open/close animations
 *
 * @evaluated 2025-01-20 (Taiwan Time)
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const shouldAutoOpen =
            Object.keys(getAutoExpandedItems(resources, pathname)).length > 0;
        if (shouldAutoOpen) setOpen(true);
    }, [pathname]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* AppBar */}
            <AppBarTop open={open} onToggleSidebar={handleDrawerOpen} />

            {/* Sidebar */}
            <Sidebar open={open} onClose={handleDrawerClose} onOpen={handleDrawerOpen} />

            {/* Main Content Area */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, minWidth: 0 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
