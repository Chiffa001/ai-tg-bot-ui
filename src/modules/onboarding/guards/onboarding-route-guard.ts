import type { NextRequest } from "next/server";
import { stripLocaleFromPathname } from "@/i18n/routing";
import { ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE } from "@/modules/onboarding/constants/onboarding-cookies";

const onboardingRouteRequirements = [
  {
    fallbackPath: "/onboarding/bot",
    pathPrefix: "/onboarding/business",
    requiredCookie: ONBOARDING_BOT_TOKEN_COMPLETED_COOKIE,
  },
] as const;

const getSkippedStepPath = (
  pathname: string,
  hasCookie: (cookieName: string) => boolean,
) => {
  const unmetRequirement = onboardingRouteRequirements.find((requirement) => {
    if (!pathname.startsWith(requirement.pathPrefix)) {
      return false;
    }

    return !hasCookie(requirement.requiredCookie);
  });

  return unmetRequirement?.fallbackPath;
};

export const getSkippedOnboardingStepPath = (request: NextRequest) => {
  return getSkippedStepPath(
    stripLocaleFromPathname(request.nextUrl.pathname),
    (cookieName) => Boolean(request.cookies.get(cookieName)?.value),
  );
};

export const getSkippedOnboardingStepPathForPath = (
  request: NextRequest,
  pathname: string,
) => {
  return getSkippedStepPath(pathname, (cookieName) =>
    Boolean(request.cookies.get(cookieName)?.value),
  );
};
