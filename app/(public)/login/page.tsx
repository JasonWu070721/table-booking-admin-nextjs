"use client";

import { Box, Container } from "@mui/material";
import LoginForm from "./LoginForm";

/**
 * Login Page
 * Displays authentication form with professional design
 * @date 2025-11-19 (Taiwan Time)
 *
 * Note: Using 'use client' to prevent SSR hydration mismatch with MUI
 */
export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
    </Box>
  );
}
