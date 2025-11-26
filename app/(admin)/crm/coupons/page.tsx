// app/(admin)/crm/coupons/page.tsx
"use client";

import { useState, useCallback, useMemo } from "react";
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    InputAdornment,
    Stack,
    Switch,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
} from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
    HttpError,
    useCreate,
    useDelete,
    useInvalidate,
    useUpdate,
    useList,
} from "@refinedev/core";
import { useDataGrid } from "@refinedev/mui";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ScheduleIcon from "@mui/icons-material/Schedule";
import type { Coupon } from "@/generated/models/coupon";
import type { CouponRequest } from "@/generated/models/couponRequest";
import { CouponRequestDiscountType } from "@/generated/models/couponRequestDiscountType";
import type { MenuCategory } from "@/generated/models/menuCategory";
import type { MenuItem as MenuItemModel } from "@/generated/models/menuItem";

type PresetRange = {
    label: string;
    days: number;
};

/**
 * Coupons Management Page
 * CRUD management for promotional coupons with optimized form inputs
 * Based on mainstream restaurant admin systems (Toast, Square, Lightspeed)
 * @date 2025-11-26
 */
export default function CouponsPage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
    const [formData, setFormData] = useState<CouponRequest>({
        code: "",
        name: "",
        description: "",
        discount_type: CouponRequestDiscountType.PERCENTAGE,
        discount_value: "10",
        min_purchase_amount: "0",
        usage_limit: null,
        per_customer_limit: null,
        valid_from: null,
        valid_to: null,
        is_active: true,
        applicable_items: [],
        applicable_categories: [],
    });
    const { dataGridProps, tableQueryResult } = useDataGrid<Coupon, HttpError>({
        resource: "coupons",
        pagination: {
            mode: "server",
            pageSize: 25,
        },
        sorters: {
            initial: [{ field: "created_at", order: "desc" }],
        },
    });

    // Fetch categories and items to power applicability selectors
    const { data: categoriesData } = useList<MenuCategory, HttpError>({
        resource: "categories",
        pagination: { mode: "off" },
        sorters: [{ field: "name", order: "asc" }],
    });
    const categories = categoriesData?.data ?? [];

    const { data: itemsData, isLoading: isItemsLoading } = useList<MenuItemModel, HttpError>({
        resource: "items",
        pagination: { mode: "off" },
        filters: [
            {
                field: "is_active",
                operator: "eq",
                value: true,
            },
        ],
        sorters: [{ field: "is_popular", order: "desc" }],
        queryOptions: {
            staleTime: 5 * 60 * 1000,
        },
    });
    const itemOptions = useMemo(() => itemsData?.data ?? [], [itemsData]);

    const coupons = (dataGridProps.rows as Coupon[]) ?? [];
    const totalCoupons = dataGridProps.rowCount ?? coupons.length;

    const createMutation = useCreate<CouponRequest, HttpError>({
        successNotification: () => ({
            message: "Coupon created",
            type: "success",
            key: `coupon-created-${Date.now()}`,
        }),
    });
    const updateMutation = useUpdate<CouponRequest, HttpError>({
        successNotification: () => ({
            message: "Coupon updated",
            type: "success",
            key: `coupon-updated-${Date.now()}`,
        }),
    });
    const { mutate: deleteCoupon } = useDelete<Coupon, HttpError>({
        successNotification: () => ({
            message: "Coupon deleted",
            type: "success",
            key: `coupon-deleted-${Date.now()}`,
        }),
    });
    const invalidate = useInvalidate();

    const refreshGrid = useCallback(() => {
        invalidate({ resource: "coupons", invalidates: ["list"] });
    }, [invalidate]);

    const handleOpenCreate = () => {
        setEditingCoupon(null);
        setFormError(null);
        setFormData({
            code: generateCouponCode(),
            name: "",
            description: "",
            discount_type: CouponRequestDiscountType.PERCENTAGE,
            discount_value: "10",
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
        setFormError(null);
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

    const addDays = (date: Date, days: number) => {
        const clone = new Date(date);
        clone.setDate(clone.getDate() + days);
        return clone;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (formData.discount_type === CouponRequestDiscountType.PERCENTAGE) {
            const value = Number(formData.discount_value);
            if (Number.isNaN(value) || value <= 0 || value > 100) {
                setFormError("Percentage discount must be between 1 and 100.");
                return;
            }
        }

        if (
            formData.valid_from &&
            formData.valid_to &&
            new Date(formData.valid_from).getTime() > new Date(formData.valid_to).getTime()
        ) {
            setFormError("End date must be after start date.");
            return;
        }

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

    const handleDelete = useCallback(
        (id: number) => {
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
        },
        [deleteCoupon, refreshGrid]
    );

    const handleInputChange = (field: keyof CouponRequest, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDiscountTypeChange = (_: unknown, value: CouponRequestDiscountType) => {
        if (!value) return;
        setFormData((prev) => ({
            ...prev,
            discount_type: value,
            discount_value:
                value === CouponRequestDiscountType.FREE_ITEM
                    ? "0"
                    : prev.discount_value || (value === CouponRequestDiscountType.PERCENTAGE ? "10" : "5"),
        }));
    };

    const applyPresetRange = (preset: PresetRange) => {
        const start = new Date();
        const end = addDays(start, preset.days);
        handleInputChange("valid_from", start.toISOString());
        handleInputChange("valid_to", end.toISOString());
    };

    const handleToggleLimit = (field: "usage_limit" | "per_customer_limit", mode: "unlimited" | "custom") => {
        handleInputChange(field, mode === "unlimited" ? null : 100);
    };

    const percentagePresets = useMemo(() => [10, 15, 20, 25, 30, 50], []);
    const amountPresets = useMemo(() => [5, 10, 15, 20, 50], []);
    const minSpendPresets = useMemo(() => [0, 25, 50, 75, 100], []);
    const limitPresets = useMemo(() => [50, 100, 250, 500], []);
    const validityPresets = useMemo<PresetRange[]>(
        () => [
            { label: "7 days", days: 7 },
            { label: "30 days", days: 30 },
            { label: "90 days", days: 90 },
        ],
        []
    );

    const getStatus = useCallback((coupon: Coupon) => {
        if (coupon.is_active === false) return "Inactive";
        const now = new Date();
        const start = coupon.valid_from ? new Date(coupon.valid_from) : null;
        const end = coupon.valid_to ? new Date(coupon.valid_to) : null;

        if (end && end < now) return "Expired";
        if (start && start > now) return "Scheduled";
        return "Active";
    }, []);

    const columns: GridColDef<Coupon>[] = useMemo(
        () => [
            { field: "id", headerName: "ID", width: 80 },
            {
                field: "code",
                headerName: "Code",
                flex: 1,
                minWidth: 140,
                renderCell: (params) => (
                    <Chip icon={<LocalOfferIcon />} label={params.value} size="small" color="primary" variant="outlined" />
                ),
            },
            { field: "name", headerName: "Name", flex: 1.2, minWidth: 200 },
            {
                field: "status",
                headerName: "Status",
                width: 130,
                sortable: false,
                renderCell: (params) => {
                    const status = getStatus(params.row);
                    const color =
                        status === "Active" ? "success" : status === "Scheduled" ? "info" : status === "Expired" ? "warning" : "default";
                    return <Chip label={status} color={color as any} size="small" />;
                },
            },
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
                field: "min_purchase_amount",
                headerName: "Min Spend",
                width: 120,
                renderCell: (params) => (params.value ? `$${params.value}` : "None"),
            },
            {
                field: "usage_count",
                headerName: "Used",
                width: 110,
                type: "number",
                renderCell: (params) => {
                    const used = params.value ?? 0;
                    const limit = params.row.usage_limit;
                    return limit ? `${used} / ${limit}` : `${used}`;
                },
            },
            {
                field: "per_customer_limit",
                headerName: "Per Customer",
                width: 130,
                renderCell: (params) => (params.value ? params.value : "Unlimited"),
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
                    <GridActionsCellItem key="edit" icon={<EditIcon />} label="Edit" onClick={() => handleOpenEdit(params.row)} />,
                    <GridActionsCellItem key="delete" icon={<DeleteIcon />} label="Delete" onClick={() => handleDelete(params.row.id)} />,
                ],
            },
        ],
        [getStatus, handleDelete, handleOpenEdit]
    );

    const isSubmitting = createMutation.isLoading || updateMutation.isLoading;
    const pageSizeOptions = useMemo(() => [10, 25, 50, 100], []);
    const dataGridSx = useMemo(
        () => ({
            "& .MuiDataGrid-cell": {
                py: 1,
            },
        }),
        []
    );
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
                    {...dataGridProps}
                    rows={coupons}
                    rowCount={totalCoupons}
                    columns={columns}
                    getRowId={(row) => row.id}
                    loading={tableQueryResult?.isLoading || tableQueryResult?.isFetching}
                    pageSizeOptions={pageSizeOptions}
                    disableRowSelectionOnClick
                    sx={dataGridSx}
                />

                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>{editingCoupon ? "Edit Coupon" : "Create Coupon"}</DialogTitle>
                        <DialogContent>
                            <Stack spacing={3} sx={{ mt: 1 }}>
                                {formError ? <Alert severity="error">{formError}</Alert> : null}
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
                                    <Tooltip title="Generate a random code">
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleInputChange("code", generateCouponCode())}
                                            sx={{ minWidth: 140 }}
                                        >
                                            Generate
                                        </Button>
                                    </Tooltip>
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
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Discount Settings
                                    </Typography>
                                    <ScheduleIcon fontSize="small" color="action" />
                                </Stack>

                                <FormControl component={Stack} spacing={1}>
                                    <FormLabel>Discount Type</FormLabel>
                                    <ToggleButtonGroup
                                        exclusive
                                        value={formData.discount_type ?? CouponRequestDiscountType.PERCENTAGE}
                                        onChange={handleDiscountTypeChange}
                                        fullWidth
                                    >
                                        <ToggleButton value={CouponRequestDiscountType.PERCENTAGE}>Percentage Off</ToggleButton>
                                        <ToggleButton value={CouponRequestDiscountType.FIXED_AMOUNT}>Fixed Amount Off</ToggleButton>
                                        <ToggleButton value={CouponRequestDiscountType.FREE_ITEM}>Free Item</ToggleButton>
                                    </ToggleButtonGroup>
                                </FormControl>

                                {formData.discount_type !== CouponRequestDiscountType.FREE_ITEM ? (
                                    <Stack spacing={1}>
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
                                                            {formData.discount_type === CouponRequestDiscountType.PERCENTAGE ? "%" : "$"}
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                        <Stack direction="row" spacing={1} flexWrap="wrap">
                                            {(formData.discount_type === CouponRequestDiscountType.PERCENTAGE ? percentagePresets : amountPresets).map(
                                                (preset) => (
                                                    <Chip
                                                        key={preset}
                                                        label={
                                                            formData.discount_type === CouponRequestDiscountType.PERCENTAGE
                                                                ? `${preset}%`
                                                                : `$${preset}`
                                                        }
                                                        size="small"
                                                        color={formData.discount_value === preset.toString() ? "primary" : "default"}
                                                        onClick={() => handleInputChange("discount_value", preset.toString())}
                                                    />
                                                )
                                            )}
                                        </Stack>
                                        <FormHelperText>
                                            Common presets inspired by global restaurant platforms; adjust as needed for campaigns.
                                        </FormHelperText>
                                    </Stack>
                                ) : (
                                    <FormHelperText>
                                        Free item coupons do not require a discount value. Select eligible items below.
                                    </FormHelperText>
                                )}

                                <TextField
                                    label="Minimum Purchase Amount"
                                    type="number"
                                    fullWidth
                                    value={formData.min_purchase_amount || "0"}
                                    onChange={(e) => handleInputChange("min_purchase_amount", e.target.value === "" ? "0" : e.target.value)}
                                    slotProps={{
                                        htmlInput: { min: 0, step: 0.01 },
                                        input: {
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        },
                                    }}
                                    helperText="Minimum order total required to use coupon"
                                />
                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                    {minSpendPresets.map((preset) => (
                                        <Chip
                                            key={preset}
                                            label={preset === 0 ? "No minimum" : `$${preset}`}
                                            size="small"
                                            color={formData.min_purchase_amount === preset.toString() ? "primary" : "default"}
                                            onClick={() => handleInputChange("min_purchase_amount", preset.toString())}
                                        />
                                    ))}
                                </Stack>

                                <Divider />

                                {/* Usage Limits */}
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Usage Limits
                                </Typography>

                                <FormControl component={Stack} spacing={1}>
                                    <FormLabel>Total Usage Limit</FormLabel>
                                    <ToggleButtonGroup
                                        exclusive
                                        value={formData.usage_limit === null ? "unlimited" : "custom"}
                                        onChange={(_, value) => value && handleToggleLimit("usage_limit", value)}
                                        size="small"
                                    >
                                        <ToggleButton value="unlimited">Unlimited</ToggleButton>
                                        <ToggleButton value="custom">Custom</ToggleButton>
                                    </ToggleButtonGroup>
                                    <TextField
                                        label="Total Usage Limit"
                                        type="number"
                                        fullWidth
                                        value={formData.usage_limit ?? ""}
                                        onChange={(e) =>
                                            handleInputChange("usage_limit", e.target.value === "" ? null : Number(e.target.value))
                                        }
                                        slotProps={{ htmlInput: { min: 0 } }}
                                        helperText="Total number of times coupon can be used (blank for unlimited)"
                                        disabled={formData.usage_limit === null}
                                    />
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                        {limitPresets.map((preset) => (
                                            <Chip
                                                key={preset}
                                                label={`${preset} uses`}
                                                size="small"
                                                color={formData.usage_limit === preset ? "primary" : "default"}
                                                onClick={() => handleInputChange("usage_limit", preset)}
                                            />
                                        ))}
                                    </Stack>
                                </FormControl>

                                <FormControl component={Stack} spacing={1}>
                                    <FormLabel>Per Customer Limit</FormLabel>
                                    <ToggleButtonGroup
                                        exclusive
                                        value={formData.per_customer_limit === null ? "unlimited" : "custom"}
                                        onChange={(_, value) => value && handleToggleLimit("per_customer_limit", value)}
                                        size="small"
                                    >
                                        <ToggleButton value="unlimited">Unlimited</ToggleButton>
                                        <ToggleButton value="custom">Custom</ToggleButton>
                                    </ToggleButtonGroup>
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
                                        helperText="Max uses per customer (blank for unlimited)"
                                        disabled={formData.per_customer_limit === null}
                                    />
                                </FormControl>

                                <Divider />

                                {/* Validity Period */}
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Validity Period
                                </Typography>

                                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                    <DateTimePicker
                                        label="Valid From"
                                        value={formData.valid_from ? new Date(formData.valid_from) : null}
                                        onChange={(date) => handleInputChange("valid_from", date ? date.toISOString() : null)}
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
                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                    {validityPresets.map((preset) => (
                                        <Chip
                                            key={preset.label}
                                            label={`Start now • ${preset.label}`}
                                            size="small"
                                            onClick={() => applyPresetRange(preset)}
                                        />
                                    ))}
                                </Stack>

                                <Divider />

                                {/* Applicable Items/Categories */}
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Applicability
                                </Typography>

                                <Autocomplete
                                    multiple
                                    options={categories}
                                    getOptionLabel={(option) => option.name}
                                    value={categories.filter((cat) => formData.applicable_categories?.includes(cat.id))}
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
                                            <Chip {...getTagProps({ index })} key={option.id} label={option.name} size="small" />
                                        ))
                                    }
                                />

                                <Autocomplete
                                    multiple
                                    options={itemOptions}
                                    loading={isItemsLoading}
                                    getOptionLabel={(option) => `${option.name} • ${option.category_name || "Uncategorized"}`}
                                    groupBy={(option) => option.category_name || "Uncategorized"}
                                    value={itemOptions.filter((item) => formData.applicable_items?.includes(item.id))}
                                    onChange={(_, newValue) =>
                                        handleInputChange(
                                            "applicable_items",
                                            newValue.map((item) => item.id)
                                        )
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Applicable Items"
                                            helperText="Select items eligible for the coupon (empty = all items)"
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
                                    Leave both lists empty to apply to all categories and items. Popular items are suggested first.
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

// Auto-generate coupon code (format: SAVE-XXXX)
const generateCouponCode = () => {
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `SAVE-${randomPart}`;
};
