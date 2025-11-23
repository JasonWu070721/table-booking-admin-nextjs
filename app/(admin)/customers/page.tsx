// app/(admin)/customers/page.tsx
"use client";

import { useMemo, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, type GridActionsCellItemProps, type GridColDef } from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";
import { HttpError, useCreate, useDelete, useInvalidate, useUpdate } from "@refinedev/core";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReplayIcon from "@mui/icons-material/Replay";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Customer } from "@/generated/models/customer";
import type { CustomerRequest } from "@/generated/models/customerRequest";
import { CustomerRequestSource } from "@/generated/models/customerRequestSource";

/**
 * Customers Management Page
 * Full CRUD customer directory backed by refine + Orval data provider
 * @date 2025-11-23 (Taiwan Time)
 */
export default function CustomersPage() {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [formData, setFormData] = useState<CustomerRequest>({
        name: "",
        email: "",
        phone: "",
        source: CustomerRequestSource.MANUAL,
        external_identifier: "",
        metadata: undefined,
    });

    const { dataGridProps, tableQueryResult } = useDataGrid<Customer, HttpError>({
        resource: "customers",
        pagination: {
            mode: "server",
        },
        sorters: {
            initial: [{ field: "last_reservation", order: "desc" }],
        },
    });

    const createMutation = useCreate<CustomerRequest, HttpError>();
    const updateMutation = useUpdate<CustomerRequest, HttpError>();
    const { mutate: deleteCustomer } = useDelete();
    const invalidate = useInvalidate();

    const handleOpenCreate = () => {
        setEditingCustomer(null);
        setFormData({
            name: "",
            email: "",
            phone: "",
            source: CustomerRequestSource.MANUAL,
            external_identifier: "",
            metadata: undefined,
        });
        setOpenDialog(true);
    };

    const handleOpenEdit = (customer: Customer) => {
        setEditingCustomer(customer);
        setFormData({
            name: customer.name || "",
            email: customer.email || "",
            phone: customer.phone || "",
            source: (customer as any).source ?? CustomerRequestSource.MANUAL,
            external_identifier: (customer as any).external_identifier ?? "",
            metadata: undefined,
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingCustomer(null);
    };

    const handleDelete = (id: number) => {
        if (!confirm("Are you sure you want to delete this customer?")) return;
        deleteCustomer(
            {
                resource: "customers",
                id,
            },
            {
                onSuccess: () => {
                    invalidate({ resource: "customers", invalidates: ["list"] });
                },
            }
        );
    };

    const handleInputChange = (field: keyof CustomerRequest, value: unknown) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: CustomerRequest = {
            ...formData,
            name: formData.name?.trim() ?? "",
            email: formData.email?.trim() || undefined,
            phone: formData.phone?.trim() || undefined,
            external_identifier: formData.external_identifier?.trim() || undefined,
        };

        if (editingCustomer) {
            updateMutation.mutate(
                {
                    resource: "customers",
                    id: editingCustomer.id,
                    values: payload,
                },
                {
                    onSuccess: () => {
                        invalidate({ resource: "customers", invalidates: ["list"] });
                        handleCloseDialog();
                    },
                }
            );
        } else {
            createMutation.mutate(
                {
                    resource: "customers",
                    values: payload,
                },
                {
                    onSuccess: () => {
                        invalidate({ resource: "customers", invalidates: ["list"] });
                        handleCloseDialog();
                    },
                }
            );
        }
    };

    const columns: GridColDef<Customer>[] = useMemo(
        () => [
            { field: "id", headerName: "ID", width: 120 },
            { field: "name", headerName: "Name", flex: 1, minWidth: 200 },
            { field: "email", headerName: "Email", flex: 1, minWidth: 220 },
            { field: "phone", headerName: "Phone", flex: 1, minWidth: 160 },
            {
                field: "source",
                headerName: "Source",
                width: 140,
            },
            {
                field: "reservation_count",
                headerName: "Reservations",
                width: 140,
                type: "number",
            },
            {
                field: "last_status",
                headerName: "Last Status",
                width: 140,
            },
            {
                field: "first_reservation",
                headerName: "First Reservation",
                minWidth: 200,
                flex: 1,
                valueGetter: (params) => {
                    const dateValue = params?.value;
                    return dateValue ? new Date(dateValue as string).toLocaleString() : "—";
                },
            },
            {
                field: "last_reservation",
                headerName: "Last Reservation",
                minWidth: 200,
                flex: 1,
                valueGetter: (params) => {
                    const dateValue = params?.value;
                    return dateValue ? new Date(dateValue as string).toLocaleString() : "—";
                },
            },
            {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                width: 140,
                getActions: (params) =>
                    [
                        {
                            icon: <InfoOutlinedIcon />,
                            label: "Details",
                            onClick: () => setSelectedCustomer(params.row),
                        },
                        {
                            icon: <EditIcon />,
                            label: "Edit",
                            onClick: () => handleOpenEdit(params.row),
                        },
                        {
                            icon: <DeleteIcon />,
                            label: "Delete",
                            onClick: () => handleDelete(params.row.id),
                        },
                    ].map((action, idx) => (
                        <GridActionsCellItem key={action.label + idx} {...(action as GridActionsCellItemProps)} />
                    )),
            },
        ],
        []
    );

    return (
        <Box sx={{ width: "100%", height: "calc(100vh - 120px)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3, gap: 2 }}>
                <Box>
                    <Typography variant="h4" component="h1">
                        Customers
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        View and manage customer profiles with reservation history.
                    </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        startIcon={<ReplayIcon />}
                        onClick={() => tableQueryResult?.refetch()}
                    >
                        Refresh
                    </Button>
                    <Button variant="contained" onClick={handleOpenCreate}>
                        Create Customer
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
                open={Boolean(selectedCustomer)}
                onClose={() => setSelectedCustomer(null)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Customer Details</DialogTitle>
                <DialogContent dividers>
                    {selectedCustomer && (
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Name
                                </Typography>
                                <Typography variant="body1">{selectedCustomer.name}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Contact
                                </Typography>
                                <Typography variant="body1">
                                    {selectedCustomer.email} · {selectedCustomer.phone}
                                </Typography>
                            </Box>
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <Box flex={1}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        First Reservation
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedCustomer.first_reservation
                                            ? new Date(selectedCustomer.first_reservation).toLocaleString()
                                            : "—"}
                                    </Typography>
                                </Box>
                                <Box flex={1}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Last Reservation
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedCustomer.last_reservation
                                            ? new Date(selectedCustomer.last_reservation).toLocaleString()
                                            : "—"}
                                    </Typography>
                                </Box>
                            </Stack>
                            <Divider />
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Status Breakdown
                                </Typography>
                                {selectedCustomer.status_breakdown &&
                                Object.keys(selectedCustomer.status_breakdown).length > 0 ? (
                                    <Stack spacing={0.5} sx={{ mt: 1 }}>
                                        {Object.entries(selectedCustomer.status_breakdown).map(([status, count]) => (
                                            <Typography key={status} variant="body2">
                                                {status}: {count}
                                            </Typography>
                                        ))}
                                    </Stack>
                                ) : (
                                    <Typography variant="body2">No status data</Typography>
                                )}
                            </Box>
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedCustomer(null)}>Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{editingCustomer ? "Edit Customer" : "Create Customer"}</DialogTitle>
                    <DialogContent>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <TextField
                                label="Name"
                                fullWidth
                                required
                                value={formData.name ?? ""}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                slotProps={{ input: { maxLength: 120 } }}
                            />
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                value={formData.email ?? ""}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                slotProps={{ input: { maxLength: 254 } }}
                            />
                            <TextField
                                label="Phone"
                                fullWidth
                                value={formData.phone ?? ""}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                slotProps={{ input: { maxLength: 40 } }}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="customer-source-label">Source</InputLabel>
                                <Select
                                    labelId="customer-source-label"
                                    label="Source"
                                    value={formData.source ?? CustomerRequestSource.MANUAL}
                                    onChange={(e) => handleInputChange("source", e.target.value)}
                                >
                                    {Object.values(CustomerRequestSource).map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="External Identifier"
                                fullWidth
                                value={formData.external_identifier ?? ""}
                                onChange={(e) => handleInputChange("external_identifier", e.target.value)}
                                slotProps={{ input: { maxLength: 128 } }}
                                helperText="Optional stable ID from external systems"
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={createMutation.isLoading || updateMutation.isLoading}
                        >
                            {editingCustomer ? "Update" : "Create"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
