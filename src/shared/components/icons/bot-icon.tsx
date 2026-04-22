type BotIconProps = {
  className?: string;
};

export const BotIcon = ({ className = "h-5 w-5" }: BotIconProps) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="7" width="16" height="10" rx="3" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      <circle cx="10" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M9 15h6" />
    </svg>
  );
};
