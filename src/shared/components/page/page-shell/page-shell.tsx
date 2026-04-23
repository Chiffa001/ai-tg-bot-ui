import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
};

export const PageShell = ({ children }: PageShellProps) => {
  return (
    <main className="welcome-shell flex h-dvh flex-1 items-center justify-center overflow-hidden px-3 sm:px-4 lg:px-6">
      <div className="h-full w-full overflow-hidden rounded-4xl border border-surface-border bg-surface shadow-[0_32px_120px_-48px_rgba(15,23,42,0.45)] backdrop-blur xl:h-[min(54rem,100dvh)] xl:max-w-360">
        {children}
      </div>
    </main>
  );
};
