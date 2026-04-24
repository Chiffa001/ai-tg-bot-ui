import { onboardingPathnames } from "@/modules/onboarding/constants/onboarding-steps";

export const getActiveOnboardingStepIndex = (pathname: string) => {
  const activeStepIndex = onboardingPathnames.findIndex(
    (stepPathname) =>
      pathname === stepPathname || pathname.startsWith(`${stepPathname}/`),
  );

  return activeStepIndex >= 0 ? activeStepIndex : 0;
};
