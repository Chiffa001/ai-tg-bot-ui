import type { useTranslations } from "next-intl";

export const getBusinessConnectSteps = (t: ReturnType<typeof useTranslations<"onboarding.business">>) => {
  return [
    {
      icon: "⚙",
      iconClassName: "text-2xl",
      subtitle: t("steps.settings.subtitle"),
      title: t("steps.settings.title"),
    },
    {
      icon: "▣",
      iconClassName: "text-xl",
      subtitle: t("steps.business.subtitle"),
      title: t("steps.business.title"),
    },
    {
      icon: "⌘",
      iconClassName: "text-xl",
      subtitle: t("steps.chatbots.subtitle"),
      title: t("steps.chatbots.title"),
    },
    {
      icon: "⌕",
      iconClassName: "text-2xl",
      subtitle: t("steps.findBot.subtitle"),
      title: t("steps.findBot.title"),
    },
  ] as const;
};
