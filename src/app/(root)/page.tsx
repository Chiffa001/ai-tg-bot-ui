import { LeftVisualSection } from "@/modules/welcome/components/left-visual-section";
import { RightContentSection } from "@/modules/welcome/components/right-content-section";
import { SplitPageWrapper } from "@/shared/components/page/split-page-wrapper";

const Welcome = () => {
  return (
    <SplitPageWrapper
      left={<LeftVisualSection />}
      right={<RightContentSection />}
    />
  );
};

export default Welcome;
