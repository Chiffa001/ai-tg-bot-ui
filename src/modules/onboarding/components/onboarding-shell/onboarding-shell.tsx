"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { OnboardingStepIndicator } from "@/modules/onboarding/components/onboarding-step-indicator";
import { OnboardingVisualSection } from "@/modules/onboarding/components/onboarding-visual-section";
import { onboardingSteps } from "@/modules/onboarding/constants/onboarding-steps";
import { getActiveOnboardingStepIndex } from "@/modules/onboarding/lib/onboarding-step-helpers";
import { ContentPanel } from "@/shared/components/content/content-panel";
import { SplitPageWrapper } from "@/shared/components/page/split-page-wrapper";

type OnboardingShellProps = {
  children: ReactNode;
};

export const OnboardingShell = ({ children }: OnboardingShellProps) => {
  const pathname = usePathname();
  const activeStepIndex = getActiveOnboardingStepIndex(pathname);
  const activeStep = onboardingSteps[activeStepIndex];
  const stepLabel = `Шаг ${activeStepIndex + 1} из ${onboardingSteps.length} — ${activeStep.description}`;

  return (
    <SplitPageWrapper
      left={<OnboardingVisualSection stepId={activeStep.id} stepLabel={stepLabel} />}
      right={
        <ContentPanel className="items-stretch">
          <div className="mx-auto flex h-full w-full max-w-110 flex-col gap-8">
            <OnboardingStepIndicator />
            <div className="flex flex-1 items-center">{children}</div>
          </div>
        </ContentPanel>
      }
    />
  );
};
