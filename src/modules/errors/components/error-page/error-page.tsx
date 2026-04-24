"use client";

import { Button } from "@/shared/components/ui/button";
import { DefaultPageHeader } from "@/shared/components/page/default-page-header";
import { DefaultPageWrapper } from "@/shared/components/page/default-page-wrapper";

type ErrorPageProps = {
  backHomeLabel: string;
  description: string;
  homeHref: `/${string}` | "/";
  retryLabel: string;
  title: string;
  onRetryAction: () => void;
};

export const ErrorPage = ({
  backHomeLabel,
  description,
  homeHref,
  retryLabel,
  title,
  onRetryAction,
}: ErrorPageProps) => {
  return (
    <DefaultPageWrapper>
      <DefaultPageHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="font-mono text-[8rem] font-extrabold leading-none tracking-widest text-slate-200">
          500
        </span>
        <div className="flex flex-col gap-3">
          <h1 className="text-[1.75rem] font-bold text-slate-950">{title}</h1>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {description}
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Button onClick={onRetryAction}>{retryLabel}</Button>
          <a
            href={homeHref}
            className="text-sm font-medium text-accent hover:text-accent-strong"
          >
            {backHomeLabel}
          </a>
        </div>
      </div>
    </DefaultPageWrapper>
  );
};
