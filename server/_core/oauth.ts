import type { Express, Request } from "express";
import { sdk } from "./sdk";
import { upsertUser } from "../db";
import { COOKIE_NAME, ONE_YEAR_MS } from "../../shared/const";
import { getSessionCookieOptions } from "./cookies";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = (req.query as any)[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

      if (!(userInfo as any).openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      await upsertUser({
        id: (userInfo as any).openId,
        name: (userInfo as any).name || null,
        email: (userInfo as any).email ?? null,
        loginMethod: (userInfo as any).loginMethod ?? (userInfo as any).platform ?? null,
        lastSignedIn: new Date(),
      } as any);

      const sessionToken = await sdk.createSessionToken((userInfo as any).openId, {
        name: (userInfo as any).name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}
