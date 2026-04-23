import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ИИ-менеджер для Telegram Business",
  description:
    "ИИ-автоответчик для Telegram Business: отвечает клиентам 24/7, подключается за 5 минут и помогает не терять лидов.",
  openGraph: {
    title: "ИИ-менеджер для Telegram Business",
    description:
      "Автоматические ответы 24/7, передача менеджеру и быстрый запуск без кода.",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "ИИ-менеджер для Telegram Business",
    description:
      "Автоматические ответы 24/7, передача менеджеру и быстрый запуск без кода.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
};

export default RootLayout;
