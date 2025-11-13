// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 此处后端没有提供注释 GET /api/v1/tenants/ */
export async function tenantsList(options?: { [key: string]: any }) {
  return request<any>("/api/v1/tenants/", {
    method: "GET",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/tenants/ */
export async function tenantsCreate(
  body: API.Tenant,
  options?: { [key: string]: any }
) {
  return request<API.Tenant>("/api/v1/tenants/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** GET /api/tenants/{uuid}/
Owner can view detailed tenant information.
Admin/Member receive basic tenant data without stats. GET /api/v1/tenants/${param0}/ */
export async function tenantsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tenantsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { uuid: param0, ...queryParams } = params;
  return request<API.TenantDetail>(`/api/v1/tenants/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/tenants/${param0}/ */
export async function tenantsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tenantsUpdateParams,
  body: API.Tenant,
  options?: { [key: string]: any }
) {
  const { uuid: param0, ...queryParams } = params;
  return request<API.Tenant>(`/api/v1/tenants/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/v1/tenants/${param0}/ */
export async function tenantsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tenantsDestroyParams,
  options?: { [key: string]: any }
) {
  const { uuid: param0, ...queryParams } = params;
  return request<any>(`/api/v1/tenants/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/v1/tenants/${param0}/ */
export async function tenantsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tenantsPartialUpdateParams,
  body: API.PatchedTenant,
  options?: { [key: string]: any }
) {
  const { uuid: param0, ...queryParams } = params;
  return request<API.Tenant>(`/api/v1/tenants/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/tenants/${param0}/transfer-ownership/ */
export async function tenantsTransferOwnershipCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tenantsTransferOwnershipCreateParams,
  body: API.TenantOwnershipTransfer,
  options?: { [key: string]: any }
) {
  const { uuid: param0, ...queryParams } = params;
  return request<API.TenantOwnershipTransfer>(
    `/api/v1/tenants/${param0}/transfer-ownership/`,
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

/** /api/tenants/{tenant_uuid}/invitations/  (create/list) GET /api/v1/tenants/${param1}/invitations/ */
export async function tenantsInvitationsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tenantsInvitationsListParams,
  options?: { [key: string]: any }
) {
  const { tenant_pk: param0, tenant_uuid: param1, ...queryParams } = params;
  return request<API.TenantInvitationCreate[]>(
    `/api/v1/tenants/${param1}/invitations/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** /api/tenants/{tenant_uuid}/invitations/  (create/list) POST /api/v1/tenants/${param1}/invitations/ */
export async function tenantsInvitationsCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tenantsInvitationsCreateParams,
  body: API.TenantInvitationCreate,
  options?: { [key: string]: any }
) {
  const { tenant_pk: param0, tenant_uuid: param1, ...queryParams } = params;
  return request<API.TenantInvitationCreate>(
    `/api/v1/tenants/${param1}/invitations/`,
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

/** /api/tenants/{tenant_uuid}/invitations/  (create/list) GET /api/v1/tenants/${param2}/invitations/${param0}/ */
export async function tenantsInvitationsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tenantsInvitationsRetrieveParams,
  options?: { [key: string]: any }
) {
  const {
    id: param0,
    tenant_pk: param1,
    tenant_uuid: param2,
    ...queryParams
  } = params;
  return request<API.TenantInvitationCreate>(
    `/api/v1/tenants/${param2}/invitations/${param0}/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** /api/tenants/{tenant_uuid}/invitations/  (create/list) DELETE /api/v1/tenants/${param2}/invitations/${param0}/ */
export async function tenantsInvitationsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tenantsInvitationsDestroyParams,
  options?: { [key: string]: any }
) {
  const {
    id: param0,
    tenant_pk: param1,
    tenant_uuid: param2,
    ...queryParams
  } = params;
  return request<any>(`/api/v1/tenants/${param2}/invitations/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** /api/tenants/{tenant_uuid}/invitations/  (create/list) PATCH /api/v1/tenants/${param2}/invitations/${param0}/ */
export async function tenantsInvitationsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tenantsInvitationsPartialUpdateParams,
  body: API.PatchedTenantInvitationCancel,
  options?: { [key: string]: any }
) {
  const {
    id: param0,
    tenant_pk: param1,
    tenant_uuid: param2,
    ...queryParams
  } = params;
  return request<API.TenantInvitationCreate>(
    `/api/v1/tenants/${param2}/invitations/${param0}/`,
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

/** GET /api/tenants/my-memberships/
Returns all tenant memberships for the authenticated user
Admin and Member can see which tenants they belong to GET /api/v1/tenants/my-memberships/ */
export async function tenantsMyMembershipsList(options?: {
  [key: string]: any;
}) {
  return request<API.MembershipInfo[]>("/api/v1/tenants/my-memberships/", {
    method: "GET",
    ...(options || {}),
  });
}
