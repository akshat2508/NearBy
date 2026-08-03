import { MessageCircle, CheckCheck } from "lucide-react";
import { cn } from "@/utils/cn";

export default function ConversationListItem({
  conversation,
  isActive,
  onSelect,
}) {
  return (
    <button
      onClick={() => onSelect(conversation)}
      className={cn(
        "group flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all duration-200",
        isActive
          ? "border-brand-100 bg-brand-50 shadow-sm"
          : "border-transparent hover:border-surface-200 hover:bg-white hover:shadow-sm"
      )}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={conversation.otherUser.avatarUrl}
          alt={conversation.otherUser.fullName}
          className="h-12 w-12 rounded-full border border-surface-200 object-cover"
        />

        {/* Online indicator (UI only) */}
        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
      </div>

      {/* Conversation */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate text-sm font-semibold text-ink-950">
            {conversation.otherUser.fullName}
          </h3>

          {/* Placeholder timestamp until backend provides one */}
          <span className="text-xs text-ink-400">
            Now
          </span>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <MessageCircle
            size={14}
            className="text-ink-400"
          />

          <p className="truncate text-xs text-ink-600">
            {conversation.lastMessage?.content ??
              "Start the conversation"}
          </p>
        </div>
      </div>

      {/* Read indicator */}
      <div className="flex shrink-0 items-center">
        {isActive ? (
          <div className="rounded-full bg-brand-100 p-1.5">
            <CheckCheck
              size={14}
              className="text-brand-700"
            />
          </div>
        ) : (
          <div className="h-2.5 w-2.5 rounded-full bg-brand-500" />
        )}
      </div>
    </button>
  );
}