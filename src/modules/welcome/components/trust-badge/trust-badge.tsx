type TrustBadgeProps = {
  label: string;
};

export const TrustBadge = ({ label }: TrustBadgeProps) => {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-muted sm:text-sm">
      <span className="h-2 w-2 rounded-full bg-success" />
      {label}
    </div>
  );
};
