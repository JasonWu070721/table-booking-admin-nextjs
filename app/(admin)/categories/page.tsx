// app/(admin)/categories/page.tsx
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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { MenuCategory } from "@/generated/models/menuCategory";
import type { MenuCategoryRequest } from "@/generated/models/menuCategoryRequest";

/**
 * Categories Management Page
 * CRUD management for menu categories via refine + Orval data provider
 * @date 2025-11-23 (Taiwan Time)
 */
export default function CategoriesPage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null);
    const [formData, setFormData] = useState<MenuCategoryRequest>({
        name: "",
        description: "",
        display_order: 0,
        is_active: true,
    });

    // Server-side grid powered by refine
    const { dataGridProps } = useDataGrid<MenuCategory, HttpError>({
        resource: "categories",
        pagination: {
            mode: "server",
        },
        sorters: {
            initial: [{ field: "display_order", order: "asc" }],
        },
    });

    const createMutation = useCreate<MenuCategoryRequest, HttpError>();
    const updateMutation = useUpdate<MenuCategoryRequest, HttpError>();
    const { mutate: deleteCategory } = useDelete();
    const invalidate = useInvalidate();

    const handleOpenCreate = () => {
        setEditingCategory(null);
        setFormData({
            name: "",
            description: "",
            display_order: 0,
            is_active: true,
        });
        setOpenDialog(true);
    };

    const handleOpenEdit = (category: MenuCategory) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            description: category.description || "",
            display_order: category.display_order ?? 0,
            is_active: category.is_active ?? true,
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingCategory(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCategory) {
            updateMutation.mutate(
                {
                    resource: "categories",
                    id: editingCategory.id.toString(),
                    values: formData,
                },
                {
                    onSuccess: () => {
                        invalidate({ resource: "categories", invalidates: ["list"] });
                        handleCloseDialog();
                    },
                }
            );
        } else {
            createMutation.mutate(
                {
                    resource: "categories",
                    values: formData,
                },
                {
                    onSuccess: () => {
                        invalidate({ resource: "categories", invalidates: ["list"] });
                        handleCloseDialog();
                    },
                }
            );
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this category?")) {
            deleteCategory(
                {
                    resource: "categories",
                    id: id.toString(),
                },
                {
                    onSuccess: () => {
                        invalidate({ resource: "categories", invalidates: ["list"] });
                    },
                }
            );
        }
    };

    const handleInputChange = (field: keyof MenuCategoryRequest, value: string | number | boolean | undefined) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const columns: GridColDef<MenuCategory>[] = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "name", headerName: "Category Name", flex: 1, minWidth: 200 },
        { field: "description", headerName: "Description", flex: 1, minWidth: 240 },
        { field: "item_count", headerName: "Items", width: 100, type: "number" },
        { field: "display_order", headerName: "Order", width: 110, type: "number" },
        { field: "is_active", headerName: "Active", width: 100, type: "boolean" },
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

    const isSubmitting = createMutation.isLoading || updateMutation.isLoading;

    return (
        <Box sx={{ width: "100%", height: "calc(100vh - 120px)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Categories Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreate}
                >
                    Create Category
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

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{editingCategory ? "Edit Category" : "Create Category"}</DialogTitle>
                    <DialogContent>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <TextField
                                label="Category Name"
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
                                value={formData.description || ""}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                            />
                            <TextField
                                label="Display Order"
                                type="number"
                                fullWidth
                                value={formData.display_order ?? ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "display_order",
                                        e.target.value === "" ? undefined : Number(e.target.value)
                                    )
                                }
                                helperText="Lower numbers appear first"
                                slotProps={{ htmlInput: { min: 0 } }}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.is_active ?? true}
                                        onChange={(e) => handleInputChange("is_active", e.target.checked)}
                                    />
                                }
                                label="Active"
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            {editingCategory ? "Update" : "Create"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
