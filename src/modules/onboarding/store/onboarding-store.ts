import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnboardingState = {
  botToken: string;
  setBotToken: (botToken: string) => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      botToken: "",
      setBotToken: (botToken) => set({ botToken }),
    }),
    {
      name: "onboarding-store",
    },
  ),
);
