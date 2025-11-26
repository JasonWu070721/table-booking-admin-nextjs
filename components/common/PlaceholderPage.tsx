// components/common/PlaceholderPage.tsx
"use client";

import { Box, Paper, Typography } from "@mui/material";
import { Construction } from "@mui/icons-material";

interface PlaceholderPageProps {
    title: string;
    description?: string;
}

/**
 * Placeholder page component for features under development
 * Used to maintain menu structure while building out functionality
 */
export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
    return (
        <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 6,
                    textAlign: "center",
                    bgcolor: "background.default",
                    border: "2px dashed",
                    borderColor: "divider",
                }}
            >
                <Construction sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {description || "This feature is coming soon"}
                </Typography>
            </Paper>
        </Box>
    );
}
