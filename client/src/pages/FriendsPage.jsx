import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";
import { cn } from "@/utils/cn";
import { ROUTES } from "@/constants/routes";
import {
  useAcceptFriendRequest,
  useFriendRequests,
  useFriendsList,
  useRejectFriendRequest,
  useRemoveFriend,
} from "@/hooks/useFriends";
import { useCreateConversation } from "@/hooks/useConversations";
import FriendCard from "@/features/friends/components/FriendCard";
import RequestCard from "@/features/friends/components/RequestCard";

const TABS = [
  { key: "friends", label: "Friends" },
  { key: "requests", label: "Requests" },
];

export default function FriendsPage() {
  const [tab, setTab] = useState("friends");
  const navigate = useNavigate();

  const { data: friends, isLoading: isLoadingFriends } = useFriendsList();
  const { data: requests, isLoading: isLoadingRequests } = useFriendRequests();

  const removeFriend = useRemoveFriend();
  const acceptRequest = useAcceptFriendRequest();
  const rejectRequest = useRejectFriendRequest();
  const createConversation = useCreateConversation();

  async function handleMessage(friend) {
    await createConversation.mutateAsync(friend.id);
    navigate(ROUTES.CHAT);
  }

  const requestCount = (requests?.incoming.length ?? 0) + (requests?.outgoing.length ?? 0);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex gap-2 border-b border-surface-200">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "border-b-2 px-4 py-2 text-sm font-medium",
              tab === t.key
                ? "border-ink-950 text-ink-950"
                : "border-transparent text-ink-400 hover:text-ink-600"
            )}
          >
            {t.label}
            {t.key === "requests" && requestCount > 0 && (
              <span className="ml-1.5 rounded-full bg-brand-50 px-1.5 py-0.5 text-xs text-brand-700">
                {requestCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === "friends" ? (
        isLoadingFriends ? (
          <div className="flex h-32 items-center justify-center">
            <Spinner />
          </div>
        ) : friends?.length === 0 ? (
          <Card className="text-center text-sm text-ink-600">
            No friends yet — find people on the Discover tab.
          </Card>
        ) : (
          <div className="space-y-3">
            {friends.map((friend) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                onMessage={handleMessage}
                onRemove={(f) => removeFriend.mutate(f.id)}
                actionPending={removeFriend.isPending}
              />
            ))}
          </div>
        )
      ) : isLoadingRequests ? (
        <div className="flex h-32 items-center justify-center">
          <Spinner />
        </div>
      ) : requestCount === 0 ? (
        <Card className="text-center text-sm text-ink-600">No pending requests.</Card>
      ) : (
        <div className="space-y-3">
          {requests.incoming.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              direction="incoming"
              onAccept={(r) => acceptRequest.mutate(r.id)}
              onReject={(r) => rejectRequest.mutate(r.id)}
              actionPending={acceptRequest.isPending || rejectRequest.isPending}
            />
          ))}
          {requests.outgoing.map((request) => (
            <RequestCard key={request.id} request={request} direction="outgoing" />
          ))}
        </div>
      )}
    </div>
  );
}
