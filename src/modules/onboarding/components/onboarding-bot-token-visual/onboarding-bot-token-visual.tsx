import { ArrowRightIcon } from "@/modules/onboarding/components/icons/arrow-right-icon";
import { ZapIcon } from "@/modules/onboarding/components/icons/zap-icon";
import { BotIcon } from "@/shared/components/icons/bot-icon";

export const OnboardingBotTokenVisual = () => {
  return (
    <>
      <div className="w-full max-w-100">
        <div className="rounded-[1.25rem] border border-white/8 bg-panel-card p-5 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.9)]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white">
              <BotIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">BotFather</p>
              <p className="text-xs text-slate-400">bot</p>
            </div>
          </div>

          <div className="my-4 h-px bg-white/8" />

          <div className="flex flex-col gap-2.5">
            <div className="max-w-60 rounded-br-2xl rounded-bl-2xl rounded-tl-none rounded-tr-2xl bg-slate-700 px-3.5 py-2.5 text-xs leading-5 text-slate-100">
              Done! Congratulations on your new bot.
            </div>
            <div className="max-w-60 rounded-br-2xl rounded-bl-2xl rounded-tl-none rounded-tr-2xl bg-slate-700 px-3.5 py-2.5 text-xs leading-5 text-slate-300">
              Use this token to access the HTTP API:
              <span className="mt-2 block rounded-xl bg-slate-900/70 px-2.5 py-2 font-mono text-[11px] tracking-[0.01em] text-blue-300">
                7204815693:AAHk-Q3rr9xkMvfz...
              </span>
            </div>
            <div className="max-w-52 rounded-br-2xl rounded-bl-2xl rounded-tl-none rounded-tr-2xl bg-slate-700 px-3.5 py-2.5 text-xs leading-5 text-slate-400">
              Keep your token secure and store it safely.
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-700 bg-panel-card text-accent">
            <BotIcon className="h-6 w-6" />
          </span>
          <span className="text-[13px] font-medium text-slate-400">BotFather</span>
        </div>

        <div className="flex items-center gap-2 pt-5 text-slate-600">
          <span className="h-px w-6 bg-slate-700" />
          <ArrowRightIcon className="h-4 w-4 text-accent" />
          <span className="h-px w-6 bg-slate-700" />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_20px_48px_-28px_rgba(37,99,235,0.9)]">
            <ZapIcon className="h-6 w-6" />
          </span>
          <span className="text-[13px] font-medium text-slate-400">TeleBot AI</span>
        </div>
      </div>
    </>
  );
};
