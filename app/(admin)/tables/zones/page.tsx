// app/(admin)/tables/zones/page.tsx
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
import type { TableZone } from "@/generated/models/tableZone";
import type { TableZoneRequest } from "@/generated/models/tableZoneRequest";

/**
 * Table Zones Management Page
 * Full CRUD interface for restaurant table zones with refine hooks
 * @date 2025-11-21 (Taiwan Time)
 */
export default function TableZonesPage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [editingZone, setEditingZone] = useState<TableZone | null>(null);
    const [formData, setFormData] = useState<TableZoneRequest>({
        name: "",
        is_active: true,
    });

    // refine DataGrid hook for listing
    const { dataGridProps } = useDataGrid<TableZone, HttpError>({
        resource: "table-zones",
        pagination: {
            mode: "server",
        },
        sorters: {
            initial: [{ field: "name", order: "asc" }],
        },
    });

    // refine CRUD hooks
    const createMutation = useCreate<TableZoneRequest, HttpError>();
    const updateMutation = useUpdate<TableZoneRequest, HttpError>();
    const { mutate: deleteZone } = useDelete();
    const invalidate = useInvalidate();

    const handleOpenCreate = () => {
        setEditingZone(null);
        setFormData({
            name: "",
            is_active: true,
        });
        setOpenDialog(true);
    };

    const handleOpenEdit = (zone: TableZone) => {
        setEditingZone(zone);
        setFormData({
            name: zone.name,
            is_active: zone.is_active ?? true,
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingZone(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingZone) {
            // Update existing zone
            updateMutation.mutate(
                {
                    resource: "table-zones",
                    id: editingZone.id.toString(),
                    values: formData,
                },
                {
                    onSuccess: () => {
                        invalidate({
                            resource: "table-zones",
                            invalidates: ["list"],
                        });
                        handleCloseDialog();
                    },
                }
            );
        } else {
            // Create new zone
            createMutation.mutate(
                {
                    resource: "table-zones",
                    values: formData,
                },
                {
                    onSuccess: () => {
                        invalidate({
                            resource: "table-zones",
                            invalidates: ["list"],
                        });
                        handleCloseDialog();
                    },
                }
            );
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this zone?")) {
            deleteZone(
                {
                    resource: "table-zones",
                    id: id.toString(),
                },
                {
                    onSuccess: () => {
                        invalidate({
                            resource: "table-zones",
                            invalidates: ["list"],
                        });
                    },
                }
            );
        }
    };

    const handleInputChange = (field: keyof TableZoneRequest, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const columns: GridColDef<TableZone>[] = [
        {
            field: "id",
            headerName: "ID",
            width: 80,
        },
        {
            field: "name",
            headerName: "Zone Name",
            flex: 1,
            minWidth: 200,
        },
        {
            field: "is_active",
            headerName: "Status",
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value ? "Active" : "Inactive"}
                    color={params.value ? "success" : "default"}
                    size="small"
                />
            ),
        },
        {
            field: "created_at",
            headerName: "Created At",
            width: 180,
            valueFormatter: (value) => {
                if (!value) return "";
                return new Date(value).toLocaleString();
            },
        },
        {
            field: "updated_at",
            headerName: "Updated At",
            width: 180,
            valueFormatter: (value) => {
                if (!value) return "";
                return new Date(value).toLocaleString();
            },
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
                    Table Zones Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreate}
                >
                    Create Zone
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
                        {editingZone ? "Edit Zone" : "Create Zone"}
                    </DialogTitle>
                    <DialogContent>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <TextField
                                label="Zone Name"
                                fullWidth
                                required
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                slotProps={{ htmlInput: { maxLength: 50 } }}
                                helperText="Maximum 50 characters"
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
                            {editingZone ? "Update" : "Create"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
