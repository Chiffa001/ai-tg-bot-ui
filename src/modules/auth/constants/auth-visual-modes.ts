export type AuthVisualMode = "login" | "register";

export const authVisualModes = {
  login: {
    heading: "С возвращением!",
    logoSize: "lg",
    subtitle: "Ваш ИИ-ассистент ждёт вас",
    type: "hero",
  },
  register: {
    author: "Алексей К., интернет-магазин",
    logoSize: "md",
    quote:
      "«Подключил за 5 минут, теперь ИИ отвечает клиентам даже ночью. Продажи выросли на 30%»",
    type: "quote",
  },
} as const satisfies Record<
  AuthVisualMode,
  {
    logoSize: "md" | "lg";
    type: "hero" | "quote";
  } & (
    | {
        heading: string;
        subtitle: string;
        type: "hero";
      }
    | {
        author: string;
        quote: string;
        type: "quote";
      }
  )
>;

export const authVisualStats = [
  { value: "500+", label: "бизнесов" },
  { value: "50K+", label: "сообщений/день" },
  { value: "99.9%", label: "аптайм" },
] as const;
