import type { NextRequest } from "next/server";
import { guardAuthRoutes } from "@/modules/auth/guards/auth-route-guard";

export function proxy(request: NextRequest) {
  return guardAuthRoutes(request);
}

export const config = {
  matcher: ["/auth/:path*", "/onboarding/:path*"],
};
