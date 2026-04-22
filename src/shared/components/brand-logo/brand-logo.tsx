import { BotIcon } from "@/shared/components/icons/bot-icon";

type BrandLogoTone = "dark" | "light";
type BrandLogoSize = "sm" | "md" | "lg";

type BrandLogoProps = {
  size?: BrandLogoSize;
  tone?: BrandLogoTone;
};

const logoSizeClassNames: Record<
  BrandLogoSize,
  { container: string; icon: string }
> = {
  sm: {
    container: "h-9 w-9 rounded-lg",
    icon: "h-[1.375rem] w-[1.375rem]",
  },
  md: {
    container: "h-10 w-10 rounded-xl",
    icon: "h-5 w-5",
  },
  lg: {
    container: "h-11 w-11 rounded-xl",
    icon: "h-6.5 w-6.5",
  },
};

const brandSizeClassNames: Record<BrandLogoSize, { gap: string; text: string }> = {
  sm: {
    gap: "gap-2.5",
    text: "text-lg sm:text-xl",
  },
  md: {
    gap: "gap-3",
    text: "text-xl sm:text-2xl",
  },
  lg: {
    gap: "gap-3",
    text: "text-2xl sm:text-[1.75rem]",
  },
};

const toneClassNames: Record<BrandLogoTone, string> = {
  dark: "text-slate-950",
  light: "text-white",
};

export const BrandLogo = ({ size = "sm", tone = "dark" }: BrandLogoProps) => {
  const logoSizeClasses = logoSizeClassNames[size];
  const brandSizeClasses = brandSizeClassNames[size];
  const toneClassName = toneClassNames[tone];

  return (
    <div className={`flex items-center ${brandSizeClasses.gap}`}>
      <span
        className={`flex items-center justify-center bg-accent text-white shadow-[0_16px_32px_-18px_rgba(37,99,235,0.9)] ${logoSizeClasses.container}`}
      >
        <BotIcon className={logoSizeClasses.icon} />
      </span>
      <span
        className={`font-extrabold tracking-tight ${toneClassName} ${brandSizeClasses.text}`}
      >
        TeleBot AI
      </span>
    </div>
  );
};
