import { LeftVisualSection } from "@/modules/welcome/components/left-visual-section";
import { RightContentSection } from "@/modules/welcome/components/right-content-section";

const Welcome = () => {
  return (
    <main className="welcome-shell flex h-dvh flex-1 items-center justify-center overflow-hidden px-3 sm:px-4 lg:px-6">
      <div className="h-full w-full overflow-hidden rounded-4xl border border-surface-border bg-surface shadow-[0_32px_120px_-48px_rgba(15,23,42,0.45)] backdrop-blur xl:max-w-360 xl:h-[min(54rem,100dvh)]">
        <div className="grid h-full w-full xl:grid-cols-[minmax(0,680px)_minmax(0,1fr)]">
          <LeftVisualSection />
          <RightContentSection />
        </div>
      </div>
    </main>
  );
};

export default Welcome;
