import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  className?: string;
  error?: string;
  label: string;
  leadingAdornment?: ReactNode;
  trailingAdornment?: ReactNode;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, error, label, leadingAdornment, trailingAdornment, ...props }, ref) => {
    return (
      <label className={cn("flex w-full flex-col gap-1", className)}>
        <span className="text-[13px] font-medium text-slate-950">{label}</span>
        <span
          className={cn(
            "flex items-center gap-2 rounded-xl border bg-white px-3.5 py-3 text-sm text-slate-400",
            error ? "border-red-400" : "border-slate-200",
          )}
        >
          {leadingAdornment}
          <input
            ref={ref}
            className="w-full min-w-0 border-none bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
            {...props}
          />
          {trailingAdornment}
        </span>
        <span className="min-h-4 text-xs text-red-500">{error}</span>
      </label>
    );
  },
);

TextField.displayName = "TextField";
