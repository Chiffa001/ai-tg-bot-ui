import {
  authVisualModes,
  authVisualStats,
  type AuthVisualMode,
} from "@/modules/auth/constants/auth-visual-modes";
import { AuthStat } from "@/modules/auth/components/auth-stat";
import { BrandLogo } from "@/shared/components/brand-logo";
import { VisualSidePanel } from "@/shared/components/page/visual-side-panel";

type AuthVisualSectionProps = {
  mode: AuthVisualMode;
};

export const AuthVisualSection = ({ mode }: AuthVisualSectionProps) => {
  const content = authVisualModes[mode];

  return (
    <VisualSidePanel className="items-center gap-10 px-8 py-12 lg:px-14 xl:px-15 xl:py-12">
      <BrandLogo
        size={content.logoSize}
        tone="light"
        className="justify-center"
      />
      {content.type === "quote" ? (
        <div className="flex w-full max-w-120 flex-col items-center gap-5 text-center">
          <p className="text-xl leading-9 font-medium text-white sm:text-[22px]">
            {content.quote}
          </p>
          <p className="text-sm text-slate-400">{content.author}</p>
        </div>
      ) : (
        <div className="flex w-full max-w-140 flex-col items-center gap-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-[44px]">
            {content.heading}
          </h2>
          <p className="text-lg text-slate-400">{content.subtitle}</p>
        </div>
      )}
      <div
        className={`flex items-center justify-center ${content.statsGapClassName}`}
      >
        {authVisualStats.map((item) => (
          <AuthStat key={item.label} {...item} />
        ))}
      </div>
    </VisualSidePanel>
  );
};
