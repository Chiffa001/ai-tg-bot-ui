import { onboardingSteps } from "@/modules/onboarding/constants/onboarding-steps";

export const getActiveOnboardingStepIndex = (pathname: string) => {
  const activeStepIndex = onboardingSteps.findIndex(
    (step) => pathname === step.href || pathname.startsWith(`${step.href}/`),
  );

  return activeStepIndex >= 0 ? activeStepIndex : 0;
};
