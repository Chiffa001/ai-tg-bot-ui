import type { ReactNode } from "react";

type VisualSidePanelProps = {
  children: ReactNode;
  className?: string;
};

export const VisualSidePanel = ({
  children,
  className,
}: VisualSidePanelProps) => {
  const baseClassName =
    "visual-grid relative flex flex-col justify-center gap-8 overflow-hidden bg-panel-dark px-6 py-10 text-white sm:px-8 sm:py-12 lg:px-12 xl:px-15 xl:py-10";

  return (
    <section className={className ? `${baseClassName} ${className}` : baseClassName}>
      {children}
    </section>
  );
};
