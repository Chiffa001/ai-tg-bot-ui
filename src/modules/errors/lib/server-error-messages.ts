import enMessages from "../../../../locales/en.json";
import plMessages from "../../../../locales/pl.json";
import ruMessages from "../../../../locales/ru.json";
import { defaultLocale, getLocaleFromPathname, hasLocale, type AppLocale } from "@/i18n/routing";

const localeMessages = {
  en: enMessages,
  pl: plMessages,
  ru: ruMessages,
} as const;

const NEXT_LOCALE_COOKIE = "NEXT_LOCALE";

const getBrowserLocale = () => {
  if (typeof navigator === "undefined") {
    return null;
  }

  const candidates = [...navigator.languages, navigator.language];

  for (const candidate of candidates) {
    const normalizedCandidate = candidate.toLowerCase();

    if (hasLocale(normalizedCandidate)) {
      return normalizedCandidate;
    }

    const baseLocale = normalizedCandidate.split("-")[0];

    if (hasLocale(baseLocale)) {
      return baseLocale;
    }
  }

  return null;
};

const getCookieLocale = () => {
  if (typeof document === "undefined") {
    return null;
  }

  const localeCookie = document.cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${NEXT_LOCALE_COOKIE}=`))
    ?.split("=")[1];

  return localeCookie && hasLocale(localeCookie) ? localeCookie : null;
};

export const resolveClientLocale = (pathname: string | null): AppLocale => {
  const localeFromPathname = pathname ? getLocaleFromPathname(pathname) : null;

  if (localeFromPathname) {
    return localeFromPathname;
  }

  const localeFromCookie = getCookieLocale();

  if (localeFromCookie) {
    return localeFromCookie;
  }

  const localeFromBrowser = getBrowserLocale();

  return localeFromBrowser ?? defaultLocale;
};

export const getServerErrorMessages = (locale: AppLocale) => {
  return localeMessages[locale].errors.server;
};
