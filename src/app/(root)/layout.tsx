import type { ReactNode } from "react";
import { PageShell } from "@/shared/components/page/page-shell";

type ShellLayoutProps = {
  children: ReactNode;
};

const ShellLayout = ({ children }: ShellLayoutProps) => {
  return <PageShell>{children}</PageShell>;
};

export default ShellLayout;
