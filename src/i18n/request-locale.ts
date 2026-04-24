import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, type AppLocale } from "@/i18n/routing";

type LocaleParams = {
  locale: string;
};

export type LocaleParamsPromise = Promise<LocaleParams>;

export const getRequestLocaleFromParams = async (
  params: LocaleParamsPromise,
): Promise<AppLocale> => {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  return locale;
};

export const setRequestLocaleFromParams = async (
  params: LocaleParamsPromise,
): Promise<AppLocale> => {
  const locale = await getRequestLocaleFromParams(params);

  setRequestLocale(locale);

  return locale;
};
