import type { ChatMessage } from "@/shared/components/chat-preview/chat-message-row";

export const chatPreviewMessages: readonly ChatMessage[] = [
  {
    avatar: "👤",
    align: "start",
    bubbleClassName:
      "rounded-[18px] rounded-tl-sm bg-slate-700 px-4 py-3 text-sm leading-6 text-slate-200",
    text: "Здравствуйте! Сколько стоит доставка в Москву?",
  },
  {
    avatar: "🤖",
    align: "end",
    bubbleClassName:
      "rounded-[18px] rounded-tr-sm bg-accent px-4 py-3 text-sm leading-6 text-white",
    text: "Здравствуйте! Доставка в Москву стоит 350₽ и занимает 2-3 дня. Оформить заказ? 😊",
  },
  {
    avatar: "👤",
    align: "start",
    bubbleClassName:
      "rounded-[18px] rounded-tl-sm bg-slate-700 px-4 py-3 text-sm leading-6 text-slate-200",
    text: "Да, оформите, пожалуйста!",
  },
  {
    avatar: "🤖",
    align: "end",
    bubbleClassName:
      "rounded-[18px] rounded-tr-sm bg-accent px-4 py-3 text-sm leading-6 text-white",
    text: "Отлично! Заказ #4821 оформлен ✅ Трек-номер придёт в течение часа.",
  },
] as const;
