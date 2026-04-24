import {
  setRequestLocaleFromParams,
  type LocaleParamsPromise,
} from "@/i18n/request-locale";
import { OnboardingBusinessConnectSection } from "@/modules/onboarding/components/onboarding-business-connect-section";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const Page = async ({ params }: PageProps) => {
  await setRequestLocaleFromParams(params as LocaleParamsPromise);

  return <OnboardingBusinessConnectSection />;
};

export default Page;
