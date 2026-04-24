import { z } from "zod";
import type { useTranslations } from "next-intl";

export const botTokenSchema = (t: ReturnType<typeof useTranslations<"onboarding.bot">>) =>
  z.object({
    token: z
      .string()
      .min(1, { error: t("validation.required") })
      .regex(/^\d+:[A-Za-z0-9_-]{35,}$/, {
        error: t("validation.invalid"),
      }),
  });

export type BotTokenFormData = z.infer<ReturnType<typeof botTokenSchema>>;
