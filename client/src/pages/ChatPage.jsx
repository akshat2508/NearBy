import { useEffect, useMemo, useState } from "react";
import Spinner from "@/components/ui/Spinner";
import { useConversations, useCreateConversation } from "@/hooks/useConversations";
import { useFriendsList } from "@/hooks/useFriends";
import ConversationListItem from "@/features/chat/components/ConversationListItem";
import ChatWindow from "@/features/chat/components/ChatWindow";

export default function ChatPage() {
  const { data: conversations, isLoading } = useConversations();
  const { data: friends } = useFriendsList();
  const createConversation = useCreateConversation();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!selectedId && conversations?.length) {
      setSelectedId(conversations[0].id);
    }
  }, [conversations, selectedId]);

  const selectedConversation = conversations?.find((c) => c.id === selectedId) ?? null;

  const friendsWithoutConversation = useMemo(() => {
    if (!friends) return [];
    const existingIds = new Set((conversations ?? []).map((c) => c.otherUser.id));
    return friends.filter((friend) => !existingIds.has(friend.id));
  }, [friends, conversations]);

  async function handleStartChat(e) {
    const friendId = e.target.value;
    if (!friendId) return;
    const conversation = await createConversation.mutateAsync(friendId);
    setSelectedId(conversation.id);
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-4xl overflow-hidden rounded-2xl border border-surface-200 bg-surface-0">
      <div className="flex w-72 flex-col border-r border-surface-200">
        <div className="border-b border-surface-200 p-3">
          <select
            defaultValue=""
            onChange={handleStartChat}
            className="w-full rounded-lg border border-surface-200 bg-surface-0 px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <option value="" disabled>
              Start a new chat…
            </option>
            {friendsWithoutConversation.map((friend) => (
              <option key={friend.id} value={friend.id}>
                {friend.fullName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto p-2">
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Spinner />
            </div>
          ) : conversations?.length === 0 ? (
            <p className="p-3 text-sm text-ink-400">No conversations yet.</p>
          ) : (
            conversations?.map((conversation) => (
              <ConversationListItem
                key={conversation.id}
                conversation={conversation}
                isActive={conversation.id === selectedId}
                onSelect={(c) => setSelectedId(c.id)}
              />
            ))
          )}
        </div>
      </div>

      <ChatWindow conversation={selectedConversation} />
    </div>
  );
}
