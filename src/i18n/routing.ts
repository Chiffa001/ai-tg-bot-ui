import { defineRouting } from "next-intl/routing";

export const locales = ["ru", "en", "pl"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "ru";

export const routing = defineRouting({
  defaultLocale,
  localePrefix: "always",
  locales,
});

export const hasLocale = (value: string): value is AppLocale => {
  return locales.includes(value as AppLocale);
};

export const getLocaleFromPathname = (pathname: string): AppLocale | null => {
  const [, locale] = pathname.split("/");

  return locale && hasLocale(locale) ? locale : null;
};

export const stripLocaleFromPathname = (pathname: string) => {
  const locale = getLocaleFromPathname(pathname);

  if (!locale) {
    return pathname;
  }

  const localizedPrefix = `/${locale}`;
  const internalPathname = pathname.startsWith(`${localizedPrefix}/`)
    ? pathname.slice(localizedPrefix.length)
    : "/";

  return internalPathname || "/";
};

export const localizePathname = (pathname: string, locale: AppLocale) => {
  const normalizedPathname =
    pathname === "/" ? "" : stripLocaleFromPathname(pathname);

  return `/${locale}${normalizedPathname}`;
};

export const normalizeInternalPath = (pathname: string) => {
  if (!pathname.startsWith("/") || pathname.startsWith("//")) {
    return null;
  }

  try {
    const url = new URL(pathname, "http://localhost");

    return `${stripLocaleFromPathname(url.pathname)}${url.search}`;
  } catch {
    return null;
  }
};
