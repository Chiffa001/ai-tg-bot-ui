import { useTranslations } from "next-intl";
import {
  ChatMessageRow,
  type ChatMessage,
} from "@/shared/components/chat-preview/chat-message-row";

type ChatPreviewCardProps = {
  badgeLabel?: string;
  messages: readonly ChatMessage[];
};

export const ChatPreviewCard = ({
  badgeLabel,
  messages,
}: ChatPreviewCardProps) => {
  const t = useTranslations();
  const resolvedBadgeLabel = badgeLabel ?? t("shared.chatPreview.badge");

  return (
    <div className="relative mx-auto flex w-full max-w-100 flex-col gap-2.5 rounded-3xl border border-white/8 bg-panel-card p-4 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.9)] sm:p-5">
      <div className="flex w-fit items-center gap-2 rounded-xl bg-accent/20 px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <span className="text-[10px] font-medium tracking-[0.02em] text-slate-300">
          {resolvedBadgeLabel}
        </span>
      </div>

      {messages.map((message) => (
        <ChatMessageRow key={message.text} {...message} />
      ))}
    </div>
  );
};
