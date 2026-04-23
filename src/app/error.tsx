"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { DefaultPageHeader } from "@/shared/components/page/default-page-header";
import { DefaultPageWrapper } from "@/shared/components/page/default-page-wrapper";

type ErrorPageProps = {
  reset: () => void;
};

const ErrorPage = ({ reset }: ErrorPageProps) => {
  return (
    <DefaultPageWrapper>
      <DefaultPageHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="font-mono text-[8rem] font-extrabold leading-none tracking-widest text-slate-200">
          500
        </span>
        <div className="flex flex-col gap-3">
          <h1 className="text-[1.75rem] font-bold text-slate-950">
            Что-то пошло не так
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Мы уже знаем о проблеме и работаем над её устранением.
            Попробуйте обновить страницу через минуту.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Button onClick={reset}>Обновить страницу</Button>
          <Link
            href="/"
            className="text-sm font-medium text-accent hover:text-accent-strong"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </DefaultPageWrapper>
  );
};

export default ErrorPage;
