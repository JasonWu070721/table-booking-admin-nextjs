// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** List all payments for the current tenant with optional filtering GET /api/v1/payments/ */
export async function paymentsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.paymentsListParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/payments/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create a new payment POST /api/v1/payments/ */
export async function paymentsCreate(
  body: API.Payment,
  options?: { [key: string]: any }
) {
  return request<API.Payment>("/api/v1/payments/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for Payment CRUD and payment operations

Permissions:
- Owner/Admin/Member: can manage all payments in their tenant
- All operations are tenant-scoped

Actions:
- list: List all payments with optional filtering
- create: Create a new payment
- retrieve: Get payment details
- update/partial_update: Update payment details
- delete: Delete payment (soft delete)
- complete: Mark payment as completed
- fail: Mark payment as failed
- refund: Process refund for completed payment
- stats: Get payment statistics GET /api/v1/payments/${param0}/ */
export async function paymentsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.paymentsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Payment>(`/api/v1/payments/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for Payment CRUD and payment operations

Permissions:
- Owner/Admin/Member: can manage all payments in their tenant
- All operations are tenant-scoped

Actions:
- list: List all payments with optional filtering
- create: Create a new payment
- retrieve: Get payment details
- update/partial_update: Update payment details
- delete: Delete payment (soft delete)
- complete: Mark payment as completed
- fail: Mark payment as failed
- refund: Process refund for completed payment
- stats: Get payment statistics PUT /api/v1/payments/${param0}/ */
export async function paymentsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.paymentsUpdateParams,
  body: API.Payment,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Payment>(`/api/v1/payments/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for Payment CRUD and payment operations

Permissions:
- Owner/Admin/Member: can manage all payments in their tenant
- All operations are tenant-scoped

Actions:
- list: List all payments with optional filtering
- create: Create a new payment
- retrieve: Get payment details
- update/partial_update: Update payment details
- delete: Delete payment (soft delete)
- complete: Mark payment as completed
- fail: Mark payment as failed
- refund: Process refund for completed payment
- stats: Get payment statistics DELETE /api/v1/payments/${param0}/ */
export async function paymentsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.paymentsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/payments/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for Payment CRUD and payment operations

Permissions:
- Owner/Admin/Member: can manage all payments in their tenant
- All operations are tenant-scoped

Actions:
- list: List all payments with optional filtering
- create: Create a new payment
- retrieve: Get payment details
- update/partial_update: Update payment details
- delete: Delete payment (soft delete)
- complete: Mark payment as completed
- fail: Mark payment as failed
- refund: Process refund for completed payment
- stats: Get payment statistics PATCH /api/v1/payments/${param0}/ */
export async function paymentsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.paymentsPartialUpdateParams,
  body: API.PatchedPayment,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Payment>(`/api/v1/payments/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Mark payment as completed (PENDING/PROCESSING -> COMPLETED)

For Cash: No additional fields required
For Line Pay: Requires line_pay_transaction_id
For Credit Card: Optional card_last_four and card_brand POST /api/v1/payments/${param0}/complete/ */
export async function paymentsCompleteCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.paymentsCompleteCreateParams,
  body: API.PaymentComplete,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Payment>(`/api/v1/payments/${param0}/complete/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Mark payment as failed (PENDING/PROCESSING -> FAILED) POST /api/v1/payments/${param0}/fail/ */
export async function paymentsFailCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.paymentsFailCreateParams,
  body: API.PaymentFail,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Payment>(`/api/v1/payments/${param0}/fail/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Process refund for completed payment

Supports full or partial refunds.
Status will be updated to PARTIALLY_REFUNDED or REFUNDED based on refund amount. POST /api/v1/payments/${param0}/refund/ */
export async function paymentsRefundCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.paymentsRefundCreateParams,
  body: API.PaymentRefund,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Payment>(`/api/v1/payments/${param0}/refund/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Get payment statistics for the current tenant

Returns counts by status, payment method, and revenue metrics.
Optionally filter by date or date range. GET /api/v1/payments/stats/ */
export async function paymentsStatsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.paymentsStatsRetrieveParams,
  options?: { [key: string]: any }
) {
  return request<{
    total_payments?: number;
    by_status?: {
      pending?: number;
      processing?: number;
      completed?: number;
      failed?: number;
      refunded?: number;
      partially_refunded?: number;
    };
    by_payment_method?: {
      cash?: number;
      line_pay?: number;
      credit_card?: number;
    };
    revenue?: {
      total_amount?: string;
      completed_amount?: string;
      refunded_amount?: string;
      net_revenue?: string;
    };
  }>("/api/v1/payments/stats/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
