import type { useTranslations } from "next-intl";

export const getFeatures = (t: ReturnType<typeof useTranslations<"welcome.features">>) => {
  return [
    { icon: "⏰", label: t("autoReplies") },
    { icon: "🧠", label: t("smartAi") },
    { icon: "✨", label: t("noCode") },
  ] as const;
};
