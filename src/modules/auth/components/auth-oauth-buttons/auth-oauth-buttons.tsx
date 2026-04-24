"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { GlobeIcon } from "@/modules/auth/components/icons/globe-icon";
import { TelegramIcon } from "@/modules/auth/components/icons/telegram-icon";
import { createMockSession } from "@/modules/auth/api/create-mock-session";
import type { AuthMode } from "@/modules/auth/constants/auth-form-modes";
import { useRouter } from "@/i18n/navigation";
import { normalizeInternalPath } from "@/i18n/routing";
import { Button } from "@/shared/components/ui/button";

type AuthOauthButtonsProps = {
  mode: AuthMode;
};

type AuthProvider = "telegram" | "google";

export const AuthOauthButtons = ({ mode }: AuthOauthButtonsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const nextPath = searchParams.get("next");
  const [activeProvider, setActiveProvider] = useState<AuthProvider | null>(null);

  const handleAuth = async (provider: AuthProvider) => {
    setActiveProvider(provider);

    try {
      await createMockSession({
        mode,
        provider,
      });

      const destination = normalizeInternalPath(nextPath ?? "");
      const safeDestination = destination ?? "/onboarding/bot";

      router.push(safeDestination);
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
        {activeProvider === "telegram"
          ? t("auth.oauth.telegramConnecting")
          : t("auth.oauth.telegram")}
      </Button>
      <Button
        variant="secondary"
        className="w-full"
        disabled={activeProvider !== null}
        onClick={() => handleAuth("google")}
      >
        <GlobeIcon />
        {activeProvider === "google"
          ? t("auth.oauth.googleConnecting")
          : t("auth.oauth.google")}
      </Button>
    </div>
  );
};
