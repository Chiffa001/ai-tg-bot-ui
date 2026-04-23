type OnboardingStepHeaderProps = {
  description: string;
  title: string;
};

export const OnboardingStepHeader = ({
  description,
  title,
}: OnboardingStepHeaderProps) => {
  return (
    <div className="flex flex-col gap-2 text-left">
      <h1 className="text-[2rem] leading-tight font-bold tracking-tight text-slate-950">
        {title}
      </h1>
      <p className="text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
};
