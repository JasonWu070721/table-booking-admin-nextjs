// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** List all queue tickets for the current tenant with optional filtering GET /api/v1/queues/ */
export async function queuesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queuesListParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/queues/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Issue a new queue ticket for a walk-in customer POST /api/v1/queues/ */
export async function queuesCreate(
  body: API.Queue,
  options?: { [key: string]: any }
) {
  return request<API.Queue>("/api/v1/queues/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for Queue (Ticket) CRUD and status transitions

Permissions:
- Owner/Admin/Member: can manage all queue tickets in their tenant
- All operations are tenant-scoped GET /api/v1/queues/${param0}/ */
export async function queuesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queuesRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Queue>(`/api/v1/queues/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for Queue (Ticket) CRUD and status transitions

Permissions:
- Owner/Admin/Member: can manage all queue tickets in their tenant
- All operations are tenant-scoped PUT /api/v1/queues/${param0}/ */
export async function queuesUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queuesUpdateParams,
  body: API.Queue,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Queue>(`/api/v1/queues/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for Queue (Ticket) CRUD and status transitions

Permissions:
- Owner/Admin/Member: can manage all queue tickets in their tenant
- All operations are tenant-scoped DELETE /api/v1/queues/${param0}/ */
export async function queuesDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queuesDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/queues/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for Queue (Ticket) CRUD and status transitions

Permissions:
- Owner/Admin/Member: can manage all queue tickets in their tenant
- All operations are tenant-scoped PATCH /api/v1/queues/${param0}/ */
export async function queuesPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queuesPartialUpdateParams,
  body: API.PatchedQueue,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Queue>(`/api/v1/queues/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Call a waiting customer (WAITING → CALLED) POST /api/v1/queues/${param0}/call/ */
export async function queuesCallCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queuesCallCreateParams,
  body: API.QueueStatusUpdate,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Queue>(`/api/v1/queues/${param0}/call/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Cancel a queue ticket (any non-final status → CANCELLED) POST /api/v1/queues/${param0}/cancel/ */
export async function queuesCancelCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queuesCancelCreateParams,
  body: API.QueueStatusUpdate,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Queue>(`/api/v1/queues/${param0}/cancel/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Convert a seated queue ticket into a formal reservation.
Ensures upstream reservation validation (overlap, capacity, tenant isolation). POST /api/v1/queues/${param0}/convert-to-reservation/ */
export async function queuesConvertToReservationCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queuesConvertToReservationCreateParams,
  body: API.QueueConvertToReservation,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Reservation>(
    `/api/v1/queues/${param0}/convert-to-reservation/`,
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

/** Mark a customer as no-show (CALLED → NO_SHOW) POST /api/v1/queues/${param0}/no-show/ */
export async function queuesNoShowCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queuesNoShowCreateParams,
  body: API.QueueStatusUpdate,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Queue>(`/api/v1/queues/${param0}/no-show/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Seat a customer at a table (WAITING/CALLED → SEATED)
Requires table_id in request body POST /api/v1/queues/${param0}/seat/ */
export async function queuesSeatCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queuesSeatCreateParams,
  body: API.QueueStatusUpdate,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Queue>(`/api/v1/queues/${param0}/seat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Get queue statistics for the current tenant GET /api/v1/queues/stats/ */
export async function queuesStatsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queuesStatsRetrieveParams,
  options?: { [key: string]: any }
) {
  return request<{
    total?: number;
    waiting?: number;
    called?: number;
    seated?: number;
    cancelled?: number;
    no_show?: number;
    avg_wait_time_minutes?: number;
  }>("/api/v1/queues/stats/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
