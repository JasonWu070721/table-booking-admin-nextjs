// app/(admin)/tables/page.tsx
"use client";

import { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Switch,
    FormControlLabel,
    Stack,
    Typography,
    Chip,
} from "@mui/material";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";
import { HttpError, useCreate, useUpdate, useDelete, useInvalidate } from "@refinedev/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import type { Table } from "@/generated/models/table";
import type { TableRequest } from "@/generated/models/tableRequest";

/**
 * Tables Management Page
 * Full CRUD interface for restaurant tables with refine hooks
 * @date 2025-11-21 (Taiwan Time)
 */
export default function TablesPage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [editingTable, setEditingTable] = useState<Table | null>(null);
    const [formData, setFormData] = useState<TableRequest>({
        name: "",
        capacity: 2,
        min_party_size: 1,
        zone: null,
        tags: [],
        features: [],
        state: "AVAILABLE",
        is_active: true,
    });

    // refine DataGrid hook for listing
    const { dataGridProps } = useDataGrid<Table, HttpError>({
        resource: "tables",
        pagination: {
            mode: "server",
        },
        sorters: {
            initial: [{ field: "name", order: "asc" }],
        },
    });

    // refine CRUD hooks
    const createMutation = useCreate<TableRequest, HttpError>();
    const updateMutation = useUpdate<TableRequest, HttpError>();
    const { mutate: deleteTable } = useDelete();
    const invalidate = useInvalidate();

    const handleOpenCreate = () => {
        setEditingTable(null);
        setFormData({
            name: "",
            capacity: 2,
            min_party_size: 1,
            zone: null,
            tags: [],
            features: [],
            state: "AVAILABLE",
            is_active: true,
        });
        setOpenDialog(true);
    };

    const handleOpenEdit = (table: Table) => {
        setEditingTable(table);
        setFormData({
            name: table.name,
            capacity: table.capacity,
            min_party_size: table.min_party_size ?? 1,
            zone: table.zone,
            tags: table.tags || [],
            features: table.features || [],
            state: table.state,
            is_active: table.is_active ?? true,
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingTable(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingTable) {
            // Update existing table
            updateMutation.mutate(
                {
                    resource: "tables",
                    id: editingTable.id.toString(),
                    values: formData,
                },
                {
                    onSuccess: () => {
                        invalidate({
                            resource: "tables",
                            invalidates: ["list"],
                        });
                        handleCloseDialog();
                    },
                }
            );
        } else {
            // Create new table
            createMutation.mutate(
                {
                    resource: "tables",
                    values: formData,
                },
                {
                    onSuccess: () => {
                        invalidate({
                            resource: "tables",
                            invalidates: ["list"],
                        });
                        handleCloseDialog();
                    },
                }
            );
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this table?")) {
            deleteTable(
                {
                    resource: "tables",
                    id: id.toString(),
                },
                {
                    onSuccess: () => {
                        invalidate({
                            resource: "tables",
                            invalidates: ["list"],
                        });
                    },
                }
            );
        }
    };

    const handleInputChange = (field: keyof TableRequest, value: string | number | boolean | null | unknown) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const columns: GridColDef<Table>[] = [
        {
            field: "id",
            headerName: "ID",
            width: 80,
        },
        {
            field: "name",
            headerName: "Table Name",
            flex: 1,
            minWidth: 150,
        },
        {
            field: "capacity",
            headerName: "Capacity",
            width: 120,
            type: "number",
        },
        {
            field: "min_party_size",
            headerName: "Min Party",
            width: 120,
            type: "number",
        },
        {
            field: "zone_name",
            headerName: "Zone",
            flex: 1,
            minWidth: 150,
        },
        {
            field: "tag_names",
            headerName: "Tags",
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {params.row.tag_names.map((tag: string, index: number) => (
                        <Chip key={index} label={tag} size="small" />
                    ))}
                </Box>
            ),
        },
        {
            field: "current_state",
            headerName: "Status",
            width: 130,
            renderCell: (params) => {
                const statusColors: Record<string, "success" | "warning" | "error" | "default"> = {
                    AVAILABLE: "success",
                    OCCUPIED: "warning",
                    RESERVED: "warning",
                    UNAVAILABLE: "error",
                };
                return (
                    <Chip
                        label={params.value}
                        color={statusColors[params.value] || "default"}
                        size="small"
                    />
                );
            },
        },
        {
            field: "is_active",
            headerName: "Active",
            width: 100,
            type: "boolean",
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 120,
            getActions: (params) => [
                <GridActionsCellItem
                    key="edit"
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={() => handleOpenEdit(params.row)}
                />,
                <GridActionsCellItem
                    key="delete"
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDelete(params.row.id)}
                />,
            ],
        },
    ];

    return (
        <Box sx={{ width: "100%", height: "calc(100vh - 120px)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Tables Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreate}
                >
                    Create Table
                </Button>
            </Stack>

            <DataGrid
                {...dataGridProps}
                columns={columns}
                pageSizeOptions={[10, 25, 50, 100]}
                disableRowSelectionOnClick
                sx={{
                    "& .MuiDataGrid-cell": {
                        py: 1,
                    },
                }}
            />

            {/* Create/Edit Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>
                        {editingTable ? "Edit Table" : "Create Table"}
                    </DialogTitle>
                    <DialogContent>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <TextField
                                label="Table Name"
                                fullWidth
                                required
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                slotProps={{ htmlInput: { maxLength: 50 } }}
                            />

                            <TextField
                                label="Capacity"
                                type="number"
                                fullWidth
                                required
                                value={formData.capacity}
                                onChange={(e) => handleInputChange("capacity", Number(e.target.value))}
                                slotProps={{ htmlInput: { min: 1 } }}
                                helperText="Maximum number of guests"
                            />

                            <TextField
                                label="Minimum Party Size"
                                type="number"
                                fullWidth
                                value={formData.min_party_size}
                                onChange={(e) => handleInputChange("min_party_size", Number(e.target.value))}
                                slotProps={{ htmlInput: { min: 0 } }}
                                helperText="Minimum guests required (0 = no minimum)"
                            />

                            <TextField
                                label="Zone ID"
                                type="number"
                                fullWidth
                                value={formData.zone || ""}
                                onChange={(e) => handleInputChange("zone", e.target.value ? Number(e.target.value) : null)}
                                helperText="Optional: Assign to a zone"
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.is_active}
                                        onChange={(e) => handleInputChange("is_active", e.target.checked)}
                                    />
                                }
                                label="Active"
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            {editingTable ? "Update" : "Create"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
