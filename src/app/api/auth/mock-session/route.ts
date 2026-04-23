import { NextResponse } from "next/server";
import type { AuthMode } from "@/modules/auth/constants/auth-form-modes";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/modules/auth/constants/auth-cookies";
import { ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE } from "@/modules/onboarding/constants/onboarding-cookies";

type MockSessionRequestBody = {
  mode?: AuthMode;
  provider?: "credentials" | "telegram" | "google";
};

const buildToken = (type: "access" | "refresh", provider: string, mode: string) => {
  return `mock-${type}-${provider}-${mode}-token`;
};

export const POST = async (request: Request) => {
  const body = (await request.json().catch(() => ({}))) as MockSessionRequestBody;
  const mode = body.mode === "register" ? "register" : "login";
  const provider = body.provider ?? "credentials";

  const response = NextResponse.json({
    ok: true,
    accessToken: buildToken("access", provider, mode),
    refreshToken: buildToken("refresh", provider, mode),
  });

  response.cookies.set({
    name: ACCESS_TOKEN_COOKIE,
    value: buildToken("access", provider, mode),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
  });

  response.cookies.set({
    name: REFRESH_TOKEN_COOKIE,
    value: buildToken("refresh", provider, mode),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });

  response.cookies.delete(ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE);

  return response;
};
