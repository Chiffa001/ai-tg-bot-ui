export type ChatMessage = {
  avatar: string;
  align: "start" | "end";
  bubbleClassName: string;
  text: string;
};

type ChatMessageRowProps = ChatMessage;

export const ChatMessageRow = ({
  avatar,
  align,
  bubbleClassName,
  text,
}: ChatMessageRowProps) => {
  return (
    <div
      className={`flex items-start gap-2.5 ${align === "end" ? "justify-end" : ""}`}
    >
      {align === "start" ? (
        <>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs">
            {avatar}
          </div>
          <div className={bubbleClassName}>{text}</div>
        </>
      ) : (
        <>
          <div className={bubbleClassName}>{text}</div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs">
            {avatar}
          </div>
        </>
      )}
    </div>
  );
};
