// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** Provides read access and state transitions for approval requests. GET /api/v1/approval-requests/ */
export async function approvalRequestsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.approvalRequestsListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedApprovalRequestList>(
    "/api/v1/approval-requests/",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Provides read access and state transitions for approval requests. GET /api/v1/approval-requests/${param0}/ */
export async function approvalRequestsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.approvalRequestsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApprovalRequestDetail>(
    `/api/v1/approval-requests/${param0}/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Provides read access and state transitions for approval requests. POST /api/v1/approval-requests/${param0}/approve/ */
export async function approvalRequestsApproveCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.approvalRequestsApproveCreateParams,
  body: API.ApprovalRequestDetail,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApprovalRequestDetail>(
    `/api/v1/approval-requests/${param0}/approve/`,
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

/** Provides read access and state transitions for approval requests. POST /api/v1/approval-requests/${param0}/cancel/ */
export async function approvalRequestsCancelCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.approvalRequestsCancelCreateParams,
  body: API.ApprovalRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApprovalRequestDetail>(
    `/api/v1/approval-requests/${param0}/cancel/`,
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

/** Provides read access and state transitions for approval requests. POST /api/v1/approval-requests/${param0}/reject/ */
export async function approvalRequestsRejectCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.approvalRequestsRejectCreateParams,
  body: API.ApprovalRequestReject,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApprovalRequestDetail>(
    `/api/v1/approval-requests/${param0}/reject/`,
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

/** Provides read access and state transitions for approval requests. GET /api/v1/approval-requests/my-requests/ */
export async function approvalRequestsMyRequestsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.approvalRequestsMyRequestsListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedApprovalRequestList>(
    "/api/v1/approval-requests/my-requests/",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Provides read access and state transitions for approval requests. GET /api/v1/approval-requests/pending/ */
export async function approvalRequestsPendingList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.approvalRequestsPendingListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedApprovalRequestList>(
    "/api/v1/approval-requests/pending/",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
