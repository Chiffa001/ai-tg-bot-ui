import Link from "next/link";
import { ArrowUpRightIcon } from "@/modules/welcome/components/icons/arrow-up-right-icon";
import { ButtonLink } from "@/shared/components/ui/button-link";

export const WelcomeCta = () => {
  return (
    <div className="mt-6 flex w-full flex-col gap-2.5">
      <ButtonLink
        href="/auth/register"
        className="w-full"
      >
        Подключить бесплатно
        <ArrowUpRightIcon />
      </ButtonLink>
      <p className="text-xs text-muted sm:text-sm">
        5 дней бесплатно, затем $49/мес
      </p>
      <p className="text-xs text-muted sm:text-sm">
        Уже есть аккаунт?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-accent hover:text-accent-strong"
        >
          Войти
        </Link>
      </p>
    </div>
  );
};
