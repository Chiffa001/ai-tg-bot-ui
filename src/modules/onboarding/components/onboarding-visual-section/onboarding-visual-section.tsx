"use client";

import { usePathname } from "next/navigation";
import { OnboardingBotTokenVisual } from "@/modules/onboarding/components/onboarding-bot-token-visual";
import { OnboardingBusinessConnectVisual } from "@/modules/onboarding/components/onboarding-business-connect-visual";
import { onboardingSteps } from "@/modules/onboarding/constants/onboarding-steps";
import { getActiveOnboardingStepIndex } from "@/modules/onboarding/lib/onboarding-step-helpers";
import { VisualSidePanel } from "@/shared/components/page/visual-side-panel";

export const OnboardingVisualSection = () => {
  const pathname = usePathname();
  const activeStepIndex = getActiveOnboardingStepIndex(pathname);
  const activeStep = onboardingSteps[activeStepIndex];
  const stepLabel = `Шаг ${activeStepIndex + 1} из ${onboardingSteps.length} — ${activeStep.description}`;

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
