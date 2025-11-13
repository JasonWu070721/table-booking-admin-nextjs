// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** ViewSet for managing menu item collections (custom, smart, combo). GET /api/v1/item-collections/ */
export async function itemCollectionsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemCollectionsListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedItemCollectionListList>(
    "/api/v1/item-collections/",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** ViewSet for managing menu item collections (custom, smart, combo). POST /api/v1/item-collections/ */
export async function itemCollectionsCreate(
  body: API.ItemCollectionWrite,
  options?: { [key: string]: any }
) {
  return request<API.ItemCollectionWrite>("/api/v1/item-collections/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for managing menu item collections (custom, smart, combo). GET /api/v1/item-collections/${param0}/ */
export async function itemCollectionsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemCollectionsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ItemCollectionDetail>(
    `/api/v1/item-collections/${param0}/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** ViewSet for managing menu item collections (custom, smart, combo). PUT /api/v1/item-collections/${param0}/ */
export async function itemCollectionsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemCollectionsUpdateParams,
  body: API.ItemCollectionWrite,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ItemCollectionWrite>(
    `/api/v1/item-collections/${param0}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** ViewSet for managing menu item collections (custom, smart, combo). DELETE /api/v1/item-collections/${param0}/ */
export async function itemCollectionsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemCollectionsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/item-collections/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for managing menu item collections (custom, smart, combo). PATCH /api/v1/item-collections/${param0}/ */
export async function itemCollectionsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemCollectionsPartialUpdateParams,
  body: API.PatchedItemCollectionWrite,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ItemCollectionWrite>(
    `/api/v1/item-collections/${param0}/`,
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

/** Add a menu item to a collection (CUSTOM/COMBO only). POST /api/v1/item-collections/${param0}/items/ */
export async function itemCollectionsItemsCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemCollectionsItemsCreateParams,
  body: {
    item_id: number;
  },
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ItemCollectionDetail>(
    `/api/v1/item-collections/${param0}/items/`,
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

/** Remove a menu item from a collection (CUSTOM/COMBO only). DELETE /api/v1/item-collections/${param0}/items/${param1}/ */
export async function itemCollectionsItemsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemCollectionsItemsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, item_id: param1, ...queryParams } = params;
  return request<any>(`/api/v1/item-collections/${param0}/items/${param1}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update manual ordering for a collection (CUSTOM/COMBO). Supports PUT and POST. PUT /api/v1/item-collections/${param0}/items/manual-order/ */
export async function itemCollectionsItemsManualOrderUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemCollectionsItemsManualOrderUpdateParams,
  body: {
    item_ids: number[];
  },
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ItemCollectionDetail>(
    `/api/v1/item-collections/${param0}/items/manual-order/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** Update manual ordering for a collection (CUSTOM/COMBO). Supports PUT and POST. POST /api/v1/item-collections/${param0}/items/manual-order/ */
export async function itemCollectionsItemsManualOrderCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemCollectionsItemsManualOrderCreateParams,
  body: {
    item_ids: number[];
  },
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ItemCollectionDetail>(
    `/api/v1/item-collections/${param0}/items/manual-order/`,
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

/** Preview items that would be included based on smart rules. GET /api/v1/item-collections/${param0}/preview/ */
export async function itemCollectionsPreviewRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.itemCollectionsPreviewRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PaginatedMenuItemList>(
    `/api/v1/item-collections/${param0}/preview/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
