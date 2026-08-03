import { CheckCheck } from "lucide-react";
import { cn } from "@/utils/cn";

export default function MessageBubble({ message, isOwn }) {
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-3xl px-4 py-3 shadow-sm transition-all duration-200",

          isOwn
            ? "rounded-br-lg bg-yellow-300 font-[600] text-black"
            : "rounded-bl-lg border border-surface-200 bg-white text-white"
        )}
      >
        <p className="whitespace-pre-wrap break-words text-sm leading-6">
          {message.content}
        </p>

        <div
          className={cn(
            "mt-2 flex items-center justify-end gap-1 text-[11px]",

            isOwn
              ? "text-white/70"
              : "text-ink-400"
          )}
        >
          {/* Placeholder until backend provides timestamps */}
          <span>Now</span>

          {isOwn && (
            <CheckCheck
              size={13}
              className="opacity-80 size-6 text-white"
            />
          )}
        </div>
      </div>
    </div>
  );
}