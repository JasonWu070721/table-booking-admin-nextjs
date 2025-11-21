// app/(admin)/menus/page.tsx
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
} from "@mui/material";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";
import { HttpError, useCreate, useUpdate, useDelete, useInvalidate } from "@refinedev/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import type { Menu } from "@/generated/models/menu";
import type { MenuRequest } from "@/generated/models/menuRequest";

/**
 * Menus Management Page
 * Full CRUD interface for restaurant menus with refine hooks
 * @date 2025-11-21 (Taiwan Time)
 */
export default function MenusPage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
    const [formData, setFormData] = useState<MenuRequest>({
        name: "",
        description: "",
        is_available: true,
        available_from_time: null,
        available_to_time: null,
        available_weekdays: [],
        display_order: 0,
        is_active: true,
    });

    // refine DataGrid hook for listing
    const { dataGridProps } = useDataGrid<Menu, HttpError>({
        resource: "menus",
        pagination: {
            mode: "server",
        },
        sorters: {
            initial: [{ field: "display_order", order: "asc" }],
        },
    });

    // refine CRUD hooks
    const createMutation = useCreate<MenuRequest, HttpError>();
    const updateMutation = useUpdate<MenuRequest, HttpError>();
    const { mutate: deleteMenu } = useDelete();
    const invalidate = useInvalidate();

    const handleOpenCreate = () => {
        setEditingMenu(null);
        setFormData({
            name: "",
            description: "",
            is_available: true,
            available_from_time: null,
            available_to_time: null,
            available_weekdays: [],
            display_order: 0,
            is_active: true,
        });
        setOpenDialog(true);
    };

    const handleOpenEdit = (menu: Menu) => {
        setEditingMenu(menu);
        setFormData({
            name: menu.name,
            description: menu.description || "",
            is_available: menu.is_available ?? true,
            available_from_time: menu.available_from_time,
            available_to_time: menu.available_to_time,
            available_weekdays: menu.available_weekdays || [],
            display_order: menu.display_order ?? 0,
            is_active: menu.is_active ?? true,
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingMenu(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingMenu) {
            // Update existing menu
            updateMutation.mutate(
                {
                    resource: "menus",
                    id: editingMenu.id.toString(),
                    values: formData,
                },
                {
                    onSuccess: () => {
                        invalidate({
                            resource: "menus",
                            invalidates: ["list"],
                        });
                        handleCloseDialog();
                    },
                }
            );
        } else {
            // Create new menu
            createMutation.mutate(
                {
                    resource: "menus",
                    values: formData,
                },
                {
                    onSuccess: () => {
                        invalidate({
                            resource: "menus",
                            invalidates: ["list"],
                        });
                        handleCloseDialog();
                    },
                }
            );
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this menu?")) {
            deleteMenu(
                {
                    resource: "menus",
                    id: id.toString(),
                },
                {
                    onSuccess: () => {
                        invalidate({
                            resource: "menus",
                            invalidates: ["list"],
                        });
                    },
                }
            );
        }
    };

    const handleInputChange = (field: keyof MenuRequest, value: string | number | boolean | null | unknown) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const columns: GridColDef<Menu>[] = [
        {
            field: "id",
            headerName: "ID",
            width: 80,
        },
        {
            field: "name",
            headerName: "Menu Name",
            flex: 1,
            minWidth: 200,
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
            minWidth: 250,
        },
        {
            field: "item_count",
            headerName: "Items",
            width: 100,
            type: "number",
        },
        {
            field: "available_item_count",
            headerName: "Available",
            width: 120,
            type: "number",
        },
        {
            field: "is_available",
            headerName: "Available",
            width: 120,
            type: "boolean",
        },
        {
            field: "is_active",
            headerName: "Active",
            width: 100,
            type: "boolean",
        },
        {
            field: "display_order",
            headerName: "Order",
            width: 100,
            type: "number",
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

    const isLoading = false; // Simplified for now - form will show loading state on submit

    return (
        <Box sx={{ width: "100%", height: "calc(100vh - 120px)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Menus Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreate}
                >
                    Create Menu
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
                        {editingMenu ? "Edit Menu" : "Create Menu"}
                    </DialogTitle>
                    <DialogContent>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <TextField
                                label="Menu Name"
                                fullWidth
                                required
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                slotProps={{ htmlInput: { maxLength: 100 } }}
                            />

                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={3}
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                            />

                            <TextField
                                label="Display Order"
                                type="number"
                                fullWidth
                                value={formData.display_order}
                                onChange={(e) => handleInputChange("display_order", Number(e.target.value))}
                            />

                            <TextField
                                label="Available From Time (HH:MM)"
                                placeholder="11:00"
                                fullWidth
                                value={formData.available_from_time || ""}
                                onChange={(e) => handleInputChange("available_from_time", e.target.value || null)}
                                helperText="Optional: Daily start time"
                            />

                            <TextField
                                label="Available To Time (HH:MM)"
                                placeholder="22:00"
                                fullWidth
                                value={formData.available_to_time || ""}
                                onChange={(e) => handleInputChange("available_to_time", e.target.value || null)}
                                helperText="Optional: Daily end time"
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.is_available}
                                        onChange={(e) => handleInputChange("is_available", e.target.checked)}
                                    />
                                }
                                label="Available for Ordering"
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
                            disabled={isLoading}
                        >
                            {editingMenu ? "Update" : "Create"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
