// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** Register + create a tenant + set the user as the sole Owner of that tenant POST /api/v1/register-and-create-tenant/ */
export async function registerAndCreateTenantCreate(
  body: API.RegisterAndCreateTenant,
  options?: { [key: string]: any }
) {
  return request<API.RegisterAndCreateTenant>(
    "/api/v1/register-and-create-tenant/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}
