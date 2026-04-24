import { useTranslations } from "next-intl";

export const WelcomeHero = () => {
  const t = useTranslations();

  return (
    <div className="mt-6 space-y-3">
      <p className="inline-flex items-center rounded-full border border-accent/15 bg-accent/8 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-accent">
        {t("welcome.hero.badge")}
      </p>
      <h1 className="text-3xl font-extrabold tracking-tighter text-balance text-slate-950 sm:text-4xl">
        {t("welcome.hero.title")}
      </h1>
      <p className="text-sm leading-6 text-balance text-muted sm:text-base">
        {t("welcome.hero.description")}
      </p>
    </div>
  );
};
