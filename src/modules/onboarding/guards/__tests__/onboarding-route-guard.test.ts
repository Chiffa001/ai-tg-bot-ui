import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE } from "@/modules/onboarding/constants/onboarding-cookies";
import {
  getSkippedOnboardingStepPath,
  getSkippedOnboardingStepPathForPath,
} from "@/modules/onboarding/guards/onboarding-route-guard";

const createRequest = (pathname: string, cookies: Record<string, string> = {}) => {
  const request = new NextRequest(`http://localhost:3000${pathname}`);

  Object.entries(cookies).forEach(([name, value]) => {
    request.cookies.set(name, value);
  });

  return request;
};

describe("onboarding route guard", () => {
  it("не требует fallback для первого шага", () => {
    const request = createRequest("/ru/onboarding/bot");

    expect(getSkippedOnboardingStepPath(request)).toBeUndefined();
  });

  it("возвращает первый шаг, если business открыт без завершенного bot token", () => {
    const request = createRequest("/ru/onboarding/business");

    expect(getSkippedOnboardingStepPath(request)).toBe("/onboarding/bot");
  });

  it("разрешает business, если bot token step завершен", () => {
    const request = createRequest("/ru/onboarding/business", {
      [ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE]: "true",
    });

    expect(getSkippedOnboardingStepPath(request)).toBeUndefined();
  });

  it("проверяет nested business routes по prefix", () => {
    const request = createRequest("/ru/onboarding/business/details");

    expect(getSkippedOnboardingStepPath(request)).toBe("/onboarding/bot");
  });

  it("проверяет произвольный next path без изменения текущего request path", () => {
    const request = createRequest("/auth/login");

    expect(
      getSkippedOnboardingStepPathForPath(request, "/onboarding/business"),
    ).toBe("/onboarding/bot");
  });

  it("разрешает произвольный next path, если prerequisite cookie есть", () => {
    const request = createRequest("/auth/login", {
      [ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE]: "true",
    });

    expect(
      getSkippedOnboardingStepPathForPath(request, "/onboarding/business"),
    ).toBeUndefined();
  });
});
