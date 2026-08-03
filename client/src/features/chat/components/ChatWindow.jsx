import { useEffect, useRef } from "react";
import { Phone, Video, MoreVertical, Circle } from "lucide-react";

import { useMessages } from "@/hooks/useMessages";
import MessageBubble from "@/features/chat/components/MessageBubble";
import MessageInput from "@/features/chat/components/MessageInput";
import Spinner from "@/components/ui/Spinner";

export default function ChatWindow({ conversation }) {
  const {
    data: messages,
    isLoading,
    sendMessage,
  } = useMessages(conversation?.id);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-surface-50 text-center">
        <div className="rounded-3xl border border-surface-200 bg-white p-8 shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50">
            <Circle
              size={26}
              className="fill-brand-700 text-brand-700"
            />
          </div>

          <h2 className="mt-6 font-display text-2xl font-semibold text-ink-950">
            Your Messages
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-ink-600">
            Select a conversation from the sidebar or
            start a new chat with one of your friends.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-surface-50">
      {/* Header */}
      <header className="border-b border-surface-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          {/* User */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={conversation.otherUser.avatarUrl}
                alt={conversation.otherUser.fullName}
                className="h-12 w-12 rounded-full border border-surface-200 object-cover"
              />

              {/* UI-only online indicator */}
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink-950">
                {conversation.otherUser.fullName}
              </h2>

              <p className="flex items-center gap-2 text-sm text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Online
              </p>
            </div>
          </div>

          {/* Actions (UI only) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-surface-200 bg-white text-ink-600 transition-all duration-200 hover:bg-brand-50 hover:text-brand-700"
            >
              <Phone size={18} />
            </button>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-surface-200 bg-white text-ink-600 transition-all duration-200 hover:bg-brand-50 hover:text-brand-700"
            >
              <Video size={18} />
            </button>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-surface-200 bg-white text-ink-600 transition-all duration-200 hover:bg-brand-50 hover:text-brand-700"
            >
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner className="h-8 w-8" />
          </div>
        ) : (
          <div className="space-y-1">
            {messages?.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={
                  message.sender.id !==
                  conversation.otherUser.id
                }
              />
            ))}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Composer */}
      <MessageInput onSend={sendMessage} />
    </div>
  );
}