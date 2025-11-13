// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** ViewSet for viewing cash drawer sessions
Read-only - sessions are created/updated through drawer operations GET /api/v1/cash-drawer-sessions/ */
export async function cashDrawerSessionsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawerSessionsListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedCashDrawerSessionListList>(
    "/api/v1/cash-drawer-sessions/",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** ViewSet for viewing cash drawer sessions
Read-only - sessions are created/updated through drawer operations GET /api/v1/cash-drawer-sessions/${param0}/ */
export async function cashDrawerSessionsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cashDrawerSessionsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CashDrawerSession>(
    `/api/v1/cash-drawer-sessions/${param0}/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
