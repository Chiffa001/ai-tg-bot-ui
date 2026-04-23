import { afterEach, describe, expect, it, vi } from "vitest";
import { ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE } from "@/modules/onboarding/constants/onboarding-cookies";

const mockSet = vi.fn();
const mockDelete = vi.fn();

vi.mock("next/headers", () => ({
  cookies: vi.fn(() =>
    Promise.resolve({
      set: mockSet,
      delete: mockDelete,
    }),
  ),
}));

const { markBotTokenStepCompleted, clearBotTokenStepCompleted } = await import(
  "@/modules/onboarding/actions/onboarding-progress-actions"
);

describe("onboarding progress actions", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("записывает cookie завершения шага bot token", async () => {
    await markBotTokenStepCompleted();

    expect(mockSet).toHaveBeenCalledWith(
      ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE,
      "true",
      { path: "/", maxAge: 2592000, sameSite: "lax", httpOnly: true },
    );
  });

  it("очищает cookie завершения шага bot token", async () => {
    await clearBotTokenStepCompleted();

    expect(mockDelete).toHaveBeenCalledWith(
      ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE,
    );
  });
});
