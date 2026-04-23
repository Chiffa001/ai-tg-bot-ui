import { z } from "zod";
import type { AuthMode } from "@/modules/auth/constants/auth-form-modes";

export const authCredentialsSchema = (mode: AuthMode) =>
  z.object({
    email: z.email({ error: "Некорректный email" }),
    password:
      mode === "register"
        ? z.string().min(8, { error: "Минимум 8 символов" })
        : z.string().min(1, { error: "Введите пароль" }),
  });

export type AuthCredentialsData = {
  email: string;
  password: string;
};
