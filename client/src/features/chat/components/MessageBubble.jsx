import { cn } from "@/utils/cn";

export default function MessageBubble({ message, isOwn }) {
  return (
    <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-xs rounded-2xl px-4 py-2 text-sm",
          isOwn ? "bg-ink-950 text-white" : "bg-surface-100 text-ink-950"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
