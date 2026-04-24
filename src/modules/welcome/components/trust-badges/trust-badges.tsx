import { useTranslations } from "next-intl";
import { TrustBadge } from "@/modules/welcome/components/trust-badge";
import { getTrustItems } from "@/modules/welcome/constants/trust-items";

export const TrustBadges = () => {
  const t = useTranslations("welcome.trust");
  const trustItems = getTrustItems(t);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
      {trustItems.map((item) => (
        <TrustBadge key={item} label={item} />
      ))}
    </div>
  );
};
