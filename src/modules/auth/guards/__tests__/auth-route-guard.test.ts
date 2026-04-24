import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/modules/auth/constants/auth-cookies";
import { guardAuthRoutes } from "@/modules/auth/guards/auth-route-guard";
import { ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE } from "@/modules/onboarding/constants/onboarding-cookies";

type CreateRequestOptions = {
  cookies?: Record<string, string>;
  headers?: HeadersInit;
};

const createRequest = (path: string, options: CreateRequestOptions = {}) => {
  const request = new NextRequest(`http://localhost:3000${path}`, {
    headers: options.headers,
  });

  Object.entries(options.cookies ?? {}).forEach(([name, value]) => {
    request.cookies.set(name, value);
  });

  return request;
};

const authCookies = {
  [ACCESS_TOKEN_COOKIE]: "access-token",
  [REFRESH_TOKEN_COOKIE]: "refresh-token",
};

const getRedirectLocation = (response: Response) => {
  return response.headers.get("location");
};

describe("auth route guard", () => {
  it("редиректит protected onboarding route на login без токенов", () => {
    const response = guardAuthRoutes(createRequest("/ru/onboarding/business"), "ru");

    expect(response).not.toBeNull();
    expect(response!.status).toBe(307);
    expect(getRedirectLocation(response!)).toBe(
      "http://localhost:3000/ru/auth/login?next=%2Fonboarding%2Fbusiness",
    );
  });

  it("сохраняет query string в next при protected redirect", () => {
    const response = guardAuthRoutes(
      createRequest("/ru/onboarding/business?foo=bar"),
      "ru",
    );

    expect(getRedirectLocation(response!)).toBe(
      "http://localhost:3000/ru/auth/login?next=%2Fonboarding%2Fbusiness%3Ffoo%3Dbar",
    );
  });

  it("разрешает первый onboarding step при наличии токенов", () => {
    const response = guardAuthRoutes(
      createRequest("/ru/onboarding/bot", { cookies: authCookies }),
      "ru",
    );

    expect(response).toBeNull();
  });

  it("разрешает первый onboarding step при наличии auth headers", () => {
    const response = guardAuthRoutes(
      createRequest("/ru/onboarding/bot", {
        headers: {
          authorization: "Bearer access-token",
          "x-refresh-token": "refresh-token",
        },
      }),
      "ru",
    );

    expect(response).toBeNull();
  });

  it("возвращает на первый onboarding step, если business открыт без prerequisite", () => {
    const response = guardAuthRoutes(
      createRequest("/ru/onboarding/business", { cookies: authCookies }),
      "ru",
    );

    expect(response).not.toBeNull();
    expect(response!.status).toBe(307);
    expect(getRedirectLocation(response!)).toBe(
      "http://localhost:3000/ru/onboarding/bot",
    );
  });

  it("разрешает business при наличии токенов и prerequisite cookie", () => {
    const response = guardAuthRoutes(
      createRequest("/ru/onboarding/business", {
        cookies: {
          ...authCookies,
          [ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE]: "true",
        },
      }),
      "ru",
    );

    expect(response).toBeNull();
  });

  it("редиректит auth routes на onboarding bot при наличии токенов", () => {
    const response = guardAuthRoutes(
      createRequest("/ru/auth/login", { cookies: authCookies }),
      "ru",
    );

    expect(response).not.toBeNull();
    expect(response!.status).toBe(307);
    expect(getRedirectLocation(response!)).toBe(
      "http://localhost:3000/ru/onboarding/bot",
    );
  });

  it("редиректит auth routes на safe next path при наличии prerequisite", () => {
    const response = guardAuthRoutes(
      createRequest("/ru/auth/login?next=/onboarding/business", {
        cookies: {
          ...authCookies,
          [ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE]: "true",
        },
      }),
      "ru",
    );

    expect(response).not.toBeNull();
    expect(response!.status).toBe(307);
    expect(getRedirectLocation(response!)).toBe(
      "http://localhost:3000/ru/onboarding/business",
    );
  });

  it("редиректит auth routes на первый пропущенный шаг, если next path недоступен", () => {
    const response = guardAuthRoutes(
      createRequest("/ru/auth/login?next=/onboarding/business", {
        cookies: authCookies,
      }),
      "ru",
    );

    expect(response).not.toBeNull();
    expect(response!.status).toBe(307);
    expect(getRedirectLocation(response!)).toBe(
      "http://localhost:3000/ru/onboarding/bot",
    );
  });

  it("игнорирует unsafe next path на auth route", () => {
    const response = guardAuthRoutes(
      createRequest("/ru/auth/login?next=https://example.com", {
        cookies: authCookies,
      }),
      "ru",
    );

    expect(response).not.toBeNull();
    expect(response!.status).toBe(307);
    expect(getRedirectLocation(response!)).toBe(
      "http://localhost:3000/ru/onboarding/bot",
    );
  });

  it("игнорирует protocol-relative next path на auth route", () => {
    const response = guardAuthRoutes(
      createRequest("/ru/auth/login?next=//evil.com", {
        cookies: authCookies,
      }),
      "ru",
    );

    expect(response).not.toBeNull();
    expect(response!.status).toBe(307);
    expect(getRedirectLocation(response!)).toBe(
      "http://localhost:3000/ru/onboarding/bot",
    );
  });
});
