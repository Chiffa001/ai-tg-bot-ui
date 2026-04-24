import { getRequestConfig } from "next-intl/server";
import { defaultLocale, hasLocale } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale =
    requestedLocale && hasLocale(requestedLocale)
      ? requestedLocale
      : defaultLocale;

  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default,
  };
});
