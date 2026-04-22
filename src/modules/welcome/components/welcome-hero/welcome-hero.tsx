export const WelcomeHero = () => {
  return (
    <div className="mt-6 space-y-3">
      <p className="inline-flex items-center rounded-full border border-accent/15 bg-accent/8 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-accent">
        Telegram Business SaaS
      </p>
      <h1 className="text-3xl font-extrabold tracking-tighter text-balance text-slate-950 sm:text-4xl">
        ИИ-менеджер для Telegram Business
      </h1>
      <p className="text-sm leading-6 text-balance text-muted sm:text-base">
        Отвечает клиентам 24/7, пока вы заняты. Подключите за 5 минут и
        перестаньте терять лидов в Telegram.
      </p>
    </div>
  );
};
