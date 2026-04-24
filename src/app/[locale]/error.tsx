"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/shared/components/ui/button";
import { DefaultPageHeader } from "@/shared/components/page/default-page-header";
import { DefaultPageWrapper } from "@/shared/components/page/default-page-wrapper";

type ErrorPageProps = {
  reset: () => void;
};

const ErrorPage = ({ reset }: ErrorPageProps) => {
  const t = useTranslations();

  return (
    <DefaultPageWrapper>
      <DefaultPageHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="font-mono text-[8rem] font-extrabold leading-none tracking-widest text-slate-200">
          500
        </span>
        <div className="flex flex-col gap-3">
          <h1 className="text-[1.75rem] font-bold text-slate-950">
            {t("errors.server.title")}
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {t("errors.server.description")}
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Button onClick={reset}>{t("errors.server.retry")}</Button>
          <Link
            href="/"
            className="text-sm font-medium text-accent hover:text-accent-strong"
          >
            {t("errors.server.backHome")}
          </Link>
        </div>
      </div>
    </DefaultPageWrapper>
  );
};

export default ErrorPage;
