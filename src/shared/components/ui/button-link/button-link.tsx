import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";

type ButtonLinkVariant = "primary" | "secondary";

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className" | "href"> & {
  children: ReactNode;
  className?: string;
  href: ComponentProps<typeof Link>["href"];
  variant?: ButtonLinkVariant;
};

const variantClassNames: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-accent text-white shadow-[0_20px_50px_-26px_rgba(37,99,235,1)] hover:bg-accent-strong hover:shadow-[0_24px_54px_-28px_rgba(29,78,216,0.95)]",
  secondary:
    "border border-slate-200 bg-white text-slate-950 shadow-none hover:bg-slate-50",
};

export const ButtonLink = ({
  children,
  className,
  href,
  variant = "primary",
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold duration-300 ease-out",
        variantClassNames[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
