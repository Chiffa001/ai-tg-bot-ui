import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type ContentColumnSize = "sm" | "md";

type ContentColumnProps = {
  children: ReactNode;
  className?: string;
  size?: ContentColumnSize;
};

const sizeClassNames: Record<ContentColumnSize, string> = {
  sm: "max-w-100",
  md: "max-w-110",
};

export const ContentColumn = ({
  children,
  className,
  size = "md",
}: ContentColumnProps) => {
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col items-center text-center",
        sizeClassNames[size],
        className,
      )}
    >
      {children}
    </div>
  );
};
