import { features } from "@/modules/welcome/constants/features";
import { FeatureCard } from "@/modules/welcome/components/feature-card";

export const FeatureHighlights = () => {
  return (
    <div className="relative mx-auto grid w-full max-w-130 grid-cols-1 gap-3 sm:grid-cols-3">
      {features.map((item) => (
        <FeatureCard key={item.label} {...item} />
      ))}
    </div>
  );
};
