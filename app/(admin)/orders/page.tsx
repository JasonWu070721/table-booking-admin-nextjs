"use client";

import { Box, Container, Typography, Paper } from "@mui/material";

/**
 * Dashboard Page
 * Main admin dashboard for table booking management
 * @date 2025-11-19 (Taiwan Time)
 */
export default function Dashboard() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom>
          Orders
        </Typography>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Welcome to Table Booking Admin
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This is your admin dashboard. Start managing your restaurant bookings here.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
