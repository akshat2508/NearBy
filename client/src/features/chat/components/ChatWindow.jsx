import { useEffect, useRef } from "react";
import { useMessages } from "@/hooks/useMessages";
import MessageBubble from "@/features/chat/components/MessageBubble";
import MessageInput from "@/features/chat/components/MessageInput";
import Spinner from "@/components/ui/Spinner";

export default function ChatWindow({ conversation }) {
  const { data: messages, isLoading, sendMessage } = useMessages(conversation?.id);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-ink-400">
        Select a conversation to start chatting.
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-3 border-b border-surface-200 px-4 py-3">
        <img
          src={conversation.otherUser.avatarUrl}
          alt={conversation.otherUser.fullName}
          className="h-9 w-9 rounded-full border border-surface-200 object-cover"
        />
        <p className="font-medium text-ink-950">{conversation.otherUser.fullName}</p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          messages?.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.sender.id !== conversation.otherUser.id}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={sendMessage} />
    </div>
  );
}
