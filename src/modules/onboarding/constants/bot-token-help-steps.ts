import type { useTranslations } from "next-intl";

export const getBotTokenHelpSteps = (t: ReturnType<typeof useTranslations<"onboarding.bot.help">>) => {
  return [
    t("steps.openBotFather"),
    t("steps.sendCommand"),
    t("steps.setName"),
    t("steps.copyToken"),
  ] as const;
};
