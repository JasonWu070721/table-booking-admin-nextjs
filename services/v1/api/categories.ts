// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** List all menu categories for current tenant GET /api/v1/categories/ */
export async function categoriesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.categoriesListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedMenuCategoryList>("/api/v1/categories/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** ViewSet for MenuCategory CRUD operations

Permissions:
- Owner/Admin/Member: can manage all categories in their tenant
- All operations are tenant-scoped POST /api/v1/categories/ */
export async function categoriesCreate(
  body: API.MenuCategory,
  options?: { [key: string]: any }
) {
  return request<API.MenuCategory>("/api/v1/categories/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for MenuCategory CRUD operations

Permissions:
- Owner/Admin/Member: can manage all categories in their tenant
- All operations are tenant-scoped GET /api/v1/categories/${param0}/ */
export async function categoriesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.categoriesRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.MenuCategory>(`/api/v1/categories/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for MenuCategory CRUD operations

Permissions:
- Owner/Admin/Member: can manage all categories in their tenant
- All operations are tenant-scoped PUT /api/v1/categories/${param0}/ */
export async function categoriesUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.categoriesUpdateParams,
  body: API.MenuCategory,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.MenuCategory>(`/api/v1/categories/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for MenuCategory CRUD operations

Permissions:
- Owner/Admin/Member: can manage all categories in their tenant
- All operations are tenant-scoped DELETE /api/v1/categories/${param0}/ */
export async function categoriesDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.categoriesDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/categories/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for MenuCategory CRUD operations

Permissions:
- Owner/Admin/Member: can manage all categories in their tenant
- All operations are tenant-scoped PATCH /api/v1/categories/${param0}/ */
export async function categoriesPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.categoriesPartialUpdateParams,
  body: API.PatchedMenuCategory,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.MenuCategory>(`/api/v1/categories/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
