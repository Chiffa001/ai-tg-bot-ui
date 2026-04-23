import { BrandLogo } from "@/shared/components/brand-logo";

export const DefaultPageHeader = () => {
  return (
    <header className="flex items-center px-10 py-5">
      <BrandLogo size="sm" tone="dark" />
    </header>
  );
};
