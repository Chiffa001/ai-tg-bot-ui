import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type ButtonIconProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  "aria-label": string;
  children: ReactNode;
  className?: string;
};

export const ButtonIcon = ({ children, className, ...props }: ButtonIconProps) => {
  return (
    <button type="button" className={cn("cursor-pointer", className)} {...props}>
      {children}
    </button>
  );
};
