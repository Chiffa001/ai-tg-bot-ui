import { trustItems } from "@/modules/welcome/constants/trust-items";
import { TrustBadge } from "@/modules/welcome/components/trust-badge";

export const TrustBadges = () => {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
      {trustItems.map((item) => (
        <TrustBadge key={item} label={item} />
      ))}
    </div>
  );
};
