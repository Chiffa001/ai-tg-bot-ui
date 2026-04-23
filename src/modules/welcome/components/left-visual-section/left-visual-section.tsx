import { FeatureHighlights } from "@/modules/welcome/components/feature-highlights";
import { chatPreviewMessages } from "@/modules/welcome/constants/chat-preview-messages";
import { ChatPreviewCard } from "@/shared/components/chat-preview/chat-preview-card";
import { VisualSidePanel } from "@/shared/components/page/visual-side-panel";

export const LeftVisualSection = () => {
  return (
    <VisualSidePanel className="hidden xl:flex">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.5)_0%,rgba(37,99,235,0)_70%)] blur-2xl sm:h-96 sm:w-96" />
      <ChatPreviewCard messages={chatPreviewMessages} />
      <FeatureHighlights />
    </VisualSidePanel>
  );
};
