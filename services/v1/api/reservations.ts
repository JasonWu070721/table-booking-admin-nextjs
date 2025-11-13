// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** ViewSet for Reservation CRUD and status transitions

Permissions:
- Owner/Admin/Member: can manage all reservations in their tenant
- All operations are tenant-scoped GET /api/v1/reservations/ */
export async function reservationsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsListParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/reservations/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** ViewSet for Reservation CRUD and status transitions

Permissions:
- Owner/Admin/Member: can manage all reservations in their tenant
- All operations are tenant-scoped POST /api/v1/reservations/ */
export async function reservationsCreate(
  body: API.Reservation,
  options?: { [key: string]: any }
) {
  return request<API.Reservation>("/api/v1/reservations/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for Reservation CRUD and status transitions

Permissions:
- Owner/Admin/Member: can manage all reservations in their tenant
- All operations are tenant-scoped GET /api/v1/reservations/${param0}/ */
export async function reservationsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Reservation>(`/api/v1/reservations/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for Reservation CRUD and status transitions

Permissions:
- Owner/Admin/Member: can manage all reservations in their tenant
- All operations are tenant-scoped PUT /api/v1/reservations/${param0}/ */
export async function reservationsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsUpdateParams,
  body: API.Reservation,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Reservation>(`/api/v1/reservations/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for Reservation CRUD and status transitions

Permissions:
- Owner/Admin/Member: can manage all reservations in their tenant
- All operations are tenant-scoped DELETE /api/v1/reservations/${param0}/ */
export async function reservationsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/reservations/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for Reservation CRUD and status transitions

Permissions:
- Owner/Admin/Member: can manage all reservations in their tenant
- All operations are tenant-scoped PATCH /api/v1/reservations/${param0}/ */
export async function reservationsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsPartialUpdateParams,
  body: API.PatchedReservation,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Reservation>(`/api/v1/reservations/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** POST /api/reservations/{id}/cancel/
Transition: any non-final status -> CANCELLED POST /api/v1/reservations/${param0}/cancel/ */
export async function reservationsCancelCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsCancelCreateParams,
  body: API.ReservationStatusUpdate,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Reservation>(`/api/v1/reservations/${param0}/cancel/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** POST /api/reservations/{id}/complete/
Transition: SEATED -> COMPLETED
Mark reservation as completed POST /api/v1/reservations/${param0}/complete/ */
export async function reservationsCompleteCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsCompleteCreateParams,
  body: API.ReservationStatusUpdate,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Reservation>(`/api/v1/reservations/${param0}/complete/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** POST /api/reservations/{id}/confirm/
Transition: PENDING/BOOKED -> CONFIRMED POST /api/v1/reservations/${param0}/confirm/ */
export async function reservationsConfirmCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsConfirmCreateParams,
  body: API.ReservationStatusUpdate,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Reservation>(`/api/v1/reservations/${param0}/confirm/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** POST /api/reservations/{id}/create-order/
Create a new order linked to this reservation

This bridges the reservation and ordering workflow. When a customer
with a reservation is seated and ready to order, this endpoint
automatically links the order to their reservation.

The order inherits:
- tenant from reservation
- table from reservation
- customer info from reservation (name, phone, email) POST /api/v1/reservations/${param0}/create-order/ */
export async function reservationsCreateOrderCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsCreateOrderCreateParams,
  body: API.ReservationCreateOrder,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/v1/reservations/${param0}/create-order/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** POST /api/reservations/{id}/no-show/
Transition: CONFIRMED/BOOKED/SEATED -> NO_SHOW
Mark customer as no-show POST /api/v1/reservations/${param0}/no-show/ */
export async function reservationsNoShowCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsNoShowCreateParams,
  body: API.ReservationStatusUpdate,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Reservation>(`/api/v1/reservations/${param0}/no-show/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** GET /api/reservations/{id}/orders/
List all orders associated with this reservation

Useful for tracking customer's complete dining history for this reservation,
including multiple courses or split orders. GET /api/v1/reservations/${param0}/orders/ */
export async function reservationsOrdersList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsOrdersListParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PaginatedOrderList>(
    `/api/v1/reservations/${param0}/orders/`,
    {
      method: "GET",
      params: {
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}

/** POST /api/reservations/{id}/seat/
Transition: CONFIRMED/BOOKED -> SEATED
Mark customer as seated POST /api/v1/reservations/${param0}/seat/ */
export async function reservationsSeatCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsSeatCreateParams,
  body: API.ReservationStatusUpdate,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Reservation>(`/api/v1/reservations/${param0}/seat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** GET /api/reservations/availability/
Returns available reservation start times and current table schedules
for the active tenant. GET /api/v1/reservations/availability/ */
export async function reservationsAvailabilityRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsAvailabilityRetrieveParams,
  options?: { [key: string]: any }
) {
  return request<API.ReservationAvailabilityResponse>(
    "/api/v1/reservations/availability/",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Cancel multiple reservations in a single request. Reservations already completed, cancelled, or marked as no-show cannot be cancelled again. POST /api/v1/reservations/batch-cancel/ */
export async function reservationsBatchCancelCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsBatchCancelCreateParams,
  body: API.ReservationBatchStatusRequest,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedReservationList>(
    "/api/v1/reservations/batch-cancel/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        ...params,
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** Confirm multiple reservations in a single request. All reservations must belong to the active tenant and be in PENDING or BOOKED status. POST /api/v1/reservations/batch-confirm/ */
export async function reservationsBatchConfirmCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsBatchConfirmCreateParams,
  body: API.ReservationBatchStatusRequest,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedReservationList>(
    "/api/v1/reservations/batch-confirm/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        ...params,
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** Customer self-service reservation endpoint.
Allows authenticated users to manage their own reservations across tenants. GET /api/v1/reservations/me/ */
export async function reservationsMeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsMeListParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/reservations/me/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Customer self-service reservation endpoint.
Allows authenticated users to manage their own reservations across tenants. POST /api/v1/reservations/me/ */
export async function reservationsMeCreate(
  body: API.Reservation,
  options?: { [key: string]: any }
) {
  return request<API.Reservation>("/api/v1/reservations/me/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Customer self-service reservation endpoint.
Allows authenticated users to manage their own reservations across tenants. GET /api/v1/reservations/me/${param0}/ */
export async function reservationsMeRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsMeRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Reservation>(`/api/v1/reservations/me/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** POST /api/v1/reservations/me/{id}/cancel/
Legacy alias: POST /api/my/reservations/{id}/cancel/
Allows customers to cancel their own upcoming reservations. POST /api/v1/reservations/me/${param0}/cancel/ */
export async function reservationsMeCancelCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reservationsMeCancelCreateParams,
  body: API.ReservationStatusUpdate,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Reservation>(`/api/v1/reservations/me/${param0}/cancel/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
