import type { ReactNode } from "react";

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
  const baseClassName = `mx-auto flex w-full flex-col items-center text-center ${sizeClassNames[size]}`;

  return <div className={className ? `${baseClassName} ${className}` : baseClassName}>{children}</div>;
};
