import { cn } from "@/utils/cn";

export default function ConversationListItem({ conversation, isActive, onSelect }) {
  return (
    <button
      onClick={() => onSelect(conversation)}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
        isActive ? "bg-brand-50" : "hover:bg-surface-50"
      )}
    >
      <img
        src={conversation.otherUser.avatarUrl}
        alt={conversation.otherUser.fullName}
        className="h-10 w-10 rounded-full border border-surface-200 object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink-950">
          {conversation.otherUser.fullName}
        </p>
        <p className="truncate text-xs text-ink-400">
          {conversation.lastMessage?.content ?? "Say hello"}
        </p>
      </div>
    </button>
  );
}
