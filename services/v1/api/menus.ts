// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** List all menus for current tenant GET /api/v1/menus/ */
export async function menusList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menusListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedMenuList>("/api/v1/menus/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** ViewSet for Menu CRUD operations

Permissions:
- Owner/Admin/Member: can manage all menus in their tenant
- All operations are tenant-scoped

Features:
- List/Create/Update/Delete menus
- Retrieve menu details with items
- Clone existing menu
- Batch update menu items POST /api/v1/menus/ */
export async function menusCreate(
  body: API.Menu,
  options?: { [key: string]: any }
) {
  return request<API.Menu>("/api/v1/menus/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Retrieve menu details with all items GET /api/v1/menus/${param0}/ */
export async function menusRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menusRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.MenuDetail>(`/api/v1/menus/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for Menu CRUD operations

Permissions:
- Owner/Admin/Member: can manage all menus in their tenant
- All operations are tenant-scoped

Features:
- List/Create/Update/Delete menus
- Retrieve menu details with items
- Clone existing menu
- Batch update menu items PUT /api/v1/menus/${param0}/ */
export async function menusUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menusUpdateParams,
  body: API.Menu,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Menu>(`/api/v1/menus/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for Menu CRUD operations

Permissions:
- Owner/Admin/Member: can manage all menus in their tenant
- All operations are tenant-scoped

Features:
- List/Create/Update/Delete menus
- Retrieve menu details with items
- Clone existing menu
- Batch update menu items DELETE /api/v1/menus/${param0}/ */
export async function menusDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menusDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/menus/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for Menu CRUD operations

Permissions:
- Owner/Admin/Member: can manage all menus in their tenant
- All operations are tenant-scoped

Features:
- List/Create/Update/Delete menus
- Retrieve menu details with items
- Clone existing menu
- Batch update menu items PATCH /api/v1/menus/${param0}/ */
export async function menusPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menusPartialUpdateParams,
  body: API.PatchedMenu,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Menu>(`/api/v1/menus/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Clone an existing menu with all its items POST /api/v1/menus/${param0}/clone/ */
export async function menusCloneCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menusCloneCreateParams,
  body: {
    name?: string;
  },
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Menu>(`/api/v1/menus/${param0}/clone/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
