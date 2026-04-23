import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className" | "href"> & {
  children: ReactNode;
  className?: string;
  href: ComponentProps<typeof Link>["href"];
};

export const ButtonLink = ({
  children,
  className,
  href,
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-white shadow-[0_20px_50px_-26px_rgba(37,99,235,1)] duration-300 ease-out hover:bg-accent-strong hover:shadow-[0_24px_54px_-28px_rgba(29,78,216,0.95)]",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
