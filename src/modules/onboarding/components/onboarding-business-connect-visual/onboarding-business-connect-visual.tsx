import { telegramBusinessRows } from "@/modules/onboarding/constants/telegram-business-rows";

export const OnboardingBusinessConnectVisual = () => {
  return (
    <>
      <div className="relative w-80 rounded-3xl border border-slate-700 bg-[#1B2638] py-3 shadow-[0_28px_96px_-44px_rgba(0,0,0,0.95)]">
        <div className="flex h-7 items-center justify-between px-5 text-xs font-semibold text-white">
          <span>9:41</span>
          <span className="text-[10px] font-normal text-slate-400">●●●○ 87%</span>
        </div>

        <div className="flex h-11 items-center gap-2 px-4">
          <span className="text-lg font-medium text-accent">←</span>
          <span className="text-[17px] font-semibold text-white">
            Telegram Business
          </span>
        </div>

        <div className="flex flex-col px-0 py-2">
          {telegramBusinessRows.map((row) => (
            <div key={row.label}>
              <div
                className={
                  row.active
                    ? "relative flex h-12 items-center justify-between bg-accent/15 px-4"
                    : "flex h-12 items-center justify-between px-4"
                }
              >
                {row.active ? (
                  <span className="absolute top-2 left-0 h-8 w-0.75 rounded bg-accent" />
                ) : null}
                <span className="flex items-center gap-3 text-[13px] text-slate-200">
                  <span className={row.active ? "text-accent" : "text-slate-500"}>
                    {row.icon}
                  </span>
                  {row.label}
                </span>
                <span className={row.active ? "text-accent" : "text-slate-600"}>
                  ›
                </span>
              </div>
              <div className="h-px bg-slate-700" />
            </div>
          ))}
        </div>

        <div className="px-4 pb-3">
          <p className="mb-2 text-[10px] font-semibold tracking-[0.12em] text-slate-500">
            CONNECTED BOT
          </p>
          <div className="flex items-center gap-2.5 rounded-xl border border-accent/25 bg-slate-900/30 px-3 py-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
              TB
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white">@telebot_ai</p>
              <p className="text-[10px] text-slate-500">Ready to connect</p>
            </div>
            <span className="text-xs text-success">✓</span>
          </div>
        </div>

        <div className="absolute top-35 left-65 flex items-center gap-2">
          <span className="h-px w-7 bg-accent" />
          <span className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-white shadow-[0_18px_36px_-22px_rgba(37,99,235,1)]">
            Select this <span aria-hidden="true">👆</span>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="rounded-lg border border-slate-700 bg-panel-card px-3 py-1.5 text-[13px] font-medium text-slate-400">
          ⚙ Settings
        </span>
        <span className="text-sm font-medium text-accent">→</span>
        <span className="rounded-lg border border-slate-700 bg-panel-card px-3 py-1.5 text-[13px] font-medium text-slate-400">
          💼 Business
        </span>
        <span className="text-sm font-medium text-accent">→</span>
        <span className="rounded-lg bg-accent px-3 py-1.5 text-[13px] font-semibold text-white">
          🤖 Chatbots
        </span>
      </div>
    </>
  );
};
