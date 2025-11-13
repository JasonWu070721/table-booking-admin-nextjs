// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** ViewSet for cash entry management
Most entries are created automatically through drawer operations
Manual entries can be created for corrections GET /api/v1/cash-entries/ */
export async function cashEntriesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashEntriesListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedCashEntryListList>("/api/v1/cash-entries/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** ViewSet for cash entry management
Most entries are created automatically through drawer operations
Manual entries can be created for corrections POST /api/v1/cash-entries/ */
export async function cashEntriesCreate(
  body: API.CashEntry,
  options?: { [key: string]: any }
) {
  return request<API.CashEntry>("/api/v1/cash-entries/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for cash entry management
Most entries are created automatically through drawer operations
Manual entries can be created for corrections GET /api/v1/cash-entries/${param0}/ */
export async function cashEntriesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashEntriesRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CashEntry>(`/api/v1/cash-entries/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for cash entry management
Most entries are created automatically through drawer operations
Manual entries can be created for corrections PUT /api/v1/cash-entries/${param0}/ */
export async function cashEntriesUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashEntriesUpdateParams,
  body: API.CashEntry,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CashEntry>(`/api/v1/cash-entries/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for cash entry management
Most entries are created automatically through drawer operations
Manual entries can be created for corrections DELETE /api/v1/cash-entries/${param0}/ */
export async function cashEntriesDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashEntriesDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/cash-entries/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for cash entry management
Most entries are created automatically through drawer operations
Manual entries can be created for corrections PATCH /api/v1/cash-entries/${param0}/ */
export async function cashEntriesPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashEntriesPartialUpdateParams,
  body: API.PatchedCashEntry,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CashEntry>(`/api/v1/cash-entries/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Void a cash entry (mark as void, don't delete)
Requires Manager or above permission POST /api/v1/cash-entries/${param0}/void/ */
export async function cashEntriesVoidCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashEntriesVoidCreateParams,
  body: API.VoidEntry,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CashEntry>(`/api/v1/cash-entries/${param0}/void/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
