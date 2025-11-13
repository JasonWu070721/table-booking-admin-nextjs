// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 此处后端没有提供注释 POST /api/v1/add-buys/available/ */
export async function addBuysAvailableCreate(
  body: API.AddBuyAvailabilityRequest,
  options?: { [key: string]: any }
) {
  return request<API.AddBuyAvailabilityResponse>(
    "/api/v1/add-buys/available/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 POST /api/v1/add-buys/preview/ */
export async function addBuysPreviewCreate(
  body: API.AddBuyPreviewRequest,
  options?: { [key: string]: any }
) {
  return request<API.AddBuyPreviewResponse>("/api/v1/add-buys/preview/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
