// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** Retrieve or update the tenant's closure configuration, including recurring
closed weekdays and specific closure periods. GET /api/v1/settings/closures/ */
export async function settingsClosuresRetrieve(options?: {
  [key: string]: any;
}) {
  return request<API.TenantClosureSettings>("/api/v1/settings/closures/", {
    method: "GET",
    ...(options || {}),
  });
}

/** Retrieve or update the tenant's closure configuration, including recurring
closed weekdays and specific closure periods. PUT /api/v1/settings/closures/ */
export async function settingsClosuresUpdate(
  body: API.TenantClosureSettings,
  options?: { [key: string]: any }
) {
  return request<API.TenantClosureSettings>("/api/v1/settings/closures/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Retrieve or update the tenant's closure configuration, including recurring
closed weekdays and specific closure periods. PATCH /api/v1/settings/closures/ */
export async function settingsClosuresPartialUpdate(
  body: API.PatchedTenantClosureSettings,
  options?: { [key: string]: any }
) {
  return request<API.TenantClosureSettings>("/api/v1/settings/closures/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Retrieve or update the tenant's general settings (language & timezone). GET /api/v1/settings/general/ */
export async function settingsGeneralRetrieve(options?: {
  [key: string]: any;
}) {
  return request<API.TenantGeneralSettings>("/api/v1/settings/general/", {
    method: "GET",
    ...(options || {}),
  });
}

/** Retrieve or update the tenant's general settings (language & timezone). PUT /api/v1/settings/general/ */
export async function settingsGeneralUpdate(
  body: API.TenantGeneralSettings,
  options?: { [key: string]: any }
) {
  return request<API.TenantGeneralSettings>("/api/v1/settings/general/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Retrieve or update the tenant's general settings (language & timezone). PATCH /api/v1/settings/general/ */
export async function settingsGeneralPartialUpdate(
  body: API.PatchedTenantGeneralSettings,
  options?: { [key: string]: any }
) {
  return request<API.TenantGeneralSettings>("/api/v1/settings/general/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Retrieve or update the tenant's reservation configuration settings. GET /api/v1/settings/reservations/ */
export async function settingsReservationsRetrieve(options?: {
  [key: string]: any;
}) {
  return request<API.TenantReservationSettings>(
    "/api/v1/settings/reservations/",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Retrieve or update the tenant's reservation configuration settings. PUT /api/v1/settings/reservations/ */
export async function settingsReservationsUpdate(
  body: API.TenantReservationSettings,
  options?: { [key: string]: any }
) {
  return request<API.TenantReservationSettings>(
    "/api/v1/settings/reservations/",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** Retrieve or update the tenant's reservation configuration settings. PATCH /api/v1/settings/reservations/ */
export async function settingsReservationsPartialUpdate(
  body: API.PatchedTenantReservationSettings,
  options?: { [key: string]: any }
) {
  return request<API.TenantReservationSettings>(
    "/api/v1/settings/reservations/",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}
