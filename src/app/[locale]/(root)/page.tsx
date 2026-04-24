import {
  setRequestLocaleFromParams,
  type LocaleParamsPromise,
} from "@/i18n/request-locale";
import { LeftVisualSection } from "@/modules/welcome/components/left-visual-section";
import { RightContentSection } from "@/modules/welcome/components/right-content-section";
import { SplitPageWrapper } from "@/shared/components/page/split-page-wrapper";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const Welcome = async ({ params }: PageProps) => {
  await setRequestLocaleFromParams(params as LocaleParamsPromise);

  return (
    <SplitPageWrapper
      left={<LeftVisualSection />}
      right={<RightContentSection />}
    />
  );
};

export default Welcome;
