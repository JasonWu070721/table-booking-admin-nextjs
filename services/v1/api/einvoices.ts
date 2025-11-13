// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** Manage invoice allowances (credit notes). GET /api/v1/einvoices/allowances/ */
export async function einvoicesAllowancesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesAllowancesListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedInvoiceAllowanceList>(
    "/api/v1/einvoices/allowances/",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Manage invoice allowances (credit notes). POST /api/v1/einvoices/allowances/ */
export async function einvoicesAllowancesCreate(
  body: API.InvoiceAllowanceCreate,
  options?: { [key: string]: any }
) {
  return request<API.InvoiceAllowanceCreate>("/api/v1/einvoices/allowances/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Manage invoice allowances (credit notes). GET /api/v1/einvoices/allowances/${param0}/ */
export async function einvoicesAllowancesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesAllowancesRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.InvoiceAllowance>(
    `/api/v1/einvoices/allowances/${param0}/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Manage invoice allowances (credit notes). PUT /api/v1/einvoices/allowances/${param0}/ */
export async function einvoicesAllowancesUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesAllowancesUpdateParams,
  body: API.InvoiceAllowance,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.InvoiceAllowance>(
    `/api/v1/einvoices/allowances/${param0}/`,
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

/** Manage invoice allowances (credit notes). DELETE /api/v1/einvoices/allowances/${param0}/ */
export async function einvoicesAllowancesDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesAllowancesDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/einvoices/allowances/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Manage invoice allowances (credit notes). PATCH /api/v1/einvoices/allowances/${param0}/ */
export async function einvoicesAllowancesPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesAllowancesPartialUpdateParams,
  body: API.PatchedInvoiceAllowance,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.InvoiceAllowance>(
    `/api/v1/einvoices/allowances/${param0}/`,
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

/** Manage invoice allowances (credit notes). POST /api/v1/einvoices/allowances/${param0}/void/ */
export async function einvoicesAllowancesVoidCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesAllowancesVoidCreateParams,
  body: API.InvoiceAllowanceVoid,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.InvoiceAllowanceVoid>(
    `/api/v1/einvoices/allowances/${param0}/void/`,
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

/** Issue and manage invoices. GET /api/v1/einvoices/invoices/ */
export async function einvoicesInvoicesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesInvoicesListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedInvoiceList>("/api/v1/einvoices/invoices/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Issue and manage invoices. POST /api/v1/einvoices/invoices/ */
export async function einvoicesInvoicesCreate(
  body: API.Invoice,
  options?: { [key: string]: any }
) {
  return request<API.Invoice>("/api/v1/einvoices/invoices/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Issue and manage invoices. GET /api/v1/einvoices/invoices/${param0}/ */
export async function einvoicesInvoicesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesInvoicesRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Invoice>(`/api/v1/einvoices/invoices/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Issue and manage invoices. PUT /api/v1/einvoices/invoices/${param0}/ */
export async function einvoicesInvoicesUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesInvoicesUpdateParams,
  body: API.Invoice,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Invoice>(`/api/v1/einvoices/invoices/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Issue and manage invoices. DELETE /api/v1/einvoices/invoices/${param0}/ */
export async function einvoicesInvoicesDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesInvoicesDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/einvoices/invoices/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Issue and manage invoices. PATCH /api/v1/einvoices/invoices/${param0}/ */
export async function einvoicesInvoicesPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesInvoicesPartialUpdateParams,
  body: API.PatchedInvoice,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Invoice>(`/api/v1/einvoices/invoices/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Issue and manage invoices. POST /api/v1/einvoices/invoices/${param0}/void/ */
export async function einvoicesInvoicesVoidCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesInvoicesVoidCreateParams,
  body: API.Invoice,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Invoice>(`/api/v1/einvoices/invoices/${param0}/void/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Manage invoice tracks per tenant. GET /api/v1/einvoices/tracks/ */
export async function einvoicesTracksList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesTracksListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedInvoiceTrackList>("/api/v1/einvoices/tracks/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Manage invoice tracks per tenant. POST /api/v1/einvoices/tracks/ */
export async function einvoicesTracksCreate(
  body: API.InvoiceTrack,
  options?: { [key: string]: any }
) {
  return request<API.InvoiceTrack>("/api/v1/einvoices/tracks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Manage invoice tracks per tenant. GET /api/v1/einvoices/tracks/${param0}/ */
export async function einvoicesTracksRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesTracksRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.InvoiceTrack>(`/api/v1/einvoices/tracks/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Manage invoice tracks per tenant. PUT /api/v1/einvoices/tracks/${param0}/ */
export async function einvoicesTracksUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesTracksUpdateParams,
  body: API.InvoiceTrack,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.InvoiceTrack>(`/api/v1/einvoices/tracks/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Manage invoice tracks per tenant. DELETE /api/v1/einvoices/tracks/${param0}/ */
export async function einvoicesTracksDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesTracksDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/einvoices/tracks/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Manage invoice tracks per tenant. PATCH /api/v1/einvoices/tracks/${param0}/ */
export async function einvoicesTracksPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesTracksPartialUpdateParams,
  body: API.PatchedInvoiceTrack,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.InvoiceTrack>(`/api/v1/einvoices/tracks/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Manage invoice tracks per tenant. POST /api/v1/einvoices/tracks/${param0}/set-default/ */
export async function einvoicesTracksSetDefaultCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.einvoicesTracksSetDefaultCreateParams,
  body: API.InvoiceTrack,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.InvoiceTrack>(
    `/api/v1/einvoices/tracks/${param0}/set-default/`,
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
