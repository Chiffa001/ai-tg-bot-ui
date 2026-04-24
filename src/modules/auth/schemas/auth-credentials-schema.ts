import { z } from "zod";
import type { useTranslations } from "next-intl";
import type { AuthMode } from "@/modules/auth/constants/auth-form-modes";

export const authCredentialsSchema = (
  mode: AuthMode,
  t: ReturnType<typeof useTranslations<"auth.validation">>,
) =>
  z.object({
    email: z.email({ error: t("invalidEmail") }),
    password:
      mode === "register"
        ? z.string().min(8, { error: t("passwordMin") })
        : z.string().min(1, { error: t("passwordRequired") }),
  });

export type AuthCredentialsData = {
  email: string;
  password: string;
};
