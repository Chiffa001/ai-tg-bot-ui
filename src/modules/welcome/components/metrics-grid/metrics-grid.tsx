import { useTranslations } from "next-intl";
import { MetricCard } from "@/modules/welcome/components/metric-card";
import { getMetrics } from "@/modules/welcome/constants/metrics";

export const MetricsGrid = () => {
  const t = useTranslations("welcome.metrics");
  const metrics = getMetrics(t);

  return (
    <div className="mt-7 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-3">
      {metrics.map((item) => (
        <MetricCard key={item.label} {...item} />
      ))}
    </div>
  );
};
