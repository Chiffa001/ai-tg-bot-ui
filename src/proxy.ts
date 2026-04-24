import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing, getLocaleFromPathname } from "@/i18n/routing";
import { guardAuthRoutes } from "@/modules/auth/guards/auth-route-guard";

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const locale = getLocaleFromPathname(request.nextUrl.pathname);

  if (!locale) {
    return handleI18nRouting(request);
  }

  const authResponse = guardAuthRoutes(request, locale);

  if (authResponse) {
    return authResponse;
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|_next|.*\\..*).*)",
};
