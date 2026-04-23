import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type ButtonVariant = "primary" | "secondary" | "telegram";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-[0_18px_40px_-26px_rgba(37,99,235,0.95)] hover:bg-accent-strong",
  secondary:
    "border border-slate-200 bg-white text-slate-950 hover:bg-slate-50",
  telegram:
    "bg-[#2AABEE] text-white shadow-[0_18px_40px_-26px_rgba(42,171,238,0.9)] hover:bg-[#229ED9]",
};

export const Button = ({
  children,
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) => {
  const baseClassName =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold duration-300 ease-out disabled:pointer-events-none disabled:opacity-60";

  return (
    <button
      type={type}
      className={cn(baseClassName, variantClassNames[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
