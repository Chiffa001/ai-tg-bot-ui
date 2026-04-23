import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type ContentPanelProps = {
  children: ReactNode;
  className?: string;
};

export const ContentPanel = ({ children, className }: ContentPanelProps) => {
  return (
    <section
      className={cn(
        "flex items-center bg-zinc-50 px-6 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16 xl:py-10",
        className,
      )}
    >
      {children}
    </section>
  );
};
