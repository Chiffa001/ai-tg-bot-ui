import type { ReactNode } from "react";
import {
  setRequestLocaleFromParams,
  type LocaleParamsPromise,
} from "@/i18n/request-locale";
import { OnboardingShell } from "@/modules/onboarding/components/onboarding-shell";

type OnboardingLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const OnboardingLayout = async ({
  children,
  params,
}: OnboardingLayoutProps) => {
  await setRequestLocaleFromParams(params as LocaleParamsPromise);

  return <OnboardingShell>{children}</OnboardingShell>;
};

export default OnboardingLayout;
