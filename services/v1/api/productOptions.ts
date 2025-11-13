// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** Manage menu item product options within a tenant scope.
Owners/Admins can write; Members retain read access for operational visibility. GET /api/v1/product-options/ */
export async function productOptionsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.productOptionsListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedProductOptionList>("/api/v1/product-options/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Manage menu item product options within a tenant scope.
Owners/Admins can write; Members retain read access for operational visibility. POST /api/v1/product-options/ */
export async function productOptionsCreate(
  body: API.ProductOption,
  options?: { [key: string]: any }
) {
  return request<API.ProductOption>("/api/v1/product-options/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Manage menu item product options within a tenant scope.
Owners/Admins can write; Members retain read access for operational visibility. GET /api/v1/product-options/${param0}/ */
export async function productOptionsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.productOptionsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ProductOption>(`/api/v1/product-options/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Manage menu item product options within a tenant scope.
Owners/Admins can write; Members retain read access for operational visibility. PUT /api/v1/product-options/${param0}/ */
export async function productOptionsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.productOptionsUpdateParams,
  body: API.ProductOption,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ProductOption>(`/api/v1/product-options/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Manage menu item product options within a tenant scope.
Owners/Admins can write; Members retain read access for operational visibility. DELETE /api/v1/product-options/${param0}/ */
export async function productOptionsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.productOptionsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/product-options/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Manage menu item product options within a tenant scope.
Owners/Admins can write; Members retain read access for operational visibility. PATCH /api/v1/product-options/${param0}/ */
export async function productOptionsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.productOptionsPartialUpdateParams,
  body: API.PatchedProductOption,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ProductOption>(`/api/v1/product-options/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
