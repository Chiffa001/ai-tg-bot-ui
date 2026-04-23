import { useEffect } from "react";

type UseEscapeListenerOptions = {
  enabled?: boolean;
  onEscapeAction: () => void;
};

export const useEscapeListener = ({
  enabled = true,
  onEscapeAction,
}: UseEscapeListenerOptions) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscapeAction();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [enabled, onEscapeAction]);
};
