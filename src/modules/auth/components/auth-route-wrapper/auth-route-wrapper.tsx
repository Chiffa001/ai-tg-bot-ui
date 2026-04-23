import type { ReactNode } from "react";
import { AuthVisualSection } from "@/modules/auth/components/auth-visual-section";
import type { AuthVisualMode } from "@/modules/auth/constants/auth-visual-modes";
import { SplitPageWrapper } from "@/shared/components/page/split-page-wrapper";

type AuthRouteWrapperProps = {
  children: ReactNode;
  mode: AuthVisualMode;
};

export const AuthRouteWrapper = ({
  children,
  mode,
}: AuthRouteWrapperProps) => {
  return (
    <SplitPageWrapper
      left={<AuthVisualSection mode={mode} />}
      right={children}
    />
  );
};
