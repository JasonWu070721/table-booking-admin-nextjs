// app/(admin)/crm/coupons/page.tsx
"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    Chip,
    Autocomplete,
    Divider,
} from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridActionsCellItem,
    GridPaginationModel,
    GridSortModel,
} from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { HttpError, useCreate, useUpdate, useDelete, useInvalidate, useList, type CrudSorting } from "@refinedev/core";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import type { Coupon } from "@/generated/models/coupon";
import type { CouponRequest } from "@/generated/models/couponRequest";
import { CouponRequestDiscountType } from "@/generated/models/couponRequestDiscountType";
import type { MenuCategory } from "@/generated/models/menuCategory";

/**
 * Coupons Management Page
 * CRUD management for promotional coupons with optimized form inputs
 * Based on mainstream restaurant admin systems (Toast, Square, Lightspeed)
 * @date 2025-11-26
 */
export default function CouponsPage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
    const [formData, setFormData] = useState<CouponRequest>({
        code: "",
        name: "",
        description: "",
        discount_type: CouponRequestDiscountType.PERCENTAGE,
        discount_value: "0",
        min_purchase_amount: "0",
        usage_limit: null,
        per_customer_limit: null,
        valid_from: null,
        valid_to: null,
        is_active: true,
        applicable_items: [],
        applicable_categories: [],
    });
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 25 });
    const [sortModel, setSortModel] = useState<GridSortModel>([{ field: "created_at", sort: "desc" }]);

    // Fetch categories for applicable_categories selector
    const { data: categoriesData } = useList<MenuCategory, HttpError>({
        resource: "categories",
        pagination: { mode: "off" },
    });
    const categories = categoriesData?.data ?? [];

    const sorters = useMemo<CrudSorting>(
        () =>
            sortModel
                .filter((item) => !!item.sort)
                .map((item) => ({
                    field: item.field,
                    order: item.sort === "desc" ? "desc" : "asc",
                })),
        [sortModel]
    );

    const {
        data: couponsData,
        isLoading: isCouponsLoading,
        isFetching: isCouponsFetching,
        refetch: refetchCoupons,
    } = useList<Coupon, HttpError>({
        resource: "coupons",
        pagination: {
            mode: "server",
            current: paginationModel.page + 1,
            pageSize: paginationModel.pageSize,
        },
        sorters,
        queryOptions: {
            keepPreviousData: true,
        },
    });

    const coupons = couponsData?.data ?? [];
    const totalCoupons = couponsData?.total ?? 0;

    const createMutation = useCreate<CouponRequest, HttpError>();
    const updateMutation = useUpdate<CouponRequest, HttpError>();
    const { mutate: deleteCoupon } = useDelete();
    const invalidate = useInvalidate();

    const isMountedRef = useRef(false);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const handlePaginationModelChange = useCallback(
        (model: GridPaginationModel) => {
            if (!isMountedRef.current) return;
            setPaginationModel(model);
        },
        []
    );

    const handleSortModelChange = useCallback(
        (model: GridSortModel) => {
            if (!isMountedRef.current) return;
            setSortModel(model);
        },
        []
    );

    const refreshGrid = useCallback(() => {
        invalidate({ resource: "coupons", invalidates: ["list"] });
        void refetchCoupons();
    }, [invalidate, refetchCoupons]);

    const handleOpenCreate = () => {
        setEditingCoupon(null);
        setFormData({
            code: generateCouponCode(),
            name: "",
            description: "",
            discount_type: CouponRequestDiscountType.PERCENTAGE,
            discount_value: "0",
            min_purchase_amount: "0",
            usage_limit: null,
            per_customer_limit: null,
            valid_from: null,
            valid_to: null,
            is_active: true,
            applicable_items: [],
            applicable_categories: [],
        });
        setOpenDialog(true);
    };

    const handleOpenEdit = useCallback((coupon: Coupon) => {
        setEditingCoupon(coupon);
        setFormData({
            code: coupon.code,
            name: coupon.name,
            description: coupon.description || "",
            discount_type: coupon.discount_type,
            discount_value: coupon.discount_value,
            min_purchase_amount: coupon.min_purchase_amount || "0",
            usage_limit: coupon.usage_limit,
            per_customer_limit: coupon.per_customer_limit,
            valid_from: coupon.valid_from,
            valid_to: coupon.valid_to,
            is_active: coupon.is_active ?? true,
            applicable_items: coupon.applicable_items || [],
            applicable_categories: coupon.applicable_categories || [],
        });
        setOpenDialog(true);
    }, []);

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingCoupon(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCoupon) {
            updateMutation.mutate(
                {
                    resource: "coupons",
                    id: editingCoupon.id.toString(),
                    values: formData,
                },
                {
                    onSuccess: () => {
                        refreshGrid();
                        handleCloseDialog();
                    },
                }
            );
        } else {
            createMutation.mutate(
                {
                    resource: "coupons",
                    values: formData,
                },
                {
                    onSuccess: () => {
                        refreshGrid();
                        handleCloseDialog();
                    },
                }
            );
        }
    };

    const handleDelete = useCallback((id: number) => {
        if (confirm("Are you sure you want to delete this coupon?")) {
            deleteCoupon(
                {
                    resource: "coupons",
                    id: id.toString(),
                },
                {
                    onSuccess: () => {
                        refreshGrid();
                    },
                }
            );
        }
    }, [deleteCoupon, refreshGrid]);

    const handleInputChange = (field: keyof CouponRequest, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Auto-generate coupon code (format: SAVE20-XXXX)
    const generateCouponCode = () => {
        const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `SAVE-${randomPart}`;
    };

    const columns: GridColDef<Coupon>[] = useMemo(() => [
        { field: "id", headerName: "ID", width: 80 },
        {
            field: "code",
            headerName: "Code",
            flex: 1,
            minWidth: 140,
            renderCell: (params) => (
                <Chip
                    icon={<LocalOfferIcon />}
                    label={params.value}
                    size="small"
                    color="primary"
                    variant="outlined"
                />
            ),
        },
        { field: "name", headerName: "Name", flex: 1, minWidth: 200 },
        {
            field: "discount_type",
            headerName: "Type",
            width: 140,
            valueFormatter: (params) => {
                const type = params?.value as string;
                return type?.replace("_", " ") || "";
            },
        },
        {
            field: "discount_value",
            headerName: "Discount",
            width: 120,
            renderCell: (params) => {
                const type = params.row.discount_type;
                const value = params.value;
                if (type === CouponRequestDiscountType.PERCENTAGE) {
                    return `${value}%`;
                } else if (type === CouponRequestDiscountType.FIXED_AMOUNT) {
                    return `$${value}`;
                }
                return "Free Item";
            },
        },
        {
            field: "usage_count",
            headerName: "Used",
            width: 100,
            type: "number",
            renderCell: (params) => {
                const used = params.value ?? 0;
                const limit = params.row.usage_limit;
                return limit ? `${used} / ${limit}` : used;
            },
        },
        {
            field: "valid_from",
            headerName: "Valid From",
            width: 160,
            valueGetter: (params) => {
                const date = params?.value;
                return date ? new Date(date as string).toLocaleDateString() : "—";
            },
        },
        {
            field: "valid_to",
            headerName: "Valid To",
            width: 160,
            valueGetter: (params) => {
                const date = params?.value;
                return date ? new Date(date as string).toLocaleDateString() : "—";
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
    ], [handleOpenEdit, handleDelete]);

    const isSubmitting = createMutation.isLoading || updateMutation.isLoading;

    const pageSizeOptions = useMemo(() => [10, 25, 50, 100], []);
    const dataGridSx = useMemo(() => ({
        "& .MuiDataGrid-cell": {
            py: 1,
        },
    }), []);
    const gridLoading = isCouponsLoading || isCouponsFetching;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ width: "100%", height: "calc(100vh - 120px)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Box>
                    <Typography variant="h4" component="h1">
                        Coupons Management
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Create and manage promotional coupons for customers
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>
                    Create Coupon
                </Button>
            </Stack>

            <DataGrid
                rows={coupons}
                rowCount={totalCoupons}
                columns={columns}
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                sortingMode="server"
                sortModel={sortModel}
                onSortModelChange={handleSortModelChange}
                loading={gridLoading}
                pageSizeOptions={pageSizeOptions}
                disableRowSelectionOnClick
                sx={dataGridSx}
            />

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{editingCoupon ? "Edit Coupon" : "Create Coupon"}</DialogTitle>
                    <DialogContent>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            {/* Basic Information */}
                            <Typography variant="subtitle1" fontWeight="bold">
                                Basic Information
                            </Typography>

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <TextField
                                    label="Coupon Code"
                                    fullWidth
                                    required
                                    value={formData.code}
                                    onChange={(e) => handleInputChange("code", e.target.value.toUpperCase())}
                                    slotProps={{
                                        htmlInput: { maxLength: 40 },
                                    }}
                                    helperText="Uppercase letters and numbers only"
                                />
                                <Button
                                    variant="outlined"
                                    onClick={() => handleInputChange("code", generateCouponCode())}
                                    sx={{ minWidth: 140 }}
                                >
                                    Generate
                                </Button>
                            </Stack>

                            <TextField
                                label="Coupon Name"
                                fullWidth
                                required
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                slotProps={{ htmlInput: { maxLength: 120 } }}
                                helperText="Display name for the coupon"
                            />

                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={2}
                                value={formData.description || ""}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                helperText="Optional description of coupon terms"
                            />

                            <Divider />

                            {/* Discount Settings */}
                            <Typography variant="subtitle1" fontWeight="bold">
                                Discount Settings
                            </Typography>

                            <FormControl fullWidth required>
                                <InputLabel>Discount Type</InputLabel>
                                <Select
                                    value={formData.discount_type ?? CouponRequestDiscountType.PERCENTAGE}
                                    onChange={(e) => handleInputChange("discount_type", e.target.value)}
                                    label="Discount Type"
                                >
                                    <MenuItem value={CouponRequestDiscountType.PERCENTAGE}>
                                        Percentage Off
                                    </MenuItem>
                                    <MenuItem value={CouponRequestDiscountType.FIXED_AMOUNT}>
                                        Fixed Amount Off
                                    </MenuItem>
                                    <MenuItem value={CouponRequestDiscountType.FREE_ITEM}>Free Item</MenuItem>
                                </Select>
                            </FormControl>

                            {formData.discount_type !== CouponRequestDiscountType.FREE_ITEM && (
                                <TextField
                                    label="Discount Value"
                                    type="number"
                                    fullWidth
                                    required
                                    value={formData.discount_value}
                                    onChange={(e) => handleInputChange("discount_value", e.target.value)}
                                    slotProps={{
                                        htmlInput: {
                                            min: 0,
                                            step: formData.discount_type === CouponRequestDiscountType.PERCENTAGE ? 1 : 0.01,
                                            max: formData.discount_type === CouponRequestDiscountType.PERCENTAGE ? 100 : undefined,
                                        },
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {formData.discount_type === CouponRequestDiscountType.PERCENTAGE
                                                        ? "%"
                                                        : "$"}
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            )}

                            <TextField
                                label="Minimum Purchase Amount"
                                type="number"
                                fullWidth
                                value={formData.min_purchase_amount || "0"}
                                onChange={(e) => handleInputChange("min_purchase_amount", e.target.value)}
                                slotProps={{
                                    htmlInput: { min: 0, step: 0.01 },
                                    input: {
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    },
                                }}
                                helperText="Minimum order total required to use coupon"
                            />

                            <Divider />

                            {/* Usage Limits */}
                            <Typography variant="subtitle1" fontWeight="bold">
                                Usage Limits
                            </Typography>

                            <TextField
                                label="Total Usage Limit"
                                type="number"
                                fullWidth
                                value={formData.usage_limit ?? ""}
                                onChange={(e) =>
                                    handleInputChange("usage_limit", e.target.value === "" ? null : Number(e.target.value))
                                }
                                slotProps={{ htmlInput: { min: 0 } }}
                                helperText="Total number of times coupon can be used (leave empty for unlimited)"
                            />

                            <TextField
                                label="Per Customer Limit"
                                type="number"
                                fullWidth
                                value={formData.per_customer_limit ?? ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "per_customer_limit",
                                        e.target.value === "" ? null : Number(e.target.value)
                                    )
                                }
                                slotProps={{ htmlInput: { min: 0 } }}
                                helperText="Max uses per customer (leave empty for unlimited)"
                            />

                            <Divider />

                            {/* Validity Period */}
                            <Typography variant="subtitle1" fontWeight="bold">
                                Validity Period
                            </Typography>

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <DateTimePicker
                                    label="Valid From"
                                    value={formData.valid_from ? new Date(formData.valid_from) : null}
                                    onChange={(date) =>
                                        handleInputChange("valid_from", date ? date.toISOString() : null)
                                    }
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            helperText: "Start date (optional)",
                                        },
                                    }}
                                />
                                <DateTimePicker
                                    label="Valid To"
                                    value={formData.valid_to ? new Date(formData.valid_to) : null}
                                    onChange={(date) => handleInputChange("valid_to", date ? date.toISOString() : null)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            helperText: "End date (optional)",
                                        },
                                    }}
                                />
                            </Stack>

                            <Divider />

                            {/* Applicable Items/Categories */}
                            <Typography variant="subtitle1" fontWeight="bold">
                                Applicable Items
                            </Typography>

                            <Autocomplete
                                multiple
                                options={categories}
                                getOptionLabel={(option) => option.name}
                                value={categories.filter((cat) =>
                                    formData.applicable_categories?.includes(cat.id)
                                )}
                                onChange={(_, newValue) =>
                                    handleInputChange(
                                        "applicable_categories",
                                        newValue.map((cat) => cat.id)
                                    )
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Applicable Categories"
                                        helperText="Select categories this coupon applies to (empty = all categories)"
                                    />
                                )}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            {...getTagProps({ index })}
                                            key={option.id}
                                            label={option.name}
                                            size="small"
                                        />
                                    ))
                                }
                            />

                            <Typography variant="caption" color="text.secondary">
                                Note: Specific menu items can be added after creation via the Coupon Details page
                            </Typography>

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
                            {editingCoupon ? "Update" : "Create"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            </Box>
        </LocalizationProvider>
    );
}
