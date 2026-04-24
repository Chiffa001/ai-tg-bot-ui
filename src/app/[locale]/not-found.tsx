import { useTranslations } from "next-intl";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { DefaultPageHeader } from "@/shared/components/page/default-page-header";
import { DefaultPageWrapper } from "@/shared/components/page/default-page-wrapper";

const NotFound = () => {
  const t = useTranslations();

  return (
    <DefaultPageWrapper>
      <DefaultPageHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="font-mono text-[8rem] font-extrabold leading-none tracking-widest text-slate-200">
          404
        </span>
        <div className="flex flex-col gap-3">
          <h1 className="text-[1.75rem] font-bold text-slate-950">
            {t("errors.notFound.title")}
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {t("errors.notFound.description")}
          </p>
        </div>
        <ButtonLink href="/">{t("errors.notFound.backHome")}</ButtonLink>
      </div>
    </DefaultPageWrapper>
  );
};

export default NotFound;
