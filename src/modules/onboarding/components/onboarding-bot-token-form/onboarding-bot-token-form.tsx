"use client";

import { ReactNode, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { OnboardingHelpModal } from "@/modules/onboarding/components/onboarding-help-modal";
import { CheckCircleIcon } from "@/modules/onboarding/components/icons/check-circle-icon";
import { InfoIcon } from "@/modules/onboarding/components/icons/info-icon";
import { KeyRoundIcon } from "@/modules/onboarding/components/icons/key-round-icon";
import { SpinnerIcon } from "@/modules/onboarding/components/icons/spinner-icon";
import { OnboardingStepHeader } from "@/modules/onboarding/components/onboarding-step-header";
import {
  botTokenSchema,
  type BotTokenFormData,
} from "@/modules/onboarding/schemas/bot-token-schema";
import {
  buildBotUsername,
  sleep,
} from "@/modules/onboarding/lib/bot-token-helpers";
import {
  clearBotTokenStepCompleted,
  markBotTokenStepCompleted,
} from "@/modules/onboarding/actions/onboarding-progress-actions";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/cn";
import { useOnboardingStore } from "@/modules/onboarding/store/onboarding-store";

type SubmitStatus = "idle" | "success" | "error";

export const OnboardingBotTokenForm = () => {
  const router = useRouter();
  const botToken = useOnboardingStore((state) => state.botToken);
  const setBotToken = useOnboardingStore((state) => state.setBotToken);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [connectedBot, setConnectedBot] = useState("");

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setValue,
    control,
  } = useForm<BotTokenFormData>({
    resolver: zodResolver(botTokenSchema),
    defaultValues: {
      token: botToken,
    },
  });

  const tokenValue = useWatch({
    control,
    name: "token",
    defaultValue: "",
  });
  const currentTokenValue = tokenValue || botToken;
  const isFilled = currentTokenValue.trim().length > 0;
  const tokenField = register("token");

  useEffect(() => {
    if (!botToken || botToken === tokenValue) {
      return;
    }

    setValue("token", botToken);
  }, [botToken, setValue, tokenValue]);

  const onSubmit = async ({ token }: BotTokenFormData) => {
    setBotToken(token);
    setIsChecking(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    await sleep(900);

    if (token.toLowerCase().includes("already")) {
      const message = "Бот уже подключён";

      setError("token", { message });
      setSubmitStatus("error");
      setSubmitMessage(message);
      setIsChecking(false);
      return;
    }

    const username = buildBotUsername(token);

    setConnectedBot(username);
    await markBotTokenStepCompleted();
    setSubmitStatus("success");
    setSubmitMessage(`Бот ${username} успешно найден`);
    setIsChecking(false);

    await sleep(900);
    router.push("/onboarding/business");
  };

  const tokenError = errors.token?.message;
  const showError = submitStatus === "error" || Boolean(tokenError);
  const showSuccess = submitStatus === "success";
  let tokenInputStateClassName = "border-slate-200 focus-within:border-accent";
  let submitIcon: ReactNode = null;
  let submitLabel = "Проверить и продолжить";

  if (showError) {
    tokenInputStateClassName = "border-red-400";
  }

  if (showSuccess) {
    tokenInputStateClassName = "border-green-500";
    submitIcon = <CheckCircleIcon className="h-4.5 w-4.5" />;
    submitLabel = `Переходим дальше${connectedBot ? ` · ${connectedBot}` : ""}`;
  }

  if (isChecking) {
    submitIcon = <SpinnerIcon className="h-4.5 w-4.5 animate-spin" />;
    submitLabel = "Проверяем токен";
  }

  return (
    <>
      <div className="flex w-full flex-col gap-8">
        <OnboardingStepHeader
          title="Подключите вашего бота"
          description="Создайте бота в @BotFather и скопируйте токен"
        />

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-slate-950">
              Токен бота
            </span>
            <span
              className={cn(
                "flex items-center gap-2 rounded-xl border bg-white px-3.5 py-3 text-sm shadow-[0_1px_0_rgba(15,23,42,0.02)]",
                tokenInputStateClassName,
              )}
            >
              <KeyRoundIcon className="h-4.5 w-4.5 shrink-0 text-slate-500" />
              <input
                {...tokenField}
                type="text"
                placeholder="1234567890:ABCDef..."
                autoComplete="off"
                className="w-full min-w-0 border-none bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
                aria-invalid={showError}
                disabled={isChecking}
                onChange={(event) => {
                  tokenField.onChange(event);
                  setBotToken(event.target.value);
                  clearBotTokenStepCompleted();
                }}
              />
              {showSuccess ? (
                <CheckCircleIcon className="h-4.5 w-4.5 shrink-0 text-green-600" />
              ) : null}
            </span>
          </label>

          <div className="min-h-5 text-sm">
            {showError ? (
              <p className="text-red-500">{tokenError ?? submitMessage}</p>
            ) : null}
            {showSuccess ? (
              <p className="text-green-600">{submitMessage}</p>
            ) : null}
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl py-3.5"
            disabled={!isFilled || isChecking}
          >
            {submitIcon}
            {submitLabel}
          </Button>

          <button
            type="button"
            onClick={() => setIsHelpModalOpen(true)}
            className="flex w-fit items-center gap-1.5 text-[13px] font-medium text-accent hover:text-accent-strong"
          >
            <InfoIcon className="h-4 w-4" />
            Как получить токен?
          </button>
        </form>
      </div>

      <OnboardingHelpModal
        open={isHelpModalOpen}
        onCloseAction={() => setIsHelpModalOpen(false)}
      />
    </>
  );
};
