"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import type { AuthMode } from "@/modules/auth/constants/auth-form-modes";
import { createMockSession } from "@/modules/auth/api/create-mock-session";
import { authCredentialsSchema, type AuthCredentialsData } from "@/modules/auth/schemas/auth-credentials-schema";
import { EyeIcon } from "@/modules/auth/components/icons/eye-icon";
import { EyeOffIcon } from "@/modules/auth/components/icons/eye-off-icon";
import { LockIcon } from "@/modules/auth/components/icons/lock-icon";
import { MailIcon } from "@/modules/auth/components/icons/mail-icon";
import { Button } from "@/shared/components/ui/button";
import { ButtonIcon } from "@/shared/components/ui/button-icon";
import { TextField } from "@/shared/components/ui/text-field";

type AuthCredentialsFormProps = {
  mode: AuthMode;
  submitLabel: string;
};

export const AuthCredentialsForm = ({
  mode,
  submitLabel,
}: AuthCredentialsFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<AuthCredentialsData>({
    resolver: standardSchemaResolver(authCredentialsSchema(mode)),
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await createMockSession({
        mode,
        provider: "credentials",
      });

      const destination =
        nextPath && nextPath.startsWith("/") ? nextPath : "/onboarding/bot";

      router.push(destination);
      router.refresh();
    } catch (error) {
      console.error("[auth] Failed to create mock session:", error);
      setSubmitError("Не удалось выполнить временный вход");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="mt-5 flex w-full flex-col items-start gap-4 text-left"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <TextField
        {...register("email")}
        autoComplete="email"
        error={errors.email?.message}
        disabled={isSubmitting}
        label="Email"
        leadingAdornment={<MailIcon />}
        placeholder="you@example.com"
        type="email"
      />
      <TextField
        {...register("password")}
        autoComplete={mode === "login" ? "current-password" : "new-password"}
        error={errors.password?.message}
        disabled={isSubmitting}
        label="Пароль"
        leadingAdornment={<LockIcon />}
        placeholder={mode === "login" ? "Введите пароль" : "Минимум 8 символов"}
        trailingAdornment={
          <ButtonIcon
            aria-label={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
            disabled={isSubmitting}
            onClick={() => setIsPasswordVisible((current) => !current)}
          >
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </ButtonIcon>
        }
        type={isPasswordVisible ? "text" : "password"}
      />
      {submitError ? (
        <p className="-mt-1 text-sm text-red-500">{submitError}</p>
      ) : null}
      <Button type="submit" className="mt-1 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Выполняем вход..." : submitLabel}
      </Button>
    </form>
  );
};
