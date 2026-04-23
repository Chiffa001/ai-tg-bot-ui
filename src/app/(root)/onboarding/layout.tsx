import type { ReactNode } from "react";
import { OnboardingShell } from "@/modules/onboarding/components/onboarding-shell";

type OnboardingLayoutProps = {
  children: ReactNode;
};

const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  return <OnboardingShell>{children}</OnboardingShell>;
};

export default OnboardingLayout;
