import { OnboardingBotTokenVisual } from "@/modules/onboarding/components/onboarding-bot-token-visual";
import { OnboardingBusinessConnectVisual } from "@/modules/onboarding/components/onboarding-business-connect-visual";
import type { OnboardingStepId } from "@/modules/onboarding/constants/onboarding-steps";
import { VisualSidePanel } from "@/shared/components/page/visual-side-panel";

type OnboardingVisualSectionProps = {
  stepId: OnboardingStepId;
  stepLabel: string;
};

export const OnboardingVisualSection = ({
  stepId,
  stepLabel,
}: OnboardingVisualSectionProps) => {
  return (
    <VisualSidePanel className="items-center gap-10 px-8 py-12 lg:px-14 xl:px-15 xl:py-12">
      {stepId === "business" ? (
        <OnboardingBusinessConnectVisual />
      ) : (
        <OnboardingBotTokenVisual />
      )}

      <p className="text-sm text-slate-500">{stepLabel}</p>
    </VisualSidePanel>
  );
};
