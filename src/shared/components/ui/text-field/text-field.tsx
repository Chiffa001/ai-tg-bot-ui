import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  className?: string;
  label: string;
  leadingAdornment?: ReactNode;
  trailingAdornment?: ReactNode;
};

export const TextField = ({
  className,
  label,
  leadingAdornment,
  trailingAdornment,
  ...props
}: TextFieldProps) => {
  return (
    <label className={cn("flex w-full flex-col gap-1.5", className)}>
      <span className="text-[13px] font-medium text-slate-950">{label}</span>
      <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-400">
        {leadingAdornment}
        <input
          className="w-full min-w-0 border-none bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
          {...props}
        />
        {trailingAdornment}
      </span>
    </label>
  );
};
