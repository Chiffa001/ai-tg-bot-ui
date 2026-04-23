"use server";

import { cookies } from "next/headers";
import { ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE } from "@/modules/onboarding/constants/onboarding-cookies";

export async function markBotTokenStepCompleted() {
  const cookieStore = await cookies();
  cookieStore.set(ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE, "true", {
    path: "/",
    maxAge: 2592000,
    sameSite: "lax",
    httpOnly: true,
  });
}

export async function clearBotTokenStepCompleted() {
  const cookieStore = await cookies();
  cookieStore.delete(ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE);
}
