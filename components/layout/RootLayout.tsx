"use client";

import { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import AppBarTop from "./AppBar";

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
    const [open, setOpen] = useState(false);

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
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
