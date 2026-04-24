import type { useTranslations } from "next-intl";
import type { ChatMessage } from "@/shared/components/chat-preview/chat-message-row";

export const getChatPreviewMessages = (
  t: ReturnType<typeof useTranslations<"welcome.chat">>,
): readonly ChatMessage[] => [
  {
    avatar: "👤",
    align: "start",
    bubbleClassName:
      "rounded-[18px] rounded-tl-sm bg-slate-700 px-4 py-3 text-sm leading-6 text-slate-200",
    text: t("customerQuestion"),
  },
  {
    avatar: "🤖",
    align: "end",
    bubbleClassName:
      "rounded-[18px] rounded-tr-sm bg-accent px-4 py-3 text-sm leading-6 text-white",
    text: t("aiAnswer"),
  },
  {
    avatar: "👤",
    align: "start",
    bubbleClassName:
      "rounded-[18px] rounded-tl-sm bg-slate-700 px-4 py-3 text-sm leading-6 text-slate-200",
    text: t("customerConfirm"),
  },
  {
    avatar: "🤖",
    align: "end",
    bubbleClassName:
      "rounded-[18px] rounded-tr-sm bg-accent px-4 py-3 text-sm leading-6 text-white",
    text: t("aiResult"),
  },
] as const;
