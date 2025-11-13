// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** List all menu items for current tenant GET /api/v1/items/ */
export async function itemsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemsListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedMenuItemList>("/api/v1/items/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** ViewSet for MenuItem CRUD and batch operations

Permissions:
- Owner/Admin/Member: can manage all menu items in their tenant
- All operations are tenant-scoped

Features:
- List/Create/Update/Delete menu items
- Filter by menu, category, availability
- Batch create items
- Batch update items
- Batch delete items
- Update stock quantity POST /api/v1/items/ */
export async function itemsCreate(
  body: API.MenuItem,
  options?: { [key: string]: any }
) {
  return request<API.MenuItem>("/api/v1/items/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for MenuItem CRUD and batch operations

Permissions:
- Owner/Admin/Member: can manage all menu items in their tenant
- All operations are tenant-scoped

Features:
- List/Create/Update/Delete menu items
- Filter by menu, category, availability
- Batch create items
- Batch update items
- Batch delete items
- Update stock quantity GET /api/v1/items/${param0}/ */
export async function itemsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.MenuItem>(`/api/v1/items/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for MenuItem CRUD and batch operations

Permissions:
- Owner/Admin/Member: can manage all menu items in their tenant
- All operations are tenant-scoped

Features:
- List/Create/Update/Delete menu items
- Filter by menu, category, availability
- Batch create items
- Batch update items
- Batch delete items
- Update stock quantity PUT /api/v1/items/${param0}/ */
export async function itemsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemsUpdateParams,
  body: API.MenuItem,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.MenuItem>(`/api/v1/items/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for MenuItem CRUD and batch operations

Permissions:
- Owner/Admin/Member: can manage all menu items in their tenant
- All operations are tenant-scoped

Features:
- List/Create/Update/Delete menu items
- Filter by menu, category, availability
- Batch create items
- Batch update items
- Batch delete items
- Update stock quantity DELETE /api/v1/items/${param0}/ */
export async function itemsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/items/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for MenuItem CRUD and batch operations

Permissions:
- Owner/Admin/Member: can manage all menu items in their tenant
- All operations are tenant-scoped

Features:
- List/Create/Update/Delete menu items
- Filter by menu, category, availability
- Batch create items
- Batch update items
- Batch delete items
- Update stock quantity PATCH /api/v1/items/${param0}/ */
export async function itemsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemsPartialUpdateParams,
  body: API.PatchedMenuItem,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.MenuItem>(`/api/v1/items/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Update stock quantity for a menu item PATCH /api/v1/items/${param0}/update-stock/ */
export async function itemsUpdateStockPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemsUpdateStockPartialUpdateParams,
  body: {
    stock_quantity: number;
  },
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.MenuItem>(`/api/v1/items/${param0}/update-stock/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Batch create multiple menu items POST /api/v1/items/batch-create/ */
export async function itemsBatchCreateCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemsBatchCreateCreateParams,
  body: API.MenuItem[],
  options?: { [key: string]: any }
) {
  return request<API.PaginatedMenuItemList>("/api/v1/items/batch-create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** Batch delete (soft or hard) multiple menu items DELETE /api/v1/items/batch-delete/ */
export async function itemsBatchDeleteDestroy(options?: {
  [key: string]: any;
}) {
  return request<any>("/api/v1/items/batch-delete/", {
    method: "DELETE",
    ...(options || {}),
  });
}

/** Batch update multiple menu items PATCH /api/v1/items/batch-update/ */
export async function itemsBatchUpdatePartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemsBatchUpdatePartialUpdateParams,
  body: API.PatchedBatchMenuItemUpdate,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedMenuItemList>("/api/v1/items/batch-update/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
