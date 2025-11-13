// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 此处后端没有提供注释 GET /api/v1/labor/break-types/ */
export async function laborBreakTypesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborBreakTypesListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedBreakTypeList>("/api/v1/labor/break-types/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/labor/break-types/ */
export async function laborBreakTypesCreate(
  body: API.BreakType,
  options?: { [key: string]: any }
) {
  return request<API.BreakType>("/api/v1/labor/break-types/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/labor/break-types/${param0}/ */
export async function laborBreakTypesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborBreakTypesRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BreakType>(`/api/v1/labor/break-types/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/labor/break-types/${param0}/ */
export async function laborBreakTypesUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborBreakTypesUpdateParams,
  body: API.BreakType,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BreakType>(`/api/v1/labor/break-types/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/v1/labor/break-types/${param0}/ */
export async function laborBreakTypesDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborBreakTypesDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/labor/break-types/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/v1/labor/break-types/${param0}/ */
export async function laborBreakTypesPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborBreakTypesPartialUpdateParams,
  body: API.PatchedBreakType,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BreakType>(`/api/v1/labor/break-types/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/labor/employees/ */
export async function laborEmployeesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborEmployeesListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedEmployeeList>("/api/v1/labor/employees/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/labor/employees/ */
export async function laborEmployeesCreate(
  body: API.Employee,
  options?: { [key: string]: any }
) {
  return request<API.Employee>("/api/v1/labor/employees/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/labor/employees/${param0}/ */
export async function laborEmployeesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborEmployeesRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Employee>(`/api/v1/labor/employees/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/labor/employees/${param0}/ */
export async function laborEmployeesUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborEmployeesUpdateParams,
  body: API.Employee,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Employee>(`/api/v1/labor/employees/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/v1/labor/employees/${param0}/ */
export async function laborEmployeesDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborEmployeesDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/labor/employees/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/v1/labor/employees/${param0}/ */
export async function laborEmployeesPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborEmployeesPartialUpdateParams,
  body: API.PatchedEmployee,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Employee>(`/api/v1/labor/employees/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/labor/employees/${param0}/archive/ */
export async function laborEmployeesArchiveUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborEmployeesArchiveUpdateParams,
  body: API.Employee,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Employee>(`/api/v1/labor/employees/${param0}/archive/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/labor/employees/${param0}/jobs/ */
export async function laborEmployeesJobsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborEmployeesJobsUpdateParams,
  body: API.Employee,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Employee>(`/api/v1/labor/employees/${param0}/jobs/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/labor/employees/${param0}/performance/ */
export async function laborEmployeesPerformanceRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborEmployeesPerformanceRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Employee>(
    `/api/v1/labor/employees/${param0}/performance/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /api/v1/labor/employees/${param0}/shifts/ */
export async function laborEmployeesShiftsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborEmployeesShiftsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Employee>(`/api/v1/labor/employees/${param0}/shifts/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/labor/employees/${param0}/time-entries/ */
export async function laborEmployeesTimeEntriesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborEmployeesTimeEntriesRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Employee>(
    `/api/v1/labor/employees/${param0}/time-entries/`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 PUT /api/v1/labor/employees/${param0}/unarchive/ */
export async function laborEmployeesUnarchiveUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborEmployeesUnarchiveUpdateParams,
  body: API.Employee,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Employee>(`/api/v1/labor/employees/${param0}/unarchive/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/labor/employees/${param0}/wage-overrides/ */
export async function laborEmployeesWageOverridesUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborEmployeesWageOverridesUpdateParams,
  body: API.Employee,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Employee>(
    `/api/v1/labor/employees/${param0}/wage-overrides/`,
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

/** 此处后端没有提供注释 GET /api/v1/labor/jobs/ */
export async function laborJobsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborJobsListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedJobList>("/api/v1/labor/jobs/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/labor/jobs/ */
export async function laborJobsCreate(
  body: API.Job,
  options?: { [key: string]: any }
) {
  return request<API.Job>("/api/v1/labor/jobs/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/labor/jobs/${param0}/ */
export async function laborJobsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborJobsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Job>(`/api/v1/labor/jobs/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/labor/jobs/${param0}/ */
export async function laborJobsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborJobsUpdateParams,
  body: API.Job,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Job>(`/api/v1/labor/jobs/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/v1/labor/jobs/${param0}/ */
export async function laborJobsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborJobsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/labor/jobs/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/v1/labor/jobs/${param0}/ */
export async function laborJobsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborJobsPartialUpdateParams,
  body: API.PatchedJob,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Job>(`/api/v1/labor/jobs/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/labor/shifts/ */
export async function laborShiftsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborShiftsListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedShiftList>("/api/v1/labor/shifts/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/labor/shifts/ */
export async function laborShiftsCreate(
  body: API.Shift,
  options?: { [key: string]: any }
) {
  return request<API.Shift>("/api/v1/labor/shifts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/labor/shifts/${param0}/ */
export async function laborShiftsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborShiftsRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Shift>(`/api/v1/labor/shifts/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/labor/shifts/${param0}/ */
export async function laborShiftsUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborShiftsUpdateParams,
  body: API.Shift,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Shift>(`/api/v1/labor/shifts/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/v1/labor/shifts/${param0}/ */
export async function laborShiftsDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborShiftsDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/labor/shifts/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/v1/labor/shifts/${param0}/ */
export async function laborShiftsPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborShiftsPartialUpdateParams,
  body: API.PatchedShift,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Shift>(`/api/v1/labor/shifts/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/labor/shifts/${param0}/cancel/ */
export async function laborShiftsCancelCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborShiftsCancelCreateParams,
  body: API.Shift,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Shift>(`/api/v1/labor/shifts/${param0}/cancel/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/labor/shifts/${param0}/end/ */
export async function laborShiftsEndCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborShiftsEndCreateParams,
  body: API.Shift,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Shift>(`/api/v1/labor/shifts/${param0}/end/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/labor/shifts/${param0}/start/ */
export async function laborShiftsStartCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborShiftsStartCreateParams,
  body: API.Shift,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Shift>(`/api/v1/labor/shifts/${param0}/start/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/labor/time-entries/ */
export async function laborTimeEntriesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborTimeEntriesListParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginatedTimeEntryList>("/api/v1/labor/time-entries/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/labor/time-entries/ */
export async function laborTimeEntriesCreate(
  body: API.TimeEntry,
  options?: { [key: string]: any }
) {
  return request<API.TimeEntry>("/api/v1/labor/time-entries/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/labor/time-entries/${param0}/ */
export async function laborTimeEntriesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborTimeEntriesRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TimeEntry>(`/api/v1/labor/time-entries/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/labor/time-entries/${param0}/ */
export async function laborTimeEntriesUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborTimeEntriesUpdateParams,
  body: API.TimeEntry,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TimeEntry>(`/api/v1/labor/time-entries/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/v1/labor/time-entries/${param0}/ */
export async function laborTimeEntriesDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborTimeEntriesDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/labor/time-entries/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/v1/labor/time-entries/${param0}/ */
export async function laborTimeEntriesPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborTimeEntriesPartialUpdateParams,
  body: API.PatchedTimeEntry,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TimeEntry>(`/api/v1/labor/time-entries/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/labor/time-entries/${param0}/approve/ */
export async function laborTimeEntriesApproveCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laborTimeEntriesApproveCreateParams,
  body: API.TimeEntry,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TimeEntry>(
    `/api/v1/labor/time-entries/${param0}/approve/`,
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

/** 此处后端没有提供注释 POST /api/v1/labor/time-entries/clock-in/ */
export async function laborTimeEntriesClockInCreate(
  body: API.TimeEntry,
  options?: { [key: string]: any }
) {
  return request<API.TimeEntry>("/api/v1/labor/time-entries/clock-in/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/labor/time-entries/clock-out/ */
export async function laborTimeEntriesClockOutCreate(
  body: API.TimeEntry,
  options?: { [key: string]: any }
) {
  return request<API.TimeEntry>("/api/v1/labor/time-entries/clock-out/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
