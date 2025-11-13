// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** Manage menu item product variants with SKU lookup and batch stock updates. GET /api/v1/product-variants/ */
export async function productVariantsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.productVariantsListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedProductVariantList>("/api/v1/product-variants/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Manage menu item product variants with SKU lookup and batch stock updates. POST /api/v1/product-variants/ */
export async function productVariantsCreate(
  body: API.ProductVariant,
  options?: { [key: string]: any }
) {
  return request<API.ProductVariant>("/api/v1/product-variants/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Manage menu item product variants with SKU lookup and batch stock updates. GET /api/v1/product-variants/${param0}/ */
export async function productVariantsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.productVariantsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ProductVariant>(`/api/v1/product-variants/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Manage menu item product variants with SKU lookup and batch stock updates. PUT /api/v1/product-variants/${param0}/ */
export async function productVariantsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.productVariantsUpdateParams,
  body: API.ProductVariant,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ProductVariant>(`/api/v1/product-variants/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Manage menu item product variants with SKU lookup and batch stock updates. DELETE /api/v1/product-variants/${param0}/ */
export async function productVariantsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.productVariantsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/product-variants/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Manage menu item product variants with SKU lookup and batch stock updates. PATCH /api/v1/product-variants/${param0}/ */
export async function productVariantsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.productVariantsPartialUpdateParams,
  body: API.PatchedProductVariant,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ProductVariant>(`/api/v1/product-variants/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Batch update stock quantities for variants identified by ID or SKU. POST /api/v1/product-variants/batch-update-stock/ */
export async function productVariantsBatchUpdateStockCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.productVariantsBatchUpdateStockCreateParams,
  body: API.ProductVariantBatchStockUpdate,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedProductVariantList>(
    "/api/v1/product-variants/batch-update-stock/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        ...params,
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** Fetch a single variant by SKU scoped to the active tenant. GET /api/v1/product-variants/by-sku/${param0}/ */
export async function productVariantsBySkuRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.productVariantsBySkuRetrieveParams,
  options?: { [key: string]: any }
) {
  const { sku: param0, ...queryParams } = params;
  return request<API.ProductVariant>(
    `/api/v1/product-variants/by-sku/${param0}/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
