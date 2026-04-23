export type OnboardingStepId = "bot" | "business" | "ai" | "test";

export type OnboardingStep = {
  description: string;
  id: OnboardingStepId;
  href: string;
  label: string;
  shortLabel: string;
};

export const onboardingSteps: readonly OnboardingStep[] = [
  {
    description: "Подключение бота",
    id: "bot",
    href: "/onboarding/bot",
    label: "Бот",
    shortLabel: "1",
  },
  {
    description: "Telegram Business",
    id: "business",
    href: "/onboarding/business",
    label: "Business",
    shortLabel: "2",
  },
  {
    description: "Настройка ИИ",
    id: "ai",
    href: "/onboarding/ai",
    label: "ИИ",
    shortLabel: "3",
  },
  {
    description: "Тест автоответа",
    id: "test",
    href: "/onboarding/test",
    label: "Тест",
    shortLabel: "4",
  },
] as const;
