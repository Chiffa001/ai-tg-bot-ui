import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRightIcon } from "@/modules/welcome/components/icons/arrow-up-right-icon";
import { ButtonLink } from "@/shared/components/ui/button-link";

export const WelcomeCta = () => {
  const t = useTranslations();

  return (
    <div className="mt-6 flex w-full flex-col gap-2.5">
      <ButtonLink
        href="/auth/register"
        className="w-full"
      >
        {t("welcome.cta.primary")}
        <ArrowUpRightIcon />
      </ButtonLink>
      <p className="text-xs text-muted sm:text-sm">
        {t("welcome.cta.caption")}
      </p>
      <p className="text-xs text-muted sm:text-sm">
        {t("welcome.cta.loginPrompt")}{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-accent hover:text-accent-strong"
        >
          {t("welcome.cta.loginLink")}
        </Link>
      </p>
    </div>
  );
};
