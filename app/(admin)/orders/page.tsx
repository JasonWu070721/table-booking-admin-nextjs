// app/(admin)/orders/page.tsx
"use client";

import { useMemo, useState } from "react";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, type GridColDef } from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";
import { HttpError, useCreate, useDelete, useInvalidate, useList, useUpdate } from "@refinedev/core";
import ReplayIcon from "@mui/icons-material/Replay";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Order } from "@/generated/models/order";
import type { OrderRequest } from "@/generated/models/orderRequest";
import { OrderRequestStatus } from "@/generated/models/orderRequestStatus";
import type { Table } from "@/generated/models/table";

type OrderFormState = {
    table: number | "";
    status?: OrderRequestStatus;
    customer_name?: string;
    customer_phone?: string;
    customer_email?: string;
    revenue_center?: number | null;
    subtotal?: string;
    tax?: string;
    total?: string;
    applied_coupon?: number | null;
    note?: string;
    staff?: number | null;
    staff_name?: string;
};

const defaultFormState: OrderFormState = {
    table: "",
    status: OrderRequestStatus.PENDING,
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    revenue_center: null,
    subtotal: "",
    tax: "",
    total: "",
    applied_coupon: null,
    note: "",
    staff: null,
    staff_name: "",
};

const statusChipColors: Record<string, "default" | "success" | "warning" | "error"> = {
    PENDING: "warning",
    SERVED: "success",
    PAID: "success",
    CANCELLED: "default",
    VOID: "error",
};

