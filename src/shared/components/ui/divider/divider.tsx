import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type DividerProps = {
  children?: ReactNode;
  className?: string;
};

const lineClassName = "h-px flex-1 bg-slate-200";

export const Divider = ({ children, className }: DividerProps) => {
  return (
    <div className={cn("flex w-full items-center gap-3", className)}>
      <div className={lineClassName} />
      {children}
      <div className={lineClassName} />
    </div>
  );
};
