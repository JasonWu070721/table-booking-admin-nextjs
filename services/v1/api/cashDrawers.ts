// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** List all cash drawers for the current tenant GET /api/v1/cash-drawers/ */
export async function cashDrawersList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawersListParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/cash-drawers/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** ViewSet for Cash Drawer management

Permissions:
- Staff and above: can view and operate drawers
- Manager/Admin: can view reports
- Admin: can create/update drawer configuration

Actions:
- list: List all cash drawers
- create: Create a new cash drawer
- retrieve: Get drawer details
- update/partial_update: Update drawer configuration
- delete: Soft delete drawer (set is_active=False)
- open: Open drawer for a new session
- close: Close drawer and end session
- cash_in: Add cash to drawer
- cash_out: Remove cash from drawer
- no_sale: Open drawer without sale
- balance: Get current balance
- summary: Get drawer summary
- entries: Get cash entries for drawer
- variance_report: Get variance analysis POST /api/v1/cash-drawers/ */
export async function cashDrawersCreate(
  body: API.CashDrawer,
  options?: { [key: string]: any }
) {
  return request<API.CashDrawer>("/api/v1/cash-drawers/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for Cash Drawer management

Permissions:
- Staff and above: can view and operate drawers
- Manager/Admin: can view reports
- Admin: can create/update drawer configuration

Actions:
- list: List all cash drawers
- create: Create a new cash drawer
- retrieve: Get drawer details
- update/partial_update: Update drawer configuration
- delete: Soft delete drawer (set is_active=False)
- open: Open drawer for a new session
- close: Close drawer and end session
- cash_in: Add cash to drawer
- cash_out: Remove cash from drawer
- no_sale: Open drawer without sale
- balance: Get current balance
- summary: Get drawer summary
- entries: Get cash entries for drawer
- variance_report: Get variance analysis GET /api/v1/cash-drawers/${param0}/ */
export async function cashDrawersRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawersRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CashDrawer>(`/api/v1/cash-drawers/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for Cash Drawer management

Permissions:
- Staff and above: can view and operate drawers
- Manager/Admin: can view reports
- Admin: can create/update drawer configuration

Actions:
- list: List all cash drawers
- create: Create a new cash drawer
- retrieve: Get drawer details
- update/partial_update: Update drawer configuration
- delete: Soft delete drawer (set is_active=False)
- open: Open drawer for a new session
- close: Close drawer and end session
- cash_in: Add cash to drawer
- cash_out: Remove cash from drawer
- no_sale: Open drawer without sale
- balance: Get current balance
- summary: Get drawer summary
- entries: Get cash entries for drawer
- variance_report: Get variance analysis PUT /api/v1/cash-drawers/${param0}/ */
export async function cashDrawersUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawersUpdateParams,
  body: API.CashDrawer,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CashDrawer>(`/api/v1/cash-drawers/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for Cash Drawer management

Permissions:
- Staff and above: can view and operate drawers
- Manager/Admin: can view reports
- Admin: can create/update drawer configuration

Actions:
- list: List all cash drawers
- create: Create a new cash drawer
- retrieve: Get drawer details
- update/partial_update: Update drawer configuration
- delete: Soft delete drawer (set is_active=False)
- open: Open drawer for a new session
- close: Close drawer and end session
- cash_in: Add cash to drawer
- cash_out: Remove cash from drawer
- no_sale: Open drawer without sale
- balance: Get current balance
- summary: Get drawer summary
- entries: Get cash entries for drawer
- variance_report: Get variance analysis DELETE /api/v1/cash-drawers/${param0}/ */
export async function cashDrawersDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawersDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/cash-drawers/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for Cash Drawer management

Permissions:
- Staff and above: can view and operate drawers
- Manager/Admin: can view reports
- Admin: can create/update drawer configuration

Actions:
- list: List all cash drawers
- create: Create a new cash drawer
- retrieve: Get drawer details
- update/partial_update: Update drawer configuration
- delete: Soft delete drawer (set is_active=False)
- open: Open drawer for a new session
- close: Close drawer and end session
- cash_in: Add cash to drawer
- cash_out: Remove cash from drawer
- no_sale: Open drawer without sale
- balance: Get current balance
- summary: Get drawer summary
- entries: Get cash entries for drawer
- variance_report: Get variance analysis PATCH /api/v1/cash-drawers/${param0}/ */
export async function cashDrawersPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawersPartialUpdateParams,
  body: API.PatchedCashDrawer,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CashDrawer>(`/api/v1/cash-drawers/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Get current balance and warnings GET /api/v1/cash-drawers/${param0}/balance/ */
export async function cashDrawersBalanceRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawersBalanceRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    current_balance?: string;
    expected_balance?: string;
    opening_balance?: string;
    status?: string;
    warnings?: string[];
  }>(`/api/v1/cash-drawers/${param0}/balance/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Add cash to drawer (e.g., replenishing change fund) POST /api/v1/cash-drawers/${param0}/cash-in/ */
export async function cashDrawersCashInCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawersCashInCreateParams,
  body: API.CashIn,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CashEntry>(`/api/v1/cash-drawers/${param0}/cash-in/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Remove cash from drawer (e.g., supplier payment, petty cash) POST /api/v1/cash-drawers/${param0}/cash-out/ */
export async function cashDrawersCashOutCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawersCashOutCreateParams,
  body: API.CashOut,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CashEntry>(`/api/v1/cash-drawers/${param0}/cash-out/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Close cash drawer and end current session

Calculates variance between expected and actual balance
Requires admin approval if variance exceeds threshold POST /api/v1/cash-drawers/${param0}/close/ */
export async function cashDrawersCloseCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawersCloseCreateParams,
  body: API.CloseDrawer,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    drawer?: Record<string, any>;
    session?: Record<string, any>;
    variance?: string;
    variance_percentage?: string;
    requires_approval?: boolean;
  }>(`/api/v1/cash-drawers/${param0}/close/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Get cash entries for this drawer with optional date filtering GET /api/v1/cash-drawers/${param0}/entries/ */
export async function cashDrawersEntriesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawersEntriesListParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PaginatedCashEntryListList>(
    `/api/v1/cash-drawers/${param0}/entries/`,
    {
      method: "GET",
      params: {
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}

/** Open cash drawer without making a sale (e.g., for testing or making change) POST /api/v1/cash-drawers/${param0}/no-sale/ */
export async function cashDrawersNoSaleCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawersNoSaleCreateParams,
  body: API.CashDrawer,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CashEntry>(`/api/v1/cash-drawers/${param0}/no-sale/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Open cash drawer and start a new session

Creates a new CashDrawerSession and sets drawer status to OPEN POST /api/v1/cash-drawers/${param0}/open/ */
export async function cashDrawersOpenCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawersOpenCreateParams,
  body: API.OpenDrawer,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CashDrawer>(`/api/v1/cash-drawers/${param0}/open/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Get drawer summary for current session GET /api/v1/cash-drawers/${param0}/summary/ */
export async function cashDrawersSummaryRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawersSummaryRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    opening_balance?: string;
    current_balance?: string;
    expected_balance?: string;
    variance?: string;
    total_cash_in?: string;
    total_cash_out?: string;
    total_sales?: string;
    session_duration?: string;
    entry_count?: number;
  }>(`/api/v1/cash-drawers/${param0}/summary/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Get variance analysis report for drawer sessions
Requires Manager or above permission GET /api/v1/cash-drawers/${param0}/variance-report/ */
export async function cashDrawersVarianceReportRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawersVarianceReportRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    sessions?: {
      session_id?: number;
      date?: string;
      employee?: string;
      variance?: string;
      variance_percentage?: string;
    }[];
    total_variance?: string;
    sessions_with_variance?: number;
    average_variance?: string;
  }>(`/api/v1/cash-drawers/${param0}/variance-report/`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
