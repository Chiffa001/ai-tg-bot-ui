"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { OnboardingBotTokenVisual } from "@/modules/onboarding/components/onboarding-bot-token-visual";
import { OnboardingBusinessConnectVisual } from "@/modules/onboarding/components/onboarding-business-connect-visual";
import { getOnboardingSteps } from "@/modules/onboarding/constants/onboarding-steps";
import { getActiveOnboardingStepIndex } from "@/modules/onboarding/lib/onboarding-step-helpers";
import { VisualSidePanel } from "@/shared/components/page/visual-side-panel";

export const OnboardingVisualSection = () => {
  const tSteps = useTranslations("onboarding.steps");
  const tVisual = useTranslations("onboarding.visual");
  const pathname = usePathname();
  const onboardingSteps = getOnboardingSteps(tSteps);
  const activeStepIndex = getActiveOnboardingStepIndex(pathname);
  const activeStep = onboardingSteps[activeStepIndex];
  const stepLabel = tVisual("stepLabel", {
    current: activeStepIndex + 1,
    total: onboardingSteps.length,
    step: activeStep.description,
  });

  return (
    <VisualSidePanel className="hidden items-center gap-10 px-8 py-12 lg:px-14 xl:flex xl:px-15 xl:py-12">
      {activeStep.id === "business" ? (
        <OnboardingBusinessConnectVisual />
      ) : (
        <OnboardingBotTokenVisual />
      )}

      <p className="text-sm text-slate-500">{stepLabel}</p>
    </VisualSidePanel>
  );
};
