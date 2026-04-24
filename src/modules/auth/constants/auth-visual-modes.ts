import type { useTranslations } from "next-intl";

export type AuthVisualMode = "login" | "register";

export const getAuthVisualModeContent = (
  t: ReturnType<typeof useTranslations<"auth.visual">>,
  mode: AuthVisualMode,
) => {
  if (mode === "login") {
    return {
      heading: t("login.heading"),
      logoSize: "lg" as const,
      subtitle: t("login.subtitle"),
      type: "hero" as const,
    };
  }

  return {
    author: t("register.author"),
    logoSize: "md" as const,
    quote: t("register.quote"),
    type: "quote" as const,
  };
};

export const getAuthVisualStats = (t: ReturnType<typeof useTranslations<"auth.visual">>) => {
  return [
    { value: "500+", label: t("stats.businesses") },
    { value: "50K+", label: t("stats.messagesPerDay") },
    { value: "99.9%", label: t("stats.uptime") },
  ] as const;
};
