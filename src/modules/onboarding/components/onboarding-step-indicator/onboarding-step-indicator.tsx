"use client";

import { usePathname } from "next/navigation";
import { onboardingSteps } from "@/modules/onboarding/constants/onboarding-steps";
import { getActiveOnboardingStepIndex } from "@/modules/onboarding/lib/onboarding-step-helpers";
import { cn } from "@/shared/lib/cn";

export const OnboardingStepIndicator = () => {
  const pathname = usePathname();
  const currentIndex = getActiveOnboardingStepIndex(pathname);

  return (
    <nav
      aria-label="Прогресс онбординга"
      className="flex w-full items-center gap-3"
    >
      {onboardingSteps.map((step, index) => {
        const isCurrent = index === currentIndex;
        const isComplete = index < currentIndex;

        return (
          <div key={step.id} className="flex min-w-0 flex-1 items-center gap-3">
            <div
              className="flex shrink-0 items-center gap-2"
              aria-current={isCurrent ? "step" : undefined}
            >
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border text-[13px] font-semibold transition-colors duration-500 ease-out",
                  isComplete && "border-success bg-success text-white",
                  isCurrent && "border-accent bg-accent text-white",
                  !isCurrent &&
                    !isComplete &&
                    "border-slate-200 bg-transparent text-slate-500",
                )}
              >
                {isComplete ? "✓" : step.shortLabel}
              </span>
              <span
                className={cn(
                  "text-[13px] font-medium transition-colors duration-500 ease-out",
                  isComplete && "text-success",
                  isCurrent && "text-accent",
                  !isCurrent && !isComplete && "text-slate-500",
                )}
              >
                {step.label}
              </span>
            </div>

            {index < onboardingSteps.length - 1 ? (
              <span
                className="relative h-px min-w-3 flex-1 overflow-hidden bg-slate-200"
                aria-hidden="true"
              >
                <span
                  className={cn(
                    "absolute inset-y-0 left-0 w-full origin-left bg-success transition-transform duration-700 ease-out",
                    index < currentIndex ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </span>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
};
