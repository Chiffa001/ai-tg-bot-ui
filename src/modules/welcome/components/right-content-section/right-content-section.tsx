import { MetricsGrid } from "@/modules/welcome/components/metrics-grid";
import { TrustBadges } from "@/modules/welcome/components/trust-badges";
import { WelcomeCta } from "@/modules/welcome/components/welcome-cta";
import { WelcomeHero } from "@/modules/welcome/components/welcome-hero";
import { BrandLogo } from "@/shared/components/brand-logo";
import { ContentColumn } from "@/shared/components/content/content-column";
import { ContentPanel } from "@/shared/components/content/content-panel";

export const RightContentSection = () => {
  return (
    <ContentPanel>
      <ContentColumn size="md">
        <BrandLogo size="sm" tone="dark" />
        <WelcomeHero />
        <WelcomeCta />
        <TrustBadges />
        <MetricsGrid />
      </ContentColumn>
    </ContentPanel>
  );
};
