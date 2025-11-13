// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** List all bills for the current tenant with optional filtering GET /api/v1/bills/ */
export async function billsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.billsListParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/bills/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create a new bill linked to an order
Auto-calculates totals based on order subtotal and provided rates POST /api/v1/bills/ */
export async function billsCreate(
  body: API.Bill,
  options?: { [key: string]: any }
) {
  return request<API.Bill>("/api/v1/bills/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for Bill CRUD, void, PDF export, and payment operations

Permissions:
- Owner/Admin/Member: can manage all bills in their tenant
- All operations are tenant-scoped

Bills link to orders and aggregate payment information with tax,
service charges, and discounts applied. GET /api/v1/bills/${param0}/ */
export async function billsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.billsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Bill>(`/api/v1/bills/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update a bill (rates, discount, notes)
Recalculates totals if financial parameters changed PUT /api/v1/bills/${param0}/ */
export async function billsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.billsUpdateParams,
  body: API.Bill,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Bill>(`/api/v1/bills/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for Bill CRUD, void, PDF export, and payment operations

Permissions:
- Owner/Admin/Member: can manage all bills in their tenant
- All operations are tenant-scoped

Bills link to orders and aggregate payment information with tax,
service charges, and discounts applied. DELETE /api/v1/bills/${param0}/ */
export async function billsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.billsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/bills/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Partially update a bill
Recalculates totals if financial parameters changed PATCH /api/v1/bills/${param0}/ */
export async function billsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.billsPartialUpdateParams,
  body: API.PatchedBill,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Bill>(`/api/v1/bills/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Create a payment for this bill
Supports all payment methods (CASH, LINE_PAY, CREDIT_CARD) POST /api/v1/bills/${param0}/create-payment/ */
export async function billsCreatePaymentCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.billsCreatePaymentCreateParams,
  body: API.BillCreatePayment,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Payment>(`/api/v1/bills/${param0}/create-payment/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Merge additional bills into the current bill. POST /api/v1/bills/${param0}/merge/ */
export async function billsMergeCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.billsMergeCreateParams,
  body: API.BillMerge,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Bill>(`/api/v1/bills/${param0}/merge/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Get comprehensive payment summary for this bill
Includes totals, outstanding balance, and payment breakdown GET /api/v1/bills/${param0}/payment-summary/ */
export async function billsPaymentSummaryRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.billsPaymentSummaryRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BillPaymentSummary>(
    `/api/v1/bills/${param0}/payment-summary/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** List all payments for this bill
Includes all payment statuses and methods GET /api/v1/bills/${param0}/payments/ */
export async function billsPaymentsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.billsPaymentsListParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PaginatedPaymentList>(
    `/api/v1/bills/${param0}/payments/`,
    {
      method: "GET",
      params: {
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}

/** Generate and download PDF invoice for the bill
Returns a PDF file with bill details, order items, and payment information GET /api/v1/bills/${param0}/pdf/ */
export async function billsPdfRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.billsPdfRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<string>(`/api/v1/bills/${param0}/pdf/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Split the bill by assigning order items to participants. POST /api/v1/bills/${param0}/split-by-items/ */
export async function billsSplitByItemsCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.billsSplitByItemsCreateParams,
  body: API.BillSplitCreate,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BillSplit>(`/api/v1/bills/${param0}/split-by-items/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Split the bill evenly across the provided number of participants. POST /api/v1/bills/${param0}/split-equally/ */
export async function billsSplitEquallyCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.billsSplitEquallyCreateParams,
  body: API.BillSplitCreate,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BillSplit>(`/api/v1/bills/${param0}/split-equally/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Adjust the ratios of an existing ratio-based split. PATCH /api/v1/bills/${param0}/splits/${param1}/ratio/ */
export async function billsSplitsRatioPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.billsSplitsRatioPartialUpdateParams,
  body: API.PatchedBillSplitRatioUpdate,
  options?: { [key: string]: any }
) {
  const { id: param0, split_id: param1, ...queryParams } = params;
  return request<API.BillSplit>(
    `/api/v1/bills/${param0}/splits/${param1}/ratio/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** Void a bill
Sets status to VOIDED and records timestamp POST /api/v1/bills/${param0}/void/ */
export async function billsVoidCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.billsVoidCreateParams,
  body: API.BillVoid,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Bill>(`/api/v1/bills/${param0}/void/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
