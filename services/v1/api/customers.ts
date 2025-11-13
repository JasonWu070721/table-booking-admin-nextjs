// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** List customer aggregates for the active tenant. GET /api/v1/customers/ */
export async function customersList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.customersListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedCustomerList>("/api/v1/customers/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** GET /api/customers/{id}/coupons/ GET /api/v1/customers/${param0}/coupons/ */
export async function customersCouponsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.customersCouponsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Customer>(`/api/v1/customers/${param0}/coupons/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** GET /api/customers/{id}/history/ GET /api/v1/customers/${param0}/history/ */
export async function customersHistoryRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.customersHistoryRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CustomerHistory>(`/api/v1/customers/${param0}/history/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** POST /api/customers/{id}/coupons/{coupon_id}/use/ POST /api/v1/customers/${param1}/coupons/${param0}/use/ */
export async function customersCouponsUseCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.customersCouponsUseCreateParams,
  body: API.Customer,
  options?: { [key: string]: any }
) {
  const { coupon_id: param0, id: param1, ...queryParams } = params;
  return request<API.Customer>(
    `/api/v1/customers/${param1}/coupons/${param0}/use/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** GET /api/customers/export/ GET /api/v1/customers/export/ */
export async function customersExportRetrieve(options?: {
  [key: string]: any;
}) {
  return request<API.Customer>("/api/v1/customers/export/", {
    method: "GET",
    ...(options || {}),
  });
}
