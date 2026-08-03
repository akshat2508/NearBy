import { useEffect, useMemo, useState } from "react";
import { MessageSquarePlus, Search } from "lucide-react";

import Spinner from "@/components/ui/Spinner";
import Card from "@/components/ui/Card";

import {
  useConversations,
  useCreateConversation,
} from "@/hooks/useConversations";

import { useFriendsList } from "@/hooks/useFriends";

import ConversationListItem from "@/features/chat/components/ConversationListItem";
import ChatWindow from "@/features/chat/components/ChatWindow";

export default function ChatPage() {
  const { data: conversations, isLoading } =
    useConversations();

  const { data: friends } = useFriendsList();

  const createConversation =
    useCreateConversation();

  const [selectedId, setSelectedId] =
    useState(null);

  useEffect(() => {
    if (!selectedId && conversations?.length) {
      setSelectedId(conversations[0].id);
    }
  }, [conversations, selectedId]);

  const selectedConversation =
    conversations?.find(
      (c) => c.id === selectedId
    ) ?? null;

  const friendsWithoutConversation =
    useMemo(() => {
      if (!friends) return [];

      const existingIds = new Set(
        (conversations ?? []).map(
          (c) => c.otherUser.id
        )
      );

      return friends.filter(
        (friend) =>
          !existingIds.has(friend.id)
      );
    }, [friends, conversations]);

  async function handleStartChat(e) {
    const friendId = e.target.value;

    if (!friendId) return;

    const conversation =
      await createConversation.mutateAsync(
        friendId
      );

    setSelectedId(conversation.id);
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-10rem)] max-w-7xl overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-sm">
      {/* Sidebar */}
      <aside className="flex w-[360px] shrink-0 flex-col border-r border-surface-200 bg-surface-50">
        {/* Header */}
        <div className="border-b border-surface-200 p-6">
          <h1 className="font-display text-2xl font-semibold text-ink-950">
            Messages
          </h1>

          <p className="mt-1 text-sm text-ink-600">
            Stay connected with your friends.
          </p>

          {/* Search (UI Ready) */}
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-surface-200 bg-white px-4 py-3">
            <Search
              size={18}
              className="text-ink-500"
            />

            <input
              disabled
              placeholder="Search conversations"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-500"
            />
          </div>

          {/* New Chat */}
          <div className="mt-4">
            <div className="relative">
              <MessageSquarePlus
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-700"
              />

              <select
                defaultValue=""
                onChange={handleStartChat}
                className="
                  w-full
                  appearance-none
                  rounded-xl
                  border
                  border-surface-200
                  bg-white
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  font-medium
                  focus:outline-none
                  focus:ring-2
                  focus:ring-brand-600
                "
              >
                <option value="" disabled>
                  Start a new conversation
                </option>

                {friendsWithoutConversation.map(
                  (friend) => (
                    <option
                      key={friend.id}
                      value={friend.id}
                    >
                      {friend.fullName}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Spinner className="h-8 w-8" />
            </div>
          ) : conversations?.length === 0 ? (
            <Card className="py-10 text-center">
              <p className="font-medium text-ink-950">
                No conversations yet
              </p>

              <p className="mt-2 text-sm text-ink-600">
                Start chatting with one of
                your friends.
              </p>
            </Card>
          ) : (
            conversations.map(
              (conversation) => (
                <ConversationListItem
                  key={conversation.id}
                  conversation={
                    conversation
                  }
                  isActive={
                    conversation.id ===
                    selectedId
                  }
                  onSelect={(c) =>
                    setSelectedId(c.id)
                  }
                />
              )
            )
          )}
        </div>
      </aside>

      {/* Chat */}
      <ChatWindow
        conversation={
          selectedConversation
        }
      />
    </div>
  );
}