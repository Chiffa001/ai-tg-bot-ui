import type { ReactNode } from "react";

type DefaultPageWrapperProps = {
  children: ReactNode;
};

export const DefaultPageWrapper = ({ children }: DefaultPageWrapperProps) => {
  return <div className="flex min-h-dvh flex-col">{children}</div>;
};
