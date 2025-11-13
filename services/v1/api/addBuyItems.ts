// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 此处后端没有提供注释 GET /api/v1/add-buy-items/ */
export async function addBuyItemsList(options?: { [key: string]: any }) {
  return request<API.AddBuyItem[]>("/api/v1/add-buy-items/", {
    method: "GET",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/add-buy-items/ */
export async function addBuyItemsCreate(
  body: API.AddBuyItem,
  options?: { [key: string]: any }
) {
  return request<API.AddBuyItem>("/api/v1/add-buy-items/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/add-buy-items/${param0}/ */
export async function addBuyItemsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addBuyItemsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AddBuyItem>(`/api/v1/add-buy-items/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/add-buy-items/${param0}/ */
export async function addBuyItemsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addBuyItemsUpdateParams,
  body: API.AddBuyItem,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AddBuyItem>(`/api/v1/add-buy-items/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/v1/add-buy-items/${param0}/ */
export async function addBuyItemsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addBuyItemsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/add-buy-items/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/v1/add-buy-items/${param0}/ */
export async function addBuyItemsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addBuyItemsPartialUpdateParams,
  body: API.PatchedAddBuyItem,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AddBuyItem>(`/api/v1/add-buy-items/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
