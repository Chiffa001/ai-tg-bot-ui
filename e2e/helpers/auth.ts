import type { BrowserContext } from "@playwright/test";

export const setAuthCookies = async (context: BrowserContext) => {
  await context.addCookies([
    {
      name: "mock_access_token",
      value: "mock-access-credentials-login-token",
      domain: "localhost",
      path: "/",
    },
    {
      name: "mock_refresh_token",
      value: "mock-refresh-credentials-login-token",
      domain: "localhost",
      path: "/",
    },
  ]);
};

export const setBotTokenCookie = async (context: BrowserContext) => {
  await context.addCookies([
    {
      name: "onboarding_bot_token_completed",
      value: "true",
      domain: "localhost",
      path: "/",
    },
  ]);
};
