// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** List coupons available to the authenticated customer. GET /api/v1/my/coupons/ */
export async function myCouponsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.myCouponsListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedCustomerCouponList>("/api/v1/my/coupons/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Customer self-service reservation endpoint.
Allows authenticated users to manage their own reservations across tenants. GET /api/v1/my/reservations/ */
export async function myReservationsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.myReservationsListParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/my/reservations/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Customer self-service reservation endpoint.
Allows authenticated users to manage their own reservations across tenants. POST /api/v1/my/reservations/ */
export async function myReservationsCreate(
  body: API.Reservation,
  options?: { [key: string]: any }
) {
  return request<API.Reservation>("/api/v1/my/reservations/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Customer self-service reservation endpoint.
Allows authenticated users to manage their own reservations across tenants. GET /api/v1/my/reservations/${param0}/ */
export async function myReservationsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.myReservationsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Reservation>(`/api/v1/my/reservations/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** POST /api/v1/reservations/me/{id}/cancel/
Legacy alias: POST /api/my/reservations/{id}/cancel/
Allows customers to cancel their own upcoming reservations. POST /api/v1/my/reservations/${param0}/cancel/ */
export async function myReservationsCancelCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.myReservationsCancelCreateParams,
  body: API.ReservationStatusUpdate,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Reservation>(`/api/v1/my/reservations/${param0}/cancel/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
