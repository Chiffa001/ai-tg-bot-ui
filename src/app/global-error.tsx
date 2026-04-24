"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ErrorPage } from "@/modules/errors/components/error-page";
import {
  getServerErrorMessages,
  resolveClientLocale,
} from "@/modules/errors/lib/server-error-messages";
import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  const pathname = usePathname();
  const locale = resolveClientLocale(pathname);
  const messages = getServerErrorMessages(locale);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang={locale}>
      <head>
        <title>{messages.title}</title>
      </head>
      <body className="min-h-full flex flex-col">
        <ErrorPage
          title={messages.title}
          description={messages.description}
          retryLabel={messages.retry}
          backHomeLabel={messages.backHome}
          homeHref={`/${locale}`}
          onRetryAction={reset}
        />
      </body>
    </html>
  );
};

export default GlobalError;
