// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** Aggregated financial and operational reports for a tenant. GET /api/v1/reports/cash-flow/ */
export async function reportsCashFlowRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reportsCashFlowRetrieveParams,
  options?: { [key: string]: any }
) {
  return request<API.CashFlowReport>("/api/v1/reports/cash-flow/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Aggregated financial and operational reports for a tenant. GET /api/v1/reports/daily-sales/ */
export async function reportsDailySalesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reportsDailySalesRetrieveParams,
  options?: { [key: string]: any }
) {
  return request<API.DailySalesReport>("/api/v1/reports/daily-sales/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Aggregated financial and operational reports for a tenant. GET /api/v1/reports/expense/ */
export async function reportsExpenseRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reportsExpenseRetrieveParams,
  options?: { [key: string]: any }
) {
  return request<API.ExpenseSummary>("/api/v1/reports/expense/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Aggregated financial and operational reports for a tenant. GET /api/v1/reports/export/daily-sales/ */
export async function reportsExportDailySalesRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reportsExportDailySalesRetrieveParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/reports/export/daily-sales/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Aggregated financial and operational reports for a tenant. GET /api/v1/reports/export/revenue/ */
export async function reportsExportRevenueRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reportsExportRevenueRetrieveParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api/v1/reports/export/revenue/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Aggregated financial and operational reports for a tenant. GET /api/v1/reports/profit/ */
export async function reportsProfitRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reportsProfitRetrieveParams,
  options?: { [key: string]: any }
) {
  return request<API.ProfitReport>("/api/v1/reports/profit/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Aggregated financial and operational reports for a tenant. GET /api/v1/reports/revenue/ */
export async function reportsRevenueRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reportsRevenueRetrieveParams,
  options?: { [key: string]: any }
) {
  return request<API.RevenueReport>("/api/v1/reports/revenue/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Aggregated financial and operational reports for a tenant. GET /api/v1/reports/staff-performance/ */
export async function reportsStaffPerformanceRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reportsStaffPerformanceRetrieveParams,
  options?: { [key: string]: any }
) {
  return request<API.StaffPerformanceReport>(
    "/api/v1/reports/staff-performance/",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Aggregated financial and operational reports for a tenant. GET /api/v1/reports/top-items/ */
export async function reportsTopItemsRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reportsTopItemsRetrieveParams,
  options?: { [key: string]: any }
) {
  return request<API.TopItemsReport>("/api/v1/reports/top-items/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
