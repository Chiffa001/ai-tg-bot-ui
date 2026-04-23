import type { ReactNode } from "react";

type SplitPageWrapperProps = {
  left: ReactNode;
  right: ReactNode;
};

export const SplitPageWrapper = ({
  left,
  right,
}: SplitPageWrapperProps) => {
  return (
    <div className="grid w-full xl:h-full xl:grid-cols-[minmax(0,680px)_minmax(0,1fr)]">
      {left}
      {right}
    </div>
  );
};
