import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import {
  getRequestLocaleFromParams,
  setRequestLocaleFromParams,
} from "@/i18n/request-locale";
import { routing } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

const openGraphLocales: Record<(typeof routing.locales)[number], string> = {
  en: "en_US",
  pl: "pl_PL",
  ru: "ru_RU",
};

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const locale = await getRequestLocaleFromParams(params);
  const t = await getTranslations({
    locale,
    namespace: "metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      description: t("openGraphDescription"),
      locale: openGraphLocales[locale],
      title: t("title"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      description: t("openGraphDescription"),
      title: t("title"),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const locale = await setRequestLocaleFromParams(params);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={cn(manrope.variable, ibmPlexMono.variable, "h-full antialiased")}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
