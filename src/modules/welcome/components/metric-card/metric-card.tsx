type MetricCardProps = {
  value: string;
  label: string;
};

export const MetricCard = ({ value, label }: MetricCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-3.5 py-4 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.4)]">
      <div className="text-xl font-extrabold tracking-tight text-slate-950">
        {value}
      </div>
      <p className="mt-1.5 text-xs leading-5 text-muted sm:text-sm">{label}</p>
    </div>
  );
};
