import { useTranslations } from "next-intl";
import { FeatureCard } from "@/modules/welcome/components/feature-card";
import { getFeatures } from "@/modules/welcome/constants/features";

export const FeatureHighlights = () => {
  const t = useTranslations("welcome.features");
  const features = getFeatures(t);

  return (
    <div className="relative mx-auto grid w-full max-w-130 grid-cols-1 gap-3 sm:grid-cols-3">
      {features.map((item) => (
        <FeatureCard key={item.label} {...item} />
      ))}
    </div>
  );
};
