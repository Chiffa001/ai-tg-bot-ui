import { useTranslations } from "next-intl";
import { OnboardingStepHeader } from "@/modules/onboarding/components/onboarding-step-header";
import { getBusinessConnectSteps } from "@/modules/onboarding/constants/business-connect-steps";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { cn } from "@/shared/lib/cn";

export const OnboardingBusinessConnectSection = () => {
  const t = useTranslations("onboarding.business");
  const businessConnectSteps = getBusinessConnectSteps(t);

  return (
    <div className="flex flex-col gap-8">
      <OnboardingStepHeader
        title={t("header.title")}
        description={t("header.description")}
      />

      <ol className="flex flex-col gap-5">
        {businessConnectSteps.map((step) => (
          <li
            key={step.title}
            className="flex items-center gap-3.5"
          >
            <span
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-semibold text-accent",
                step.iconClassName,
              )}
            >
              {step.icon}
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-sm font-semibold text-slate-950">
                {step.title}
              </span>
              <span className="text-[13px] leading-5 text-slate-500">
                {step.subtitle}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-3">
        <ButtonLink href="/" className="w-full rounded-lg py-3">
          <span aria-hidden="true">✓</span>
          {t("actions.continue")}
        </ButtonLink>
        <ButtonLink
          href="/onboarding/bot"
          variant="secondary"
          className="w-full rounded-lg py-3"
        >
          {t("actions.back")}
        </ButtonLink>
      </div>
    </div>
  );
};
