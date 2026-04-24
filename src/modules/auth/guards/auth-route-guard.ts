import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  localizePathname,
  normalizeInternalPath,
  stripLocaleFromPathname,
  type AppLocale,
} from "@/i18n/routing";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/modules/auth/constants/auth-cookies";
import {
  getSkippedOnboardingStepPath,
  getSkippedOnboardingStepPathForPath,
} from "@/modules/onboarding/guards/onboarding-route-guard";

const DEFAULT_AUTHENTICATED_PATH = "/onboarding/bot";
const LOGIN_PATH = "/auth/login";

const protectedPathPrefixes = ["/onboarding"] as const;
const guestOnlyPathPrefixes = ["/auth"] as const;

const hasAuthCookies = (request: NextRequest) => {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  return Boolean(accessToken && refreshToken);
};

const hasAuthHeaders = (request: NextRequest) => {
  const authorization = request.headers.get("authorization");
  const refreshToken = request.headers.get("x-refresh-token");

  return Boolean(authorization?.startsWith("Bearer ") && refreshToken);
};

const isAuthorized = (request: NextRequest) => {
  return hasAuthCookies(request) || hasAuthHeaders(request);
};

const startsWithAny = (pathname: string, prefixes: readonly string[]) => {
  return prefixes.some((prefix) => pathname.startsWith(prefix));
};

const getSafeAuthenticatedPath = (request: NextRequest) => {
  const nextPath = normalizeInternalPath(
    request.nextUrl.searchParams.get("next") ?? "",
  );

  if (!nextPath || startsWithAny(nextPath, guestOnlyPathPrefixes)) {
    return DEFAULT_AUTHENTICATED_PATH;
  }

  const skippedStepPath = getSkippedOnboardingStepPathForPath(request, nextPath);

  if (skippedStepPath) {
    return skippedStepPath;
  }

  return nextPath;
};

const getLocalizedUrl = (
  request: NextRequest,
  locale: AppLocale,
  pathname: string,
) => {
  return new URL(localizePathname(pathname, locale), request.url);
};

export const guardAuthRoutes = (request: NextRequest, locale: AppLocale) => {
  const { search } = request.nextUrl;
  const pathname = stripLocaleFromPathname(request.nextUrl.pathname);
  const authorized = isAuthorized(request);

  if (startsWithAny(pathname, protectedPathPrefixes) && !authorized) {
    const loginUrl = getLocalizedUrl(request, locale, LOGIN_PATH);

    loginUrl.searchParams.set("next", `${pathname}${search}`);

    return NextResponse.redirect(loginUrl);
  }

  if (startsWithAny(pathname, protectedPathPrefixes) && authorized) {
    const skippedStepPath = getSkippedOnboardingStepPath(request);

    if (skippedStepPath && skippedStepPath !== pathname) {
      return NextResponse.redirect(
        getLocalizedUrl(request, locale, skippedStepPath),
      );
    }
  }

  if (startsWithAny(pathname, guestOnlyPathPrefixes) && authorized) {
    return NextResponse.redirect(
      getLocalizedUrl(request, locale, getSafeAuthenticatedPath(request)),
    );
  }

  return null;
};
