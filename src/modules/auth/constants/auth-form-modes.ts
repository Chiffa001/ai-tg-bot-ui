import type { useTranslations } from "next-intl";

export type AuthMode = "login" | "register";

export const getAuthFormModeContent = (
  t: ReturnType<typeof useTranslations<"auth.form">>,
  mode: AuthMode,
) => {
  return {
    heading: t(`${mode}.heading`),
    submitLabel: t(`${mode}.submitLabel`),
    subtitle: t(`${mode}.subtitle`),
    toggleHref: mode === "login" ? "/auth/register" : "/auth/login",
    toggleLabel: t(`${mode}.toggleLabel`),
    toggleLinkLabel: t(`${mode}.toggleLinkLabel`),
  };
};
