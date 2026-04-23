"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AuthMode } from "@/modules/auth/constants/auth-form-modes";
import { authCredentialsSchema, type AuthCredentialsData } from "@/modules/auth/lib/auth-schemas";
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

  const { register, handleSubmit, formState: { errors } } = useForm<AuthCredentialsData>({
    resolver: zodResolver(authCredentialsSchema(mode)),
  });

  const onSubmit = (data: AuthCredentialsData) => {
    console.log(data);
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
        label="Email"
        leadingAdornment={<MailIcon />}
        placeholder="you@example.com"
        type="email"
      />
      <TextField
        {...register("password")}
        autoComplete={mode === "login" ? "current-password" : "new-password"}
        error={errors.password?.message}
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
      <Button type="submit" className="mt-1 w-full">{submitLabel}</Button>
    </form>
  );
};
