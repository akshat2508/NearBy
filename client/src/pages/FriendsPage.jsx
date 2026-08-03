import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserPlus,
  Search,
} from "lucide-react";

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
  {
    key: "friends",
    label: "Friends",
  },
  {
    key: "requests",
    label: "Requests",
  },
];

export default function FriendsPage() {
  const [tab, setTab] = useState("friends");

  const navigate = useNavigate();

  const {
    data: friends,
    isLoading: isLoadingFriends,
  } = useFriendsList();

  const {
    data: requests,
    isLoading: isLoadingRequests,
  } = useFriendRequests();

  const removeFriend =
    useRemoveFriend();

  const acceptRequest =
    useAcceptFriendRequest();

  const rejectRequest =
    useRejectFriendRequest();

  const createConversation =
    useCreateConversation();

  async function handleMessage(friend) {
    await createConversation.mutateAsync(
      friend.id
    );

    navigate(ROUTES.CHAT);
  }

  const requestCount =
    (requests?.incoming.length ?? 0) +
    (requests?.outgoing.length ?? 0);

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Hero */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700">
            <Users size={16} />
            Connections
          </div>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-950">
            Friends
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-ink-600">
            Manage your friends, accept new
            requests and continue your
            conversations.
          </p>
        </div>

        {/* UI Ready Search */}

        <div className="hidden w-80 lg:block">
          <div className="flex items-center gap-3 rounded-xl border border-surface-200 bg-white px-4 py-3 shadow-sm">
            <Search
              size={18}
              className="text-ink-500"
            />

            <input
              disabled
              placeholder="Search friends..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-500"
            />
          </div>
        </div>

      </div>

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-3">

        <Card className="p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-ink-600">
                Total Friends
              </p>

              <p className="mt-2 text-3xl font-semibold text-ink-950">
                {friends?.length ?? 0}
              </p>

            </div>

            <div className="rounded-2xl bg-brand-50 p-3 text-brand-700">
              <Users size={22} />
            </div>

          </div>

        </Card>

        <Card className="p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-ink-600">
                Requests
              </p>

              <p className="mt-2 text-3xl font-semibold text-ink-950">
                {requestCount}
              </p>

            </div>

            <div className="rounded-2xl bg-brand-50 p-3 text-brand-700">
              <UserPlus size={22} />
            </div>

          </div>

        </Card>

        <Card className="p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-ink-600">
                Active Tab
              </p>

              <p className="mt-2 font-medium text-brand-700 capitalize">
                {tab}
              </p>

            </div>

            <div className="h-3 w-3 rounded-full bg-brand-600" />

          </div>

        </Card>

      </div>

      {/* Tabs */}

      <div className="inline-flex rounded-2xl border border-surface-200 bg-white p-1 shadow-sm">

        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-xl px-5 py-2.5 text-sm font-medium transition-all",

              tab === t.key
                ? "bg-brand-700 text-white shadow-sm"
                : "text-ink-600 hover:bg-surface-50"
            )}
          >
            {t.label}

            {t.key === "requests" &&
              requestCount > 0 && (
                <span
                  className={cn(
                    "ml-2 rounded-full px-2 py-0.5 text-xs",

                    tab === t.key
                      ? "bg-white/20 text-white"
                      : "bg-brand-50 text-brand-700"
                  )}
                >
                  {requestCount}
                </span>
              )}
          </button>
        ))}

      </div>

      {/* Content */}

      {tab === "friends" ? (
        isLoadingFriends ? (
          <div className="flex h-48 items-center justify-center">
            <Spinner className="h-8 w-8" />
          </div>
        ) : friends?.length === 0 ? (
          <Card className="py-12 text-center">
            <p className="font-medium text-ink-950">
              No friends yet
            </p>

            <p className="mt-2 text-sm text-ink-600">
              Visit Discover to connect with
              nearby people.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {friends.map((friend) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                onMessage={handleMessage}
                onRemove={(f) =>
                  removeFriend.mutate(f.id)
                }
                actionPending={
                  removeFriend.isPending
                }
              />
            ))}
          </div>
        )
      ) : isLoadingRequests ? (
        <div className="flex h-48 items-center justify-center">
          <Spinner className="h-8 w-8" />
        </div>
      ) : requestCount === 0 ? (
        <Card className="py-12 text-center">
          <p className="font-medium text-ink-950">
            No pending requests
          </p>

          <p className="mt-2 text-sm text-ink-600">
            New requests will appear here.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">

          {requests.incoming.map(
            (request) => (
              <RequestCard
                key={request.id}
                request={request}
                direction="incoming"
                onAccept={(r) =>
                  acceptRequest.mutate(r.id)
                }
                onReject={(r) =>
                  rejectRequest.mutate(r.id)
                }
                actionPending={
                  acceptRequest.isPending ||
                  rejectRequest.isPending
                }
              />
            )
          )}

          {requests.outgoing.map(
            (request) => (
              <RequestCard
                key={request.id}
                request={request}
                direction="outgoing"
              />
            )
          )}

        </div>
      )}

    </div>
  );
}