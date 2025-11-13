// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** OpenApi3 schema for this API. Format can be selected via content negotiation.

- YAML: application/vnd.oai.openapi
- JSON: application/vnd.oai.openapi+json GET /api/v1/schema.json */
export async function schemaJsonRetrieve(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.schemaJsonRetrieveParams,
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/api/v1/schema.json", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
