import type { Request } from "express";

export function isSecureRequest(req: Request): boolean {
  if ((req as any).protocol === "https") return true;

  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;

  const protoList = Array.isArray(forwardedProto) ? forwardedProto : String(forwardedProto).split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}

export function getSessionCookieOptions(req: Request) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none" as const,
    secure: isSecureRequest(req),
  };
}
