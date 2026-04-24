import type { useTranslations } from "next-intl";

export const getTrustItems = (t: ReturnType<typeof useTranslations<"welcome.trust">>) => {
  return [
    t("trial"),
    t("noCard"),
    t("setup"),
  ] as const;
};
