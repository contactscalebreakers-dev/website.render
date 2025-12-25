import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
import type { Request } from "express";

import { AXIOS_TIMEOUT_MS, COOKIE_NAME, ONE_YEAR_MS } from "../../shared/const";
import { ForbiddenError } from "../../shared/_core/errors";
import { ENV } from "./env";
import { getUser, upsertUser } from "../db";

const isNonEmptyString = (value: unknown): value is string => typeof value === "string" && value.length > 0;

const EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
const GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
const GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;

type ExchangeTokenResponse = { accessToken: string; [k: string]: any };
type UserInfoResponse = { openId?: string; name?: string; email?: string; platform?: string; platforms?: unknown[]; [k: string]: any };

class OAuthService {
  constructor(private client: ReturnType<typeof axios.create>) {
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error("[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable.");
    }
  }

  decodeState(state: string) {
    // state is base64-encoded redirectUri
    // NOTE: Node 18+ provides atob()
    return atob(state);
  }

  async getTokenByCode(code: string, state: string): Promise<ExchangeTokenResponse> {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state),
    };
    const { data } = await this.client.post(EXCHANGE_TOKEN_PATH, payload);
    return data;
  }

  async getUserInfoByToken(token: ExchangeTokenResponse): Promise<UserInfoResponse> {
    const { data } = await this.client.post(GET_USER_INFO_PATH, { accessToken: token.accessToken });
    return data;
  }
}

const createOAuthHttpClient = () =>
  axios.create({
    baseURL: ENV.oAuthServerUrl,
    timeout: AXIOS_TIMEOUT_MS,
  });

export class SDKServer {
  private oauthService: OAuthService;

  constructor(private client = createOAuthHttpClient()) {
    this.oauthService = new OAuthService(this.client);
  }

  private deriveLoginMethod(platforms: unknown, fallback: string | null) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;

    const set = new Set(platforms.filter((p) => typeof p === "string") as string[]);
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE")) return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";

    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }

  async exchangeCodeForToken(code: string, state: string) {
    return this.oauthService.getTokenByCode(code, state);
  }

  async getUserInfo(accessToken: string) {
    const data = await this.oauthService.getUserInfoByToken({ accessToken } as any);
    const loginMethod = this.deriveLoginMethod((data as any)?.platforms, (data as any)?.platform ?? null);
    return { ...data, platform: loginMethod, loginMethod };
  }

  private parseCookies(cookieHeader: string | undefined) {
    if (!cookieHeader) return new Map<string, string>();
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }

  private getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }

  async createSessionToken(userId: string, options: { name?: string; expiresInMs?: number } = {}) {
    return this.signSession({ openId: userId, appId: ENV.appId, name: options.name || "" }, options);
  }

  private async signSession(
    payload: { openId: string; appId: string; name: string },
    options: { expiresInMs?: number } = {},
  ) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1000);
    const secretKey = this.getSessionSecret();

    return new SignJWT({ openId: payload.openId, appId: payload.appId, name: payload.name })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(expirationSeconds)
      .sign(secretKey);
  }

  private async verifySession(cookieValue: string | undefined | null) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, { algorithms: ["HS256"] });

      const { openId, appId, name } = payload as any;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }

      return { openId, appId, name };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }

  async getUserInfoWithJwt(jwtToken: string) {
    const payload = { jwtToken, projectId: ENV.appId };
    const { data } = await this.client.post(GET_USER_INFO_WITH_JWT_PATH, payload);

    const loginMethod = this.deriveLoginMethod((data as any)?.platforms, (data as any)?.platform ?? null);
    return { ...data, platform: loginMethod, loginMethod };
  }

  async authenticateRequest(req: Request) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);

    if (!session) throw ForbiddenError("Invalid session cookie");

    const sessionUserId = session.openId;
    const signedInAt = new Date();

    let user = await getUser(sessionUserId);

    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        if (!(userInfo as any).openId) {
          throw new Error("openId missing from user info");
        }
        await upsertUser({
          id: (userInfo as any).openId,
          name: (userInfo as any).name || null,
          email: (userInfo as any).email ?? null,
          loginMethod: (userInfo as any).loginMethod ?? (userInfo as any).platform ?? null,
          lastSignedIn: signedInAt,
        } as any);
        user = await getUser((userInfo as any).openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }

    if (!user) throw ForbiddenError("User not found");

    await upsertUser({ id: user.id, lastSignedIn: signedInAt } as any);
    return user;
  }
}

export const sdk = new SDKServer();
