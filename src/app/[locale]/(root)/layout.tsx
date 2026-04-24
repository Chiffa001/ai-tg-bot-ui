import type { ReactNode } from "react";
import {
  setRequestLocaleFromParams,
  type LocaleParamsPromise,
} from "@/i18n/request-locale";
import { PageShell } from "@/shared/components/page/page-shell";

type ShellLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const ShellLayout = async ({ children, params }: ShellLayoutProps) => {
  await setRequestLocaleFromParams(params as LocaleParamsPromise);

  return <PageShell>{children}</PageShell>;
};

export default ShellLayout;
