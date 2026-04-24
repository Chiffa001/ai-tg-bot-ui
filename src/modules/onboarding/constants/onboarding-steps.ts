import type { useTranslations } from "next-intl";

export type OnboardingStepId = "bot" | "business" | "ai" | "test";

export type OnboardingStep = {
  description: string;
  id: OnboardingStepId;
  href: string;
  label: string;
  shortLabel: string;
};

export const onboardingStepHrefs: Record<OnboardingStepId, string> = {
  ai: "/onboarding/ai",
  bot: "/onboarding/bot",
  business: "/onboarding/business",
  test: "/onboarding/test",
};

const onboardingStepIds: readonly OnboardingStepId[] = [
  "bot",
  "business",
  "ai",
  "test",
] as const;

export const getOnboardingSteps = (
  t: ReturnType<typeof useTranslations<"onboarding.steps">>,
): readonly OnboardingStep[] => [
  {
    description: t("bot.description"),
    id: "bot",
    href: onboardingStepHrefs.bot,
    label: t("bot.label"),
    shortLabel: "1",
  },
  {
    description: t("business.description"),
    id: "business",
    href: onboardingStepHrefs.business,
    label: t("business.label"),
    shortLabel: "2",
  },
  {
    description: t("ai.description"),
    id: "ai",
    href: onboardingStepHrefs.ai,
    label: t("ai.label"),
    shortLabel: "3",
  },
  {
    description: t("test.description"),
    id: "test",
    href: onboardingStepHrefs.test,
    label: t("test.label"),
    shortLabel: "4",
  },
] as const;

export const onboardingPathnames = onboardingStepIds.map(
  (stepId) => onboardingStepHrefs[stepId],
);
