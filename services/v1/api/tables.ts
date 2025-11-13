// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** ViewSet for TableClosure CRUD

Permissions: Owner/Admin/Member can manage closures in their tenant
Used for maintenance, holidays, or blackout periods GET /api/v1/table-closures/ */
export async function tableClosuresList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableClosuresListParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/table-closures/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** ViewSet for TableClosure CRUD

Permissions: Owner/Admin/Member can manage closures in their tenant
Used for maintenance, holidays, or blackout periods POST /api/v1/table-closures/ */
export async function tableClosuresCreate(
  body: API.TableClosure,
  options?: { [key: string]: any }
) {
  return request<API.TableClosure>("/api/v1/table-closures/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableClosure CRUD

Permissions: Owner/Admin/Member can manage closures in their tenant
Used for maintenance, holidays, or blackout periods GET /api/v1/table-closures/${param0}/ */
export async function tableClosuresRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableClosuresRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableClosure>(`/api/v1/table-closures/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for TableClosure CRUD

Permissions: Owner/Admin/Member can manage closures in their tenant
Used for maintenance, holidays, or blackout periods PUT /api/v1/table-closures/${param0}/ */
export async function tableClosuresUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableClosuresUpdateParams,
  body: API.TableClosure,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableClosure>(`/api/v1/table-closures/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableClosure CRUD

Permissions: Owner/Admin/Member can manage closures in their tenant
Used for maintenance, holidays, or blackout periods DELETE /api/v1/table-closures/${param0}/ */
export async function tableClosuresDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableClosuresDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/table-closures/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for TableClosure CRUD

Permissions: Owner/Admin/Member can manage closures in their tenant
Used for maintenance, holidays, or blackout periods PATCH /api/v1/table-closures/${param0}/ */
export async function tableClosuresPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableClosuresPartialUpdateParams,
  body: API.PatchedTableClosure,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableClosure>(`/api/v1/table-closures/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableFeature CRUD

Permissions: Owner/Admin/Member can manage features in their tenant GET /api/v1/table-features/ */
export async function tableFeaturesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableFeaturesListParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/table-features/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** ViewSet for TableFeature CRUD

Permissions: Owner/Admin/Member can manage features in their tenant POST /api/v1/table-features/ */
export async function tableFeaturesCreate(
  body: API.TableFeature,
  options?: { [key: string]: any }
) {
  return request<API.TableFeature>("/api/v1/table-features/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableFeature CRUD

Permissions: Owner/Admin/Member can manage features in their tenant GET /api/v1/table-features/${param0}/ */
export async function tableFeaturesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableFeaturesRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableFeature>(`/api/v1/table-features/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for TableFeature CRUD

Permissions: Owner/Admin/Member can manage features in their tenant PUT /api/v1/table-features/${param0}/ */
export async function tableFeaturesUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableFeaturesUpdateParams,
  body: API.TableFeature,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableFeature>(`/api/v1/table-features/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableFeature CRUD

Permissions: Owner/Admin/Member can manage features in their tenant DELETE /api/v1/table-features/${param0}/ */
export async function tableFeaturesDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableFeaturesDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/table-features/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for TableFeature CRUD

Permissions: Owner/Admin/Member can manage features in their tenant PATCH /api/v1/table-features/${param0}/ */
export async function tableFeaturesPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableFeaturesPartialUpdateParams,
  body: API.PatchedTableFeature,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableFeature>(`/api/v1/table-features/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableGroup CRUD

Permissions: Owner/Admin/Member can manage table groups in their tenant GET /api/v1/table-groups/ */
export async function tableGroupsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableGroupsListParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/table-groups/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** ViewSet for TableGroup CRUD

Permissions: Owner/Admin/Member can manage table groups in their tenant POST /api/v1/table-groups/ */
export async function tableGroupsCreate(
  body: API.TableGroup,
  options?: { [key: string]: any }
) {
  return request<API.TableGroup>("/api/v1/table-groups/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableGroup CRUD

Permissions: Owner/Admin/Member can manage table groups in their tenant GET /api/v1/table-groups/${param0}/ */
export async function tableGroupsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableGroupsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableGroup>(`/api/v1/table-groups/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for TableGroup CRUD

Permissions: Owner/Admin/Member can manage table groups in their tenant PUT /api/v1/table-groups/${param0}/ */
export async function tableGroupsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableGroupsUpdateParams,
  body: API.TableGroup,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableGroup>(`/api/v1/table-groups/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableGroup CRUD

Permissions: Owner/Admin/Member can manage table groups in their tenant DELETE /api/v1/table-groups/${param0}/ */
export async function tableGroupsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableGroupsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/table-groups/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for TableGroup CRUD

Permissions: Owner/Admin/Member can manage table groups in their tenant PATCH /api/v1/table-groups/${param0}/ */
export async function tableGroupsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableGroupsPartialUpdateParams,
  body: API.PatchedTableGroup,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableGroup>(`/api/v1/table-groups/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableHold CRUD

Permissions: Owner/Admin/Member can manage holds in their tenant
Used for temporary holds (phone reservations, verbal holds) GET /api/v1/table-holds/ */
export async function tableHoldsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableHoldsListParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/table-holds/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** ViewSet for TableHold CRUD

Permissions: Owner/Admin/Member can manage holds in their tenant
Used for temporary holds (phone reservations, verbal holds) POST /api/v1/table-holds/ */
export async function tableHoldsCreate(
  body: API.TableHold,
  options?: { [key: string]: any }
) {
  return request<API.TableHold>("/api/v1/table-holds/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableHold CRUD

Permissions: Owner/Admin/Member can manage holds in their tenant
Used for temporary holds (phone reservations, verbal holds) GET /api/v1/table-holds/${param0}/ */
export async function tableHoldsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableHoldsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableHold>(`/api/v1/table-holds/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for TableHold CRUD

Permissions: Owner/Admin/Member can manage holds in their tenant
Used for temporary holds (phone reservations, verbal holds) PUT /api/v1/table-holds/${param0}/ */
export async function tableHoldsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableHoldsUpdateParams,
  body: API.TableHold,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableHold>(`/api/v1/table-holds/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableHold CRUD

Permissions: Owner/Admin/Member can manage holds in their tenant
Used for temporary holds (phone reservations, verbal holds) DELETE /api/v1/table-holds/${param0}/ */
export async function tableHoldsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableHoldsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/table-holds/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for TableHold CRUD

Permissions: Owner/Admin/Member can manage holds in their tenant
Used for temporary holds (phone reservations, verbal holds) PATCH /api/v1/table-holds/${param0}/ */
export async function tableHoldsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableHoldsPartialUpdateParams,
  body: API.PatchedTableHold,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableHold>(`/api/v1/table-holds/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableTag CRUD

Permissions: Owner/Admin/Member can manage tags in their tenant GET /api/v1/table-tags/ */
export async function tableTagsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableTagsListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedTableTagList>("/api/v1/table-tags/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** ViewSet for TableTag CRUD

Permissions: Owner/Admin/Member can manage tags in their tenant POST /api/v1/table-tags/ */
export async function tableTagsCreate(
  body: API.TableTag,
  options?: { [key: string]: any }
) {
  return request<API.TableTag>("/api/v1/table-tags/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableTag CRUD

Permissions: Owner/Admin/Member can manage tags in their tenant GET /api/v1/table-tags/${param0}/ */
export async function tableTagsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableTagsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableTag>(`/api/v1/table-tags/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for TableTag CRUD

Permissions: Owner/Admin/Member can manage tags in their tenant PUT /api/v1/table-tags/${param0}/ */
export async function tableTagsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableTagsUpdateParams,
  body: API.TableTag,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableTag>(`/api/v1/table-tags/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableTag CRUD

Permissions: Owner/Admin/Member can manage tags in their tenant DELETE /api/v1/table-tags/${param0}/ */
export async function tableTagsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableTagsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/table-tags/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for TableTag CRUD

Permissions: Owner/Admin/Member can manage tags in their tenant PATCH /api/v1/table-tags/${param0}/ */
export async function tableTagsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableTagsPartialUpdateParams,
  body: API.PatchedTableTag,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableTag>(`/api/v1/table-tags/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableZone CRUD

Permissions: Owner/Admin/Member can manage zones in their tenant GET /api/v1/table-zones/ */
export async function tableZonesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableZonesListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedTableZoneList>("/api/v1/table-zones/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** ViewSet for TableZone CRUD

Permissions: Owner/Admin/Member can manage zones in their tenant POST /api/v1/table-zones/ */
export async function tableZonesCreate(
  body: API.TableZone,
  options?: { [key: string]: any }
) {
  return request<API.TableZone>("/api/v1/table-zones/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableZone CRUD

Permissions: Owner/Admin/Member can manage zones in their tenant GET /api/v1/table-zones/${param0}/ */
export async function tableZonesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableZonesRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableZone>(`/api/v1/table-zones/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for TableZone CRUD

Permissions: Owner/Admin/Member can manage zones in their tenant PUT /api/v1/table-zones/${param0}/ */
export async function tableZonesUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableZonesUpdateParams,
  body: API.TableZone,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableZone>(`/api/v1/table-zones/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for TableZone CRUD

Permissions: Owner/Admin/Member can manage zones in their tenant DELETE /api/v1/table-zones/${param0}/ */
export async function tableZonesDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableZonesDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/table-zones/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for TableZone CRUD

Permissions: Owner/Admin/Member can manage zones in their tenant PATCH /api/v1/table-zones/${param0}/ */
export async function tableZonesPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableZonesPartialUpdateParams,
  body: API.PatchedTableZone,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableZone>(`/api/v1/table-zones/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for Table CRUD

Permissions: Owner/Admin/Member can manage tables in their tenant
Supports filtering by zone, tags, features, and availability GET /api/v1/tables/ */
export async function tablesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tablesListParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/tables/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create one or many tables in a single request. Submit either a single table object or an array of table objects. POST /api/v1/tables/ */
export async function tablesCreate(
  body: API.Table,
  options?: { [key: string]: any }
) {
  return request<API.Table>("/api/v1/tables/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for Table CRUD

Permissions: Owner/Admin/Member can manage tables in their tenant
Supports filtering by zone, tags, features, and availability GET /api/v1/tables/${param0}/ */
export async function tablesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tablesRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Table>(`/api/v1/tables/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for Table CRUD

Permissions: Owner/Admin/Member can manage tables in their tenant
Supports filtering by zone, tags, features, and availability PUT /api/v1/tables/${param0}/ */
export async function tablesUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tablesUpdateParams,
  body: API.Table,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Table>(`/api/v1/tables/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** ViewSet for Table CRUD

Permissions: Owner/Admin/Member can manage tables in their tenant
Supports filtering by zone, tags, features, and availability DELETE /api/v1/tables/${param0}/ */
export async function tablesDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tablesDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/tables/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** ViewSet for Table CRUD

Permissions: Owner/Admin/Member can manage tables in their tenant
Supports filtering by zone, tags, features, and availability PATCH /api/v1/tables/${param0}/ */
export async function tablesPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tablesPartialUpdateParams,
  body: API.PatchedTable,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Table>(`/api/v1/tables/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** GET /api/tables/{id}/current-session/
Get current session status for this table

Returns complete state including:
- Current reservation (if any active reservation exists)
- All orders for this table today
- All payments for orders from this table today
- Session summary (total orders, total revenue, outstanding balance)

This provides a complete picture of table activity for staff to understand
the customer's status at a glance. GET /api/v1/tables/${param0}/current-session/ */
export async function tablesCurrentSessionRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tablesCurrentSessionRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableCurrentSession>(
    `/api/v1/tables/${param0}/current-session/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** GET /api/tables/{id}/real-time-status/
Provide real-time context for a table including queue, reservation, order, and payment data. GET /api/v1/tables/${param0}/real-time-status/ */
export async function tablesRealTimeStatusRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tablesRealTimeStatusRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableRealTimeStatus>(
    `/api/v1/tables/${param0}/real-time-status/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Atomically transition a table's manual state using the centralized state machine. POST /api/v1/tables/${param0}/transition-state/ */
export async function tablesTransitionStateCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tablesTransitionStateCreateParams,
  body: API.TableStateTransition,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Table>(`/api/v1/tables/${param0}/transition-state/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Create multiple tables atomically. Accepts a non-empty JSON array where each element matches the single table create payload. POST /api/v1/tables/batch-create/ */
export async function tablesBatchCreateCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tablesBatchCreateCreateParams,
  body: API.Table[],
  options?: { [key: string]: any }
) {
  return request<API.PaginatedTableList>("/api/v1/tables/batch-create/", {
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

/** Deactivate or hard delete multiple tables. By default tables are soft-deleted by toggling is_active to False. Pass hard_delete=true to attempt permanent deletion. DELETE /api/v1/tables/batch-delete/ */
export async function tablesBatchDeleteDestroy(options?: {
  [key: string]: any;
}) {
  return request<API.TableBatchDeleteResponse>("/api/v1/tables/batch-delete/", {
    method: "DELETE",
    ...(options || {}),
  });
}

/** Patch multiple tables atomically. Each payload item must include the table id and the fields to update. All updates must belong to the active tenant. PATCH /api/v1/tables/batch-update/ */
export async function tablesBatchUpdatePartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tablesBatchUpdatePartialUpdateParams,
  body: API.Table[],
  options?: { [key: string]: any }
) {
  return request<API.PaginatedTableList>("/api/v1/tables/batch-update/", {
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
