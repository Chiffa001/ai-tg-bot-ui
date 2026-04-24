import { cookies, headers } from "next/headers";
import { defaultLocale, hasLocale, type AppLocale } from "@/i18n/routing";

const NEXT_LOCALE_COOKIE = "NEXT_LOCALE";

const findSupportedLocale = (value: string) => {
  const normalizedValue = value.toLowerCase();

  if (hasLocale(normalizedValue)) {
    return normalizedValue;
  }

  const baseLocale = normalizedValue.split("-")[0];

  return hasLocale(baseLocale) ? baseLocale : null;
};

const getLocaleFromAcceptLanguage = (headerValue: string | null) => {
  if (!headerValue) {
    return null;
  }

  const languagePreferences = headerValue
    .split(",")
    .map((entry) => {
      const [language, qValue] = entry.trim().split(";q=");
      const quality = qValue ? Number(qValue) : 1;

      return {
        language,
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .sort((left, right) => right.quality - left.quality);

  for (const preference of languagePreferences) {
    const matchedLocale = findSupportedLocale(preference.language);

    if (matchedLocale) {
      return matchedLocale;
    }
  }

  return null;
};

export const resolveRequestLocale = async (): Promise<AppLocale> => {
  const cookieStore = await cookies();
  const localeFromCookie = cookieStore.get(NEXT_LOCALE_COOKIE)?.value;

  if (localeFromCookie && hasLocale(localeFromCookie)) {
    return localeFromCookie;
  }

  const requestHeaders = await headers();
  const localeFromHeader = getLocaleFromAcceptLanguage(
    requestHeaders.get("accept-language"),
  );

  if (localeFromHeader) {
    return localeFromHeader;
  }

  return defaultLocale;
};
