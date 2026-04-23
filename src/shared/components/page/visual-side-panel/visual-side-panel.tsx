import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type VisualSidePanelProps = {
  children: ReactNode;
  className?: string;
};

export const VisualSidePanel = ({
  children,
  className,
}: VisualSidePanelProps) => {
  return (
    <section
      className={cn(
        "visual-grid relative flex flex-col justify-center gap-8 overflow-hidden bg-panel-dark px-6 py-10 text-white sm:px-8 sm:py-12 lg:px-12 xl:px-15 xl:py-10",
        className,
      )}
    >
      {children}
    </section>
  );
};
