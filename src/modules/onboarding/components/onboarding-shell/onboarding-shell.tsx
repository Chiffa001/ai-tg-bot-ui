import type { ReactNode } from "react";
import { OnboardingStepIndicator } from "@/modules/onboarding/components/onboarding-step-indicator";
import { OnboardingVisualSection } from "@/modules/onboarding/components/onboarding-visual-section";
import { ContentPanel } from "@/shared/components/content/content-panel";
import { SplitPageWrapper } from "@/shared/components/page/split-page-wrapper";

type OnboardingShellProps = {
  children: ReactNode;
};

export const OnboardingShell = ({ children }: OnboardingShellProps) => {
  return (
    <SplitPageWrapper
      left={<OnboardingVisualSection />}
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
