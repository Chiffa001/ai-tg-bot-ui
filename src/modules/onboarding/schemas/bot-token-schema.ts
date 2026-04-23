import { z } from "zod";

export const botTokenSchema = z.object({
  token: z
    .string()
    .min(1, { error: "Введите токен бота" })
    .regex(/^\d+:[A-Za-z0-9_-]{35,}$/, {
      error: "Токен недействителен",
    }),
});

export type BotTokenFormData = z.infer<typeof botTokenSchema>;
