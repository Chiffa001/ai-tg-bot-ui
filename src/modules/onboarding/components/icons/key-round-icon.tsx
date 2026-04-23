import type { SVGProps } from "react";

export const KeyRoundIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="8.5" cy="12.5" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12.2 12.5h7.3m-2.2 0v-2.3m-2.7 2.3V10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
