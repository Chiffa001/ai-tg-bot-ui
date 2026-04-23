type AuthStatProps = {
  label: string;
  value: string;
};

export const AuthStat = ({ label, value }: AuthStatProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-3xl font-bold tracking-tight text-accent">
        {value}
      </span>
      <span className="text-sm text-slate-400">{label}</span>
    </div>
  );
};
