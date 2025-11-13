// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** Administrative CRUD for coupon definitions. GET /api/v1/coupons/ */
export async function couponsList(options?: { [key: string]: any }) {
  return request<API.Coupon[]>("/api/v1/coupons/", {
    method: "GET",
    ...(options || {}),
  });
}

/** Administrative CRUD for coupon definitions. POST /api/v1/coupons/ */
export async function couponsCreate(
  body: API.Coupon,
  options?: { [key: string]: any }
) {
  return request<API.Coupon>("/api/v1/coupons/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Administrative CRUD for coupon definitions. GET /api/v1/coupons/${param0}/ */
export async function couponsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.couponsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Coupon>(`/api/v1/coupons/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Administrative CRUD for coupon definitions. PUT /api/v1/coupons/${param0}/ */
export async function couponsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.couponsUpdateParams,
  body: API.Coupon,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Coupon>(`/api/v1/coupons/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Administrative CRUD for coupon definitions. DELETE /api/v1/coupons/${param0}/ */
export async function couponsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.couponsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/coupons/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Administrative CRUD for coupon definitions. PATCH /api/v1/coupons/${param0}/ */
export async function couponsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.couponsPartialUpdateParams,
  body: API.PatchedCoupon,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Coupon>(`/api/v1/coupons/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Administrative CRUD for coupon definitions. POST /api/v1/coupons/${param0}/issue-batch/ */
export async function couponsIssueBatchCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.couponsIssueBatchCreateParams,
  body: API.Coupon,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Coupon>(`/api/v1/coupons/${param0}/issue-batch/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Administrative CRUD for coupon definitions. POST /api/v1/coupons/${param0}/issue/ */
export async function couponsIssueCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.couponsIssueCreateParams,
  body: API.Coupon,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Coupon>(`/api/v1/coupons/${param0}/issue/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Administrative CRUD for coupon definitions. GET /api/v1/coupons/${param0}/usage-stats/ */
export async function couponsUsageStatsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.couponsUsageStatsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Coupon>(`/api/v1/coupons/${param0}/usage-stats/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** List coupons available to the authenticated customer. GET /api/v1/coupons/me/ */
export async function couponsMeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.couponsMeListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedCustomerCouponList>("/api/v1/coupons/me/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
