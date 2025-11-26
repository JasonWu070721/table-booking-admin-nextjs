// app/(admin)/crm/loyalty/page.tsx
"use client";

import { useState, useMemo } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Stack,
    Typography,
    Card,
    CardContent,
    Grid,
    IconButton,
    Divider,
    InputAdornment,
    Alert,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";
import { HttpError, useCreate, useInvalidate } from "@refinedev/core";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import type { LoyaltyProgram } from "@/generated/models/loyaltyProgram";
import type { LoyaltyProgramRequest } from "@/generated/models/loyaltyProgramRequest";

/**
 * Loyalty Program Management Page
 * CRUD management for customer loyalty programs with optimized form inputs
 * Based on mainstream restaurant admin systems (Toast, Square, Lightspeed)
 * @date 2025-11-26
 */

interface TierConfig {
    name: string;
    min_points: string;
    multiplier: string;
}

export default function LoyaltyPage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState<LoyaltyProgramRequest>({
        name: "",
        points_per_dollar: "1",
        redemption_rate: "100",
        tier_config: undefined,
    });
    const [tiers, setTiers] = useState<TierConfig[]>([
        { name: "Bronze", min_points: "0", multiplier: "1.0" },
        { name: "Silver", min_points: "1000", multiplier: "1.2" },
        { name: "Gold", min_points: "5000", multiplier: "1.5" },
        { name: "Platinum", min_points: "10000", multiplier: "2.0" },
    ]);

    // Server-side grid powered by refine
    const { dataGridProps } = useDataGrid<LoyaltyProgram, HttpError>({
        resource: "loyalty",
        pagination: {
            mode: "server",
        },
        sorters: {
            initial: [{ field: "created_at", order: "desc" as const }],
        },
    });

    const createMutation = useCreate<LoyaltyProgramRequest, HttpError>();
    const invalidate = useInvalidate();

    const handleOpenCreate = () => {
        setFormData({
            name: "",
            points_per_dollar: "1",
            redemption_rate: "100",
            tier_config: undefined,
        });
        setTiers([
            { name: "Bronze", min_points: "0", multiplier: "1.0" },
            { name: "Silver", min_points: "1000", multiplier: "1.2" },
            { name: "Gold", min_points: "5000", multiplier: "1.5" },
            { name: "Platinum", min_points: "10000", multiplier: "2.0" },
        ]);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert tiers array to tier_config object
        const tierConfig: Record<string, any> = {};
        tiers.forEach((tier) => {
            tierConfig[tier.name.toUpperCase()] = {
                min_points: parseInt(tier.min_points) || 0,
                multiplier: parseFloat(tier.multiplier) || 1.0,
            };
        });

        const payload: LoyaltyProgramRequest = {
            ...formData,
            tier_config: Object.keys(tierConfig).length > 0 ? tierConfig : undefined,
        };

        createMutation.mutate(
            {
                resource: "loyalty",
                values: payload,
            },
            {
                onSuccess: () => {
                    invalidate({ resource: "loyalty", invalidates: ["list"] });
                    handleCloseDialog();
                },
            }
        );
    };

    const handleInputChange = (field: keyof LoyaltyProgramRequest, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleTierChange = (index: number, field: keyof TierConfig, value: string) => {
        const newTiers = [...tiers];
        newTiers[index] = { ...newTiers[index], [field]: value };
        setTiers(newTiers);
    };

    const handleAddTier = () => {
        setTiers([
            ...tiers,
            {
                name: `Tier ${tiers.length + 1}`,
                min_points: "0",
                multiplier: "1.0",
            },
        ]);
    };

    const handleRemoveTier = (index: number) => {
        setTiers(tiers.filter((_, i) => i !== index));
    };

    const columns: GridColDef<LoyaltyProgram>[] = useMemo(() => [
        { field: "id", headerName: "ID", width: 80 },
        {
            field: "name",
            headerName: "Program Name",
            flex: 1,
            minWidth: 250,
            renderCell: (params) => (
                <Stack direction="row" spacing={1} alignItems="center">
                    <LoyaltyIcon color="primary" />
                    <Typography fontWeight="medium">{params.value}</Typography>
                </Stack>
            ),
        },
        {
            field: "points_per_dollar",
            headerName: "Points per $",
            width: 140,
            renderCell: (params) => {
                const value = params.value || "1";
                return `${value} pts / $1`;
            },
        },
        {
            field: "redemption_rate",
            headerName: "Redemption Rate",
            width: 160,
            renderCell: (params) => {
                const value = params.value || "100";
                return `${value} pts = $1`;
            },
        },
        {
            field: "tier_config",
            headerName: "Tiers",
            flex: 1,
            minWidth: 200,
            renderCell: (params) => {
                const tierConfig = params.value as Record<string, any> | undefined;
                if (!tierConfig || Object.keys(tierConfig).length === 0) {
                    return <Typography color="text.secondary">No tiers configured</Typography>;
                }
                const tierCount = Object.keys(tierConfig).length;
                return (
                    <Stack direction="row" spacing={0.5}>
                        <WorkspacePremiumIcon fontSize="small" color="action" />
                        <Typography variant="body2">{tierCount} tier(s)</Typography>
                    </Stack>
                );
            },
        },
        {
            field: "created_at",
            headerName: "Created",
            width: 160,
            valueGetter: (params) => {
                const date = params?.value;
                return date ? new Date(date as string).toLocaleDateString() : "—";
            },
        },
    ], []);

    const isSubmitting = createMutation.isLoading;

    const pageSizeOptions = useMemo(() => [10, 25, 50], []);
    const dataGridSx = useMemo(() => ({
        "& .MuiDataGrid-cell": {
            py: 1,
        },
    }), []);

    return (
        <Box sx={{ width: "100%", height: "calc(100vh - 120px)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Box>
                    <Typography variant="h4" component="h1">
                        Loyalty Programs
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage customer loyalty programs and rewards configuration
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>
                    Create Program
                </Button>
            </Stack>

            {/* @ts-expect-error - MUI version conflict between @refinedev/mui and @mui/x-data-grid */}
            <DataGrid
                key="loyalty-grid"
                {...dataGridProps}
                columns={columns}
                pageSizeOptions={pageSizeOptions}
                disableRowSelectionOnClick
                sx={dataGridSx}
            />

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Create Loyalty Program</DialogTitle>
                    <DialogContent>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <Alert severity="info">
                                Configure how customers earn and redeem loyalty points. Tiers provide bonus
                                multipliers for high-value customers.
                            </Alert>

                            {/* Basic Information */}
                            <Typography variant="subtitle1" fontWeight="bold">
                                Program Details
                            </Typography>

                            <TextField
                                label="Program Name"
                                fullWidth
                                required
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                slotProps={{ htmlInput: { maxLength: 120 } }}
                                helperText="Display name for your loyalty program"
                            />

                            <Divider />

                            {/* Points Configuration */}
                            <Typography variant="subtitle1" fontWeight="bold">
                                Points Configuration
                            </Typography>

                            <TextField
                                label="Points Per Dollar"
                                type="number"
                                fullWidth
                                required
                                value={formData.points_per_dollar || "1"}
                                onChange={(e) => handleInputChange("points_per_dollar", e.target.value)}
                                slotProps={{
                                    htmlInput: { min: 0, step: 0.01 },
                                    input: {
                                        endAdornment: <InputAdornment position="end">pts / $1</InputAdornment>,
                                    },
                                }}
                                helperText="Number of points awarded for every dollar spent (e.g., 1 = 1 point per $1)"
                            />

                            <TextField
                                label="Redemption Rate"
                                type="number"
                                fullWidth
                                required
                                value={formData.redemption_rate || "100"}
                                onChange={(e) => handleInputChange("redemption_rate", e.target.value)}
                                slotProps={{
                                    htmlInput: { min: 1, step: 1 },
                                    input: {
                                        endAdornment: <InputAdornment position="end">pts = $1</InputAdornment>,
                                    },
                                }}
                                helperText="Points required to redeem $1 in value (e.g., 100 = 100 points = $1)"
                            />

                            <Card variant="outlined" sx={{ bgcolor: "background.default" }}>
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Example:</strong> If a customer spends $50 with{" "}
                                        <strong>{formData.points_per_dollar || "1"} points per dollar</strong>,
                                        they earn <strong>{(parseFloat(formData.points_per_dollar || "1") * 50).toFixed(2)} points</strong>.
                                        With a redemption rate of{" "}
                                        <strong>{formData.redemption_rate || "100"} points = $1</strong>, those points are worth{" "}
                                        <strong>
                                            $
                                            {(
                                                (parseFloat(formData.points_per_dollar || "1") * 50) /
                                                parseFloat(formData.redemption_rate || "100")
                                            ).toFixed(2)}
                                        </strong>
                                        .
                                    </Typography>
                                </CardContent>
                            </Card>

                            <Divider />

                            {/* Tier Configuration */}
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Tier Configuration (Optional)
                                </Typography>
                                <Button size="small" startIcon={<AddIcon />} onClick={handleAddTier}>
                                    Add Tier
                                </Button>
                            </Stack>

                            <Typography variant="body2" color="text.secondary">
                                Define customer tiers based on lifetime points earned. Higher tiers can have bonus
                                point multipliers.
                            </Typography>

                            <Grid container spacing={2}>
                                {tiers.map((tier, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Stack direction="row" spacing={2} alignItems="flex-start">
                                                    <TextField
                                                        label="Tier Name"
                                                        size="small"
                                                        value={tier.name}
                                                        onChange={(e) =>
                                                            handleTierChange(index, "name", e.target.value)
                                                        }
                                                        sx={{ flex: 2 }}
                                                    />
                                                    <TextField
                                                        label="Minimum Points"
                                                        type="number"
                                                        size="small"
                                                        value={tier.min_points}
                                                        onChange={(e) =>
                                                            handleTierChange(index, "min_points", e.target.value)
                                                        }
                                                        slotProps={{ htmlInput: { min: 0, step: 1 } }}
                                                        sx={{ flex: 2 }}
                                                    />
                                                    <TextField
                                                        label="Points Multiplier"
                                                        type="number"
                                                        size="small"
                                                        value={tier.multiplier}
                                                        onChange={(e) =>
                                                            handleTierChange(index, "multiplier", e.target.value)
                                                        }
                                                        slotProps={{
                                                            htmlInput: { min: 0, step: 0.1 },
                                                            input: {
                                                                endAdornment: (
                                                                    <InputAdornment position="end">x</InputAdornment>
                                                                ),
                                                            },
                                                        }}
                                                        sx={{ flex: 2 }}
                                                    />
                                                    <IconButton
                                                        color="error"
                                                        size="small"
                                                        onClick={() => handleRemoveTier(index)}
                                                        disabled={tiers.length <= 1}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            Create Program
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
