import { DefaultPageHeader } from "@/shared/components/page/default-page-header";
import { DefaultPageWrapper } from "@/shared/components/page/default-page-wrapper";

type NotFoundPageProps = {
  backHomeLabel: string;
  description: string;
  homeHref: `/${string}` | "/";
  title: string;
};

export const NotFoundPage = ({
  backHomeLabel,
  description,
  homeHref,
  title,
}: NotFoundPageProps) => {
  return (
    <DefaultPageWrapper>
      <DefaultPageHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="font-mono text-[8rem] font-extrabold leading-none tracking-widest text-slate-200">
          404
        </span>
        <div className="flex flex-col gap-3">
          <h1 className="text-[1.75rem] font-bold text-slate-950">{title}</h1>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {description}
          </p>
        </div>
        <a
          href={homeHref}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-white duration-300 ease-out hover:bg-accent-strong"
        >
          {backHomeLabel}
        </a>
      </div>
    </DefaultPageWrapper>
  );
};
