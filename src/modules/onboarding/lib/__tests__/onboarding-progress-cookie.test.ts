import { afterEach, describe, expect, it, vi } from "vitest";
import { ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE } from "@/modules/onboarding/constants/onboarding-cookies";
import {
  clearBotTokenStepCompleted,
  markBotTokenStepCompleted,
} from "@/modules/onboarding/lib/onboarding-progress-cookie";

describe("onboarding progress cookie helpers", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("записывает cookie завершения шага bot token", () => {
    vi.stubGlobal("document", {
      cookie: "",
    });

    markBotTokenStepCompleted();

    expect(document.cookie).toBe(
      `${ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE}=true; Path=/; Max-Age=2592000; SameSite=Lax`,
    );
  });

  it("очищает cookie завершения шага bot token", () => {
    vi.stubGlobal("document", {
      cookie: `${ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE}=true`,
    });

    clearBotTokenStepCompleted();

    expect(document.cookie).toBe(
      `${ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`,
    );
  });
});
