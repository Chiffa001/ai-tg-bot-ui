import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
};

export const PageShell = ({ children }: PageShellProps) => {
  return (
    <main className="welcome-shell flex min-h-dvh flex-1 items-start justify-center overflow-auto px-1.5 sm:px-4 lg:px-6 xl:h-dvh xl:items-center xl:overflow-hidden">
      <div className="w-full overflow-hidden rounded-4xl border border-surface-border bg-surface shadow-[0_32px_120px_-48px_rgba(15,23,42,0.45)] backdrop-blur xl:h-[min(54rem,100dvh)] xl:max-w-360">
        {children}
      </div>
    </main>
  );
};
