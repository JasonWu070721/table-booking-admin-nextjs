// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** POST /api/public/reservations/
Create a reservation without requiring authentication. POST /api/v1/public/reservations/ */
export async function publicReservationsCreate(
  body: API.Reservation,
  options?: { [key: string]: any }
) {
  return request<API.Reservation>("/api/v1/public/reservations/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** GET /api/public/reservations/availability/
Returns customer-facing availability for a tenant without authentication. GET /api/v1/public/reservations/availability/ */
export async function publicReservationsAvailabilityRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.publicReservationsAvailabilityRetrieveParams,
  options?: { [key: string]: any }
) {
  return request<API.ReservationAvailabilityResponse>(
    "/api/v1/public/reservations/availability/",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
