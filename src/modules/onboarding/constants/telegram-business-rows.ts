import type { useTranslations } from "next-intl";

export const getTelegramBusinessRows = (t: ReturnType<typeof useTranslations<"onboarding.business.visual">>) => {
  return [
    {
      active: false,
      icon: "⌖",
      label: t("rows.location"),
    },
    {
      active: false,
      icon: "◷",
      label: t("rows.openingHours"),
    },
    {
      active: true,
      icon: "◈",
      label: t("rows.chatbots"),
    },
    {
      active: false,
      icon: "◌",
      label: t("rows.greetingMessage"),
    },
    {
      active: false,
      icon: "♟",
      label: t("rows.awayMessage"),
    },
  ] as const;
};