export default function OrdersPage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [formData, setFormData] = useState<OrderFormState>(defaultFormState);

    const { dataGridProps, tableQueryResult } = useDataGrid<Order, HttpError>({
        resource: "orders",
        pagination: {
            mode: "server",
        },
        sorters: {
            initial: [{ field: "ordered_at", order: "desc" }],
        },
    });

    const tablesQuery = useList<Table, HttpError>({
        resource: "tables",
        pagination: {
            mode: "off",
        },
    });

    const createMutation = useCreate<OrderRequest, HttpError>();
    const updateMutation = useUpdate<OrderRequest, HttpError>();
    const { mutate: deleteOrder } = useDelete();
    const invalidate = useInvalidate();

    const tableOptions = tablesQuery.result?.data ?? [];

    const formatCurrency = (value?: string) => {
        if (!value) return "-";
        const numeric = Number(value);
        if (Number.isNaN(numeric)) return value;
        return `$${numeric.toFixed(2)}`;
    };

    const formatDateTime = (value?: string | null) => {
        if (!value) return "--";
        return new Date(value).toLocaleString();
    };

    const handleOpenCreate = () => {
        setEditingOrder(null);
        setFormData({ ...defaultFormState });
        setOpenDialog(true);
    };

    const handleOpenEdit = (order: Order) => {
        setEditingOrder(order);
        setFormData({
            table: order.table ?? "",
            status: (order as any).status ?? OrderRequestStatus.PENDING,
            customer_name: order.customer_name ?? "",
            customer_phone: order.customer_phone ?? "",
            customer_email: order.customer_email ?? "",
            revenue_center: order.revenue_center ?? null,
            subtotal: order.subtotal ?? "",
            tax: order.tax ?? "",
            total: order.total ?? "",
            applied_coupon: order.applied_coupon ?? null,
            note: order.note ?? "",
            staff: order.staff ?? null,
            staff_name: order.staff_name ?? "",
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingOrder(null);
        setFormData({ ...defaultFormState });
    };

    const handleInputChange = <K extends keyof OrderFormState>(field: K, value: OrderFormState[K]) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const tableId = typeof formData.table === "number" ? formData.table : Number(formData.table);

        if (!tableId || Number.isNaN(tableId)) {
            alert("Please select a table for the order.");
            return;
        }

        const payload: OrderRequest = {
            table: tableId,
            status: formData.status,
            customer_name: formData.customer_name?.trim() || undefined,
            customer_phone: formData.customer_phone?.trim() || undefined,
            customer_email: formData.customer_email?.trim() || undefined,
            revenue_center: formData.revenue_center ?? undefined,
            subtotal: formData.subtotal?.toString().trim() || undefined,
            tax: formData.tax?.toString().trim() || undefined,
            total: formData.total?.toString().trim() || undefined,
            applied_coupon: formData.applied_coupon ?? undefined,
            note: formData.note?.trim() || undefined,
            staff: formData.staff ?? undefined,
            staff_name: formData.staff_name?.trim() || undefined,
        };

        if (editingOrder) {
            updateMutation.mutate(
                {
                    resource: "orders",
                    id: editingOrder.id,
                    values: payload,
                },
                {
                    onSuccess: () => {
                        invalidate({ resource: "orders", invalidates: ["list"] });
                        handleCloseDialog();
                    },
                }
            );
        } else {
            createMutation.mutate(
                {
                    resource: "orders",
                    values: payload,
                },
                {
                    onSuccess: () => {
                        invalidate({ resource: "orders", invalidates: ["list"] });
                        handleCloseDialog();
                    },
                }
            );
        }
    };

    const handleDelete = (id: number) => {
        if (!confirm("Are you sure you want to delete this order?")) return;

        deleteOrder(
            {
                resource: "orders",
                id,
            },
            {
                onSuccess: () => {
                    invalidate({ resource: "orders", invalidates: ["list"] });
                },
            }
        );
    };

    const columns: GridColDef<Order>[] = useMemo(
        () => [
            { field: "id", headerName: "ID", width: 90 },
            { field: "order_number", headerName: "Order #", flex: 1, minWidth: 160 },
            { field: "table", headerName: "Table", width: 110 },
            {
                field: "status",
                headerName: "Status",
                width: 140,
                renderCell: (params) => (
                    <Chip
                        size="small"
                        label={params.value}
                        color={statusChipColors[params.value as string] || "default"}
                    />
                ),
            },
            {
                field: "subtotal",
                headerName: "Subtotal",
                width: 140,
                valueFormatter: (params) => formatCurrency(params?.value as string | undefined),
            },
            {
                field: "tax",
                headerName: "Tax",
                width: 120,
                valueFormatter: (params) => formatCurrency(params?.value as string | undefined),
            },
            {
                field: "total",
                headerName: "Total",
                width: 140,
                valueFormatter: (params) => formatCurrency(params?.value as string | undefined),
            },
            {
                field: "ordered_at",
                headerName: "Ordered At",
                flex: 1.1,
                minWidth: 200,
                valueFormatter: (params) => formatDateTime(params?.value as string | undefined),
            },
            {
                field: "updated_at",
                headerName: "Updated At",
                flex: 1.1,
                minWidth: 200,
                valueFormatter: (params) => formatDateTime(params?.value as string | undefined),
            },
            {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                width: 130,
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
        ],
        []
    );

    const isSubmitting = createMutation.isLoading || updateMutation.isLoading;

    return (
        <Box sx={{ width: "100%", height: "calc(100vh - 120px)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3, gap: 2 }}>
                <Box>
                    <Typography variant="h4" component="h1">
                        Orders
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Monitor, create, and update orders across the restaurant.
                    </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        startIcon={<ReplayIcon />}
                        onClick={() => tableQueryResult?.refetch?.()}
                    >
                        Refresh
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenCreate}
                    >
                        Create Order
                    </Button>
                </Stack>
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

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{editingOrder ? "Edit Order" : "Create Order"}</DialogTitle>
                    <DialogContent>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <TextField
                                select
                                label="Table"
                                required
                                fullWidth
                                value={formData.table}
                                onChange={(e) => handleInputChange("table", e.target.value === "" ? "" : Number(e.target.value))}
                                helperText="Select the table associated with this order"
                            >
                                <MenuItem value="">
                                    <em>Select table</em>
                                </MenuItem>
                                {tableOptions.map((table: Table) => (
                                    <MenuItem key={table.id} value={table.id}>
                                        {table.name ?? `Table ${table.id}`}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <FormControl fullWidth>
                                <InputLabel id="order-status-label">Status</InputLabel>
                                <Select
                                    labelId="order-status-label"
                                    label="Status"
                                    value={formData.status ?? OrderRequestStatus.PENDING}
                                    onChange={(e) => handleInputChange("status", e.target.value as OrderRequestStatus)}
                                >
                                    {Object.values(OrderRequestStatus).map((status) => (
                                        <MenuItem key={status} value={status}>
                                            {status}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <TextField
                                    label="Customer Name"
                                    fullWidth
                                    value={formData.customer_name ?? ""}
                                    onChange={(e) => handleInputChange("customer_name", e.target.value)}
                                    slotProps={{ input: { maxLength: 80 } }}
                                />
                                <TextField
                                    label="Customer Phone"
                                    fullWidth
                                    value={formData.customer_phone ?? ""}
                                    onChange={(e) => handleInputChange("customer_phone", e.target.value)}
                                    slotProps={{ input: { maxLength: 40 } }}
                                />
                            </Stack>

                            <TextField
                                label="Customer Email"
                                fullWidth
                                type="email"
                                value={formData.customer_email ?? ""}
                                onChange={(e) => handleInputChange("customer_email", e.target.value)}
                                slotProps={{ input: { maxLength: 254 } }}
                            />

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <TextField
                                    label="Subtotal"
                                    fullWidth
                                    value={formData.subtotal ?? ""}
                                    onChange={(e) => handleInputChange("subtotal", e.target.value)}
                                    helperText="Optional manual override"
                                />
                                <TextField
                                    label="Tax"
                                    fullWidth
                                    value={formData.tax ?? ""}
                                    onChange={(e) => handleInputChange("tax", e.target.value)}
                                />
                                <TextField
                                    label="Total"
                                    fullWidth
                                    value={formData.total ?? ""}
                                    onChange={(e) => handleInputChange("total", e.target.value)}
                                />
                            </Stack>

                            <TextField
                                label="Note"
                                fullWidth
                                multiline
                                minRows={2}
                                value={formData.note ?? ""}
                                onChange={(e) => handleInputChange("note", e.target.value)}
                                helperText="Special instructions or comments"
                            />

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <TextField
                                    label="Staff Name"
                                    fullWidth
                                    value={formData.staff_name ?? ""}
                                    onChange={(e) => handleInputChange("staff_name", e.target.value)}
                                    slotProps={{ input: { maxLength: 60 } }}
                                />
                                <TextField
                                    label="Staff ID"
                                    fullWidth
                                    value={formData.staff ?? ""}
                                    onChange={(e) =>
                                        handleInputChange("staff", e.target.value === "" ? null : Number(e.target.value))
                                    }
                                    type="number"
                                    slotProps={{ htmlInput: { min: 0 } }}
                                />
                            </Stack>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            {editingOrder ? "Update" : "Create"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
