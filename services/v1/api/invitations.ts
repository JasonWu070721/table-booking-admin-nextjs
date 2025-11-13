// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** Standalone view for accepting invitations without tenant_pk
POST /api/invitations/accept/
Body: { "token": "<uuid>" } POST /api/v1/invitations/accept/ */
export async function invitationsAcceptCreate(
  body: API.TenantInvitationAccept,
  options?: { [key: string]: any }
) {
  return request<{
    tenant?: string;
    role?: string;
    user?: number;
    status?: string;
  }>("/api/v1/invitations/accept/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Standalone view for resending invitations without tenant_pk
POST /api/invitations/resend/
Body: { "tenant_uuid": "<uuid>", "invitation_id": <int> } POST /api/v1/invitations/resend/ */
export async function invitationsResendCreate(
  body: API.TenantInvitationResend,
  options?: { [key: string]: any }
) {
  return request<API.TenantInvitationCreate>("/api/v1/invitations/resend/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
