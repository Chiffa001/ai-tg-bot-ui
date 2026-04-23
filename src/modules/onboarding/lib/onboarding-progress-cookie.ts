import { ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE } from "@/modules/onboarding/constants/onboarding-cookies";

export const markBotTokenStepCompleted = () => {
  document.cookie = `${ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE}=true; Path=/; Max-Age=2592000; SameSite=Lax`;
};

export const clearBotTokenStepCompleted = () => {
  document.cookie = `${ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
};
