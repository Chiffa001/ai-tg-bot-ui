"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { botTokenHelpSteps } from "@/modules/onboarding/constants/bot-token-help-steps";

type OnboardingHelpModalProps = {
  onCloseAction: () => void;
  open: boolean;
};

export const OnboardingHelpModal = ({
  onCloseAction,
  open,
}: OnboardingHelpModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onCloseAction()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4">
          <div className="rounded-[1.75rem] bg-white p-6 shadow-[0_32px_120px_-48px_rgba(15,23,42,0.45)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
                  BotFather
                </p>
                <Dialog.Title className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                  Как получить токен
                </Dialog.Title>
                <Dialog.Description className="sr-only">
                  Пошаговая инструкция по получению токена бота через BotFather в Telegram
                </Dialog.Description>
              </div>
              <Dialog.Close
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-lg text-slate-500 hover:border-slate-300 hover:text-slate-950"
                aria-label="Закрыть инструкцию"
              >
                ×
              </Dialog.Close>
            </div>

            <ol className="mt-6 flex flex-col gap-3">
              {botTokenHelpSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-6 text-slate-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
