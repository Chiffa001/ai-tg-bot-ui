import { describe, expect, it } from "vitest";
import { getActiveOnboardingStepIndex } from "@/modules/onboarding/lib/onboarding-step-helpers";

describe("onboarding step helpers", () => {
  it("returns first step index for the bot step path", () => {
    expect(getActiveOnboardingStepIndex("/onboarding/bot")).toBe(0);
  });

  it("returns matching step index for exact onboarding paths", () => {
    expect(getActiveOnboardingStepIndex("/onboarding/business")).toBe(1);
    expect(getActiveOnboardingStepIndex("/onboarding/ai")).toBe(2);
    expect(getActiveOnboardingStepIndex("/onboarding/test")).toBe(3);
  });

  it("returns matching step index for nested onboarding paths", () => {
    expect(getActiveOnboardingStepIndex("/onboarding/business/details")).toBe(1);
  });

  it("falls back to first step index for unknown paths", () => {
    expect(getActiveOnboardingStepIndex("/onboarding/unknown")).toBe(0);
  });
});
