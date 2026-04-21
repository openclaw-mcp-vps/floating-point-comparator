import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ACCESS_COOKIE_NAME = "fpsafe_access";

export interface AccessPayload {
  sessionId: string;
  email?: string;
  grantedAt: string;
  plan: "pro";
}

function getSigningSecret(): string {
  return process.env.STRIPE_WEBHOOK_SECRET || "dev-only-local-secret";
}

function encodeBase64Url(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function decodeBase64Url(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

export function signAccessPayload(payload: AccessPayload): string {
  const data = encodeBase64Url(JSON.stringify(payload));
  const signature = crypto
    .createHmac("sha256", getSigningSecret())
    .update(data)
    .digest("base64url");

  return `${data}.${signature}`;
}

export function verifyAccessToken(token: string): AccessPayload | null {
  const [data, signature] = token.split(".");
  if (!data || !signature) {
    return null;
  }

  const expected = crypto
    .createHmac("sha256", getSigningSecret())
    .update(data)
    .digest("base64url");

  if (signature.length !== expected.length) {
    return null;
  }

  const valid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!valid) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeBase64Url(data)) as AccessPayload;
    if (!parsed.sessionId || !parsed.grantedAt || parsed.plan !== "pro") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function getAccessPayloadFromCookie(): Promise<AccessPayload | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(ACCESS_COOKIE_NAME)?.value;
  if (!value) {
    return null;
  }

  return verifyAccessToken(value);
}

export async function hasPaidAccess(): Promise<boolean> {
  const payload = await getAccessPayloadFromCookie();
  return payload !== null;
}

export const accessCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30
};
