import type { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const adminAllowlistRaw = process.env.ADMIN_EMAIL_ALLOWLIST || "";
const adminAllowlist = new Set(
  adminAllowlistRaw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
);

const supabaseAdmin =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    : null;

function getBearerToken(req: Request) {
  const auth = req.headers.authorization || "";
  if (typeof auth !== "string") return null;
  if (!auth.startsWith("Bearer ")) return null;
  return auth.slice(7);
}

export async function createContext(opts: { req: Request; res: Response }) {
  const token = getBearerToken(opts.req);

  let user: any = null;

  if (token && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin.auth.getUser(token);
      if (!error && data?.user) {
        const email = (data.user.email || "").toLowerCase();
        const isAdmin = adminAllowlist.size === 0 ? false : adminAllowlist.has(email);
        user = {
          id: data.user.id,
          email: data.user.email,
          role: isAdmin ? "admin" : "user",
        };
      }
    } catch {
      user = null;
    }
  }

  return { req: opts.req, res: opts.res, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
