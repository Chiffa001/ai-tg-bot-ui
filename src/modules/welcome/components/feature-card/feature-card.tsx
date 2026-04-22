type FeatureCardProps = {
  icon: string;
  label: string;
};

export const FeatureCard = ({ icon, label }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/8 bg-white/3 px-3 py-4 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/14 text-xl">
        {icon}
      </div>
      <p className="text-xs font-medium text-slate-300 sm:text-sm">{label}</p>
    </div>
  );
};
