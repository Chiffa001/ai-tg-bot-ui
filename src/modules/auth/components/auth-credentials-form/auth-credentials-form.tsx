"use client";

import { useState } from "react";
import type { AuthMode } from "@/modules/auth/constants/auth-form-modes";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <form className="mt-5 flex w-full flex-col items-start gap-4 text-left">
      <TextField
        autoComplete="email"
        label="Email"
        leadingAdornment={<MailIcon />}
        placeholder="you@example.com"
        type="email"
      />
      <TextField
        autoComplete={mode === "login" ? "current-password" : "new-password"}
        label="Пароль"
        leadingAdornment={<LockIcon />}
        placeholder={mode === "login" ? "Введите пароль" : "Минимум 8 символов"}
        trailingAdornment={
          <ButtonIcon
            aria-label={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
            onClick={() => setIsPasswordVisible((current) => !current)}
          >
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </ButtonIcon>
        }
        type={isPasswordVisible ? "text" : "password"}
      />
      <Button className="mt-1 w-full">{submitLabel}</Button>
    </form>
  );
};
