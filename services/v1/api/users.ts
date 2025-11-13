// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 此处后端没有提供注释 GET /api/v1/users/ */
export async function usersList(options?: { [key: string]: any }) {
  return request<API.User[]>("/api/v1/users/", {
    method: "GET",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/users/${param0}/ */
export async function usersRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.usersRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.User>(`/api/v1/users/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** GET /api/users/me/
Returns the authenticated user's basic profile GET /api/v1/users/me/ */
export async function usersMeRetrieve(options?: { [key: string]: any }) {
  return request<API.User>("/api/v1/users/me/", {
    method: "GET",
    ...(options || {}),
  });
}

/** POST /api/users/switch-tenant/
Switch the user's active tenant context
Body: { "tenant_uuid": "<uuid>" } POST /api/v1/users/switch-tenant/ */
export async function usersSwitchTenantCreate(
  body: API.SwitchTenant,
  options?: { [key: string]: any }
) {
  return request<API.User>("/api/v1/users/switch-tenant/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
