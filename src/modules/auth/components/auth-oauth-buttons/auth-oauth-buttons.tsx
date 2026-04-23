"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { GlobeIcon } from "@/modules/auth/components/icons/globe-icon";
import { TelegramIcon } from "@/modules/auth/components/icons/telegram-icon";
import { createMockSession } from "@/modules/auth/api/create-mock-session";
import type { AuthMode } from "@/modules/auth/constants/auth-form-modes";
import { Button } from "@/shared/components/ui/button";

type AuthOauthButtonsProps = {
  mode: AuthMode;
};

type AuthProvider = "telegram" | "google";

export const AuthOauthButtons = ({ mode }: AuthOauthButtonsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");
  const [activeProvider, setActiveProvider] = useState<AuthProvider | null>(null);

  const handleAuth = async (provider: AuthProvider) => {
    setActiveProvider(provider);

    try {
      await createMockSession({
        mode,
        provider,
      });

      const destination =
        nextPath && nextPath.startsWith("/") ? nextPath : "/onboarding/bot";

      router.push(destination);
      router.refresh();
    } finally {
      setActiveProvider(null);
    }
  };

  return (
    <div className="mt-7 flex w-full flex-col gap-3">
      <Button
        variant="telegram"
        className="w-full"
        disabled={activeProvider !== null}
        onClick={() => handleAuth("telegram")}
      >
        <TelegramIcon />
        {activeProvider === "telegram" ? "Подключаем Telegram..." : "Войти через Telegram"}
      </Button>
      <Button
        variant="secondary"
        className="w-full"
        disabled={activeProvider !== null}
        onClick={() => handleAuth("google")}
      >
        <GlobeIcon />
        {activeProvider === "google" ? "Подключаем Google..." : "Войти через Google"}
      </Button>
    </div>
  );
};
