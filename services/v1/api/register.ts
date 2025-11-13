// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** Register an account with only the 'user' role
(does not automatically join any tenant) POST /api/v1/register/ */
export async function registerCreate(
  body: API.Register,
  options?: { [key: string]: any }
) {
  return request<API.Register>("/api/v1/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
