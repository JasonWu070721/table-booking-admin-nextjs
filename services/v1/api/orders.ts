// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** List all orders for the current tenant with optional filtering GET /api/v1/orders/ */
export async function ordersList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersListParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/orders/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create a new order POST /api/v1/orders/ */
export async function ordersCreate(
  body: API.Order,
  options?: { [key: string]: any }
) {
  return request<API.Order>("/api/v1/orders/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for Order CRUD and status transitions

Permissions:
- Owner/Admin/Member: can manage all orders in their tenant
- All operations are tenant-scoped GET /api/v1/orders/${param0}/ */
export async function ordersRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/v1/orders/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for Order CRUD and status transitions

Permissions:
- Owner/Admin/Member: can manage all orders in their tenant
- All operations are tenant-scoped PUT /api/v1/orders/${param0}/ */
export async function ordersUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersUpdateParams,
  body: API.Order,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/v1/orders/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Cancel/delete an order (only if PENDING) DELETE /api/v1/orders/${param0}/ */
export async function ordersDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/orders/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for Order CRUD and status transitions

Permissions:
- Owner/Admin/Member: can manage all orders in their tenant
- All operations are tenant-scoped PATCH /api/v1/orders/${param0}/ */
export async function ordersPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersPartialUpdateParams,
  body: API.PatchedOrder,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/v1/orders/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Apply a manual discount to the order.
When approval is required, returns the pending approval request. POST /api/v1/orders/${param0}/apply-discount/ */
export async function ordersApplyDiscountCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersApplyDiscountCreateParams,
  body: API.OrderApplyDiscount,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/v1/orders/${param0}/apply-discount/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** List all bills associated with the specified order. GET /api/v1/orders/${param0}/bills/ */
export async function ordersBillsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersBillsListParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PaginatedBillListList>(`/api/v1/orders/${param0}/bills/`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** Create a payment for this order

This endpoint bridges Order and Payment systems, allowing direct payment creation
from an order without manually specifying the order ID in payment payload.

Supports all payment methods: CASH, LINE_PAY, CREDIT_CARD POST /api/v1/orders/${param0}/create-payment/ */
export async function ordersCreatePaymentCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersCreatePaymentCreateParams,
  body: API.OrderCreatePayment,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Payment>(`/api/v1/orders/${param0}/create-payment/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Mark order as paid (SERVED → PAID) POST /api/v1/orders/${param0}/pay/ */
export async function ordersPayCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersPayCreateParams,
  body: API.Order,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/v1/orders/${param0}/pay/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Get payment summary for this order

Returns:
- Order total amount
- Total paid amount (sum of all completed payments)
- Total refunded amount
- Net paid amount (paid - refunded)
- Outstanding balance (order total - net paid)
- Payment status overview
- List of all payment records GET /api/v1/orders/${param0}/payment-summary/ */
export async function ordersPaymentSummaryRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersPaymentSummaryRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrderPaymentSummary>(
    `/api/v1/orders/${param0}/payment-summary/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** List all payments for this order

Supports split payments scenario where one order can have multiple payment records.
Useful for tracking partial payments, refunds, and payment history. GET /api/v1/orders/${param0}/payments/ */
export async function ordersPaymentsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersPaymentsListParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PaginatedPaymentList>(
    `/api/v1/orders/${param0}/payments/`,
    {
      method: "GET",
      params: {
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}

/** Mark order as served (PENDING → SERVED) POST /api/v1/orders/${param0}/serve/ */
export async function ordersServeCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersServeCreateParams,
  body: API.Order,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/v1/orders/${param0}/serve/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Create a split definition for the order's bill. POST /api/v1/orders/${param0}/split/ */
export async function ordersSplitCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersSplitCreateParams,
  body: API.BillSplitCreate,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BillSplit>(`/api/v1/orders/${param0}/split/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** List all split definitions associated with this order. GET /api/v1/orders/${param0}/splits/ */
export async function ordersSplitsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersSplitsListParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PaginatedBillSplitList>(
    `/api/v1/orders/${param0}/splits/`,
    {
      method: "GET",
      params: {
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}

/** Update order status with validation of allowed transitions PATCH /api/v1/orders/${param0}/status/ */
export async function ordersStatusPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersStatusPartialUpdateParams,
  body: API.PatchedOrderStatusUpdate,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/v1/orders/${param0}/status/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Void an order (SERVED → VOID) POST /api/v1/orders/${param0}/void/ */
export async function ordersVoidCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersVoidCreateParams,
  body: API.Order,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/v1/orders/${param0}/void/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Get order statistics for the current tenant GET /api/v1/orders/stats/ */
export async function ordersStatsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ordersStatsRetrieveParams,
  options?: { [key: string]: any }
) {
  return request<{
    total?: number;
    pending?: number;
    served?: number;
    paid?: number;
    cancelled?: number;
    void?: number;
    total_revenue?: string;
  }>("/api/v1/orders/stats/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
