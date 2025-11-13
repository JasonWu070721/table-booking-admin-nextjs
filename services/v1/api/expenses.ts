// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** CRUD endpoints for tenant expenses used in financial reporting.
Only Owners and Admins can manage these records. GET /api/v1/expenses/ */
export async function expensesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.expensesListParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/expenses/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** CRUD endpoints for tenant expenses used in financial reporting.
Only Owners and Admins can manage these records. POST /api/v1/expenses/ */
export async function expensesCreate(
  body: API.ExpenseWrite,
  options?: { [key: string]: any }
) {
  return request<API.Expense>("/api/v1/expenses/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** CRUD endpoints for tenant expenses used in financial reporting.
Only Owners and Admins can manage these records. GET /api/v1/expenses/${param0}/ */
export async function expensesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.expensesRetrieveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Expense>(`/api/v1/expenses/${param0}/`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** CRUD endpoints for tenant expenses used in financial reporting.
Only Owners and Admins can manage these records. PUT /api/v1/expenses/${param0}/ */
export async function expensesUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.expensesUpdateParams,
  body: API.ExpenseWrite,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Expense>(`/api/v1/expenses/${param0}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** CRUD endpoints for tenant expenses used in financial reporting.
Only Owners and Admins can manage these records. DELETE /api/v1/expenses/${param0}/ */
export async function expensesDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.expensesDestroyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/expenses/${param0}/`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** CRUD endpoints for tenant expenses used in financial reporting.
Only Owners and Admins can manage these records. PATCH /api/v1/expenses/${param0}/ */
export async function expensesPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.expensesPartialUpdateParams,
  body: API.PatchedExpenseWrite,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Expense>(`/api/v1/expenses/${param0}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
