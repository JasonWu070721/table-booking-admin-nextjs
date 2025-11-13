// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** CRUD endpoints for configuring approval rules.
Only tenant owners can create or mutate rules. GET /api/v1/approval-rules/ */
export async function approvalRulesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.approvalRulesListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedApprovalRuleList>("/api/v1/approval-rules/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** CRUD endpoints for configuring approval rules.
Only tenant owners can create or mutate rules. POST /api/v1/approval-rules/ */
export async function approvalRulesCreate(
  body: API.ApprovalRule,
  options?: { [key: string]: any }
) {
  return request<API.ApprovalRule>("/api/v1/approval-rules/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** CRUD endpoints for configuring approval rules.
Only tenant owners can create or mutate rules. GET /api/v1/approval-rules/${param0}/ */
export async function approvalRulesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.approvalRulesRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApprovalRule>(`/api/v1/approval-rules/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** CRUD endpoints for configuring approval rules.
Only tenant owners can create or mutate rules. PUT /api/v1/approval-rules/${param0}/ */
export async function approvalRulesUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.approvalRulesUpdateParams,
  body: API.ApprovalRule,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApprovalRule>(`/api/v1/approval-rules/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** CRUD endpoints for configuring approval rules.
Only tenant owners can create or mutate rules. DELETE /api/v1/approval-rules/${param0}/ */
export async function approvalRulesDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.approvalRulesDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/approval-rules/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** CRUD endpoints for configuring approval rules.
Only tenant owners can create or mutate rules. PATCH /api/v1/approval-rules/${param0}/ */
export async function approvalRulesPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.approvalRulesPartialUpdateParams,
  body: API.PatchedApprovalRule,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApprovalRule>(`/api/v1/approval-rules/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
