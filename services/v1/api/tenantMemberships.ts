// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** Provides management APIs for tenant memberships within the active tenant context.
Only Owner/Admin can access these endpoints. GET /api/v1/tenant-memberships/ */
export async function tenantMembershipsList(options?: { [key: string]: any }) {
  return request<API.TenantMembershipManage[]>("/api/v1/tenant-memberships/", {
    method: "GET",
    ...(options || {}),
  });
}

/** Provides management APIs for tenant memberships within the active tenant context.
Only Owner/Admin can access these endpoints. DELETE /api/v1/tenant-memberships/${param0}/ */
export async function tenantMembershipsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tenantMembershipsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/tenant-memberships/${param0}/`, {
    method: "DELETE",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** Provides management APIs for tenant memberships within the active tenant context.
Only Owner/Admin can access these endpoints. PATCH /api/v1/tenant-memberships/${param0}/ */
export async function tenantMembershipsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tenantMembershipsPartialUpdateParams,
  body: API.PatchedTenantMembershipManage,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TenantMembershipManage>(
    `/api/v1/tenant-memberships/${param0}/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}
