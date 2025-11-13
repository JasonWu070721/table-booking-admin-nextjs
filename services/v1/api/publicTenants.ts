// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** Publicly accessible tenant directory.
Enables customers to explore participating venues without authentication. GET /api/v1/public/tenants/ */
export async function publicTenantsList(options?: { [key: string]: any }) {
  return request<API.PublicTenantList[]>("/api/v1/public/tenants/", {
    method: "GET",
    ...(options || {}),
  });
}

/** Publicly accessible tenant directory.
Enables customers to explore participating venues without authentication. GET /api/v1/public/tenants/${param0}/ */
export async function publicTenantsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.publicTenantsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { uuid: param0, ...queryParams } = params;
  return request<API.PublicTenantDetail>(`/api/v1/public/tenants/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}
