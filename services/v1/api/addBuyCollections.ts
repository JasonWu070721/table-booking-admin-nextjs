// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 此处后端没有提供注释 GET /api/v1/add-buy-collections/ */
export async function addBuyCollectionsList(options?: { [key: string]: any }) {
  return request<API.AddBuyCollection[]>("/api/v1/add-buy-collections/", {
    method: "GET",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/add-buy-collections/ */
export async function addBuyCollectionsCreate(
  body: API.AddBuyCollection,
  options?: { [key: string]: any }
) {
  return request<API.AddBuyCollection>("/api/v1/add-buy-collections/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/add-buy-collections/${param0}/ */
export async function addBuyCollectionsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addBuyCollectionsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AddBuyCollection>(
    `/api/v1/add-buy-collections/${param0}/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 PUT /api/v1/add-buy-collections/${param0}/ */
export async function addBuyCollectionsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addBuyCollectionsUpdateParams,
  body: API.AddBuyCollection,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AddBuyCollection>(
    `/api/v1/add-buy-collections/${param0}/`,
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

/** 此处后端没有提供注释 DELETE /api/v1/add-buy-collections/${param0}/ */
export async function addBuyCollectionsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addBuyCollectionsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/add-buy-collections/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/v1/add-buy-collections/${param0}/ */
export async function addBuyCollectionsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addBuyCollectionsPartialUpdateParams,
  body: API.PatchedAddBuyCollection,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AddBuyCollection>(
    `/api/v1/add-buy-collections/${param0}/`,
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

/** 此处后端没有提供注释 POST /api/v1/add-buy-collections/${param0}/items/batch/ */
export async function addBuyCollectionsItemsBatchCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addBuyCollectionsItemsBatchCreateParams,
  body: API.AddBuyCollection,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AddBuyCollection>(
    `/api/v1/add-buy-collections/${param0}/items/batch/`,
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

/** 此处后端没有提供注释 GET /api/v1/add-buy-collections/${param0}/statistics/ */
export async function addBuyCollectionsStatisticsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addBuyCollectionsStatisticsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AddBuyCollection>(
    `/api/v1/add-buy-collections/${param0}/statistics/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
