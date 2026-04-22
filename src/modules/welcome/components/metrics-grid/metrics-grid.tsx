import { metrics } from "@/modules/welcome/constants/metrics";
import { MetricCard } from "@/modules/welcome/components/metric-card";

export const MetricsGrid = () => {
  return (
    <div className="mt-7 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-3">
      {metrics.map((item) => (
        <MetricCard key={item.label} {...item} />
      ))}
    </div>
  );
};
