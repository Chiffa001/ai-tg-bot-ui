import type { useTranslations } from "next-intl";

export const getMetrics = (t: ReturnType<typeof useTranslations<"welcome.metrics">>) => {
  return [
    {
      value: t("firstReplyValue"),
      label: t("firstReplyLabel"),
    },
    {
      value: t("launchValue"),
      label: t("launchLabel"),
    },
    {
      value: "24/7",
      label: t("availabilityLabel"),
    },
  ] as const;
};
