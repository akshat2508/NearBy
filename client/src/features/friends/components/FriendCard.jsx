import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  MessageCircle,
  UserMinus,
  Circle,
  Sparkles,
} from "lucide-react";

export default function FriendCard({
  friend,
  onMessage,
  onRemove,
  actionPending,
}) {
  const compatibility =
    friend.compatibility ??
    92;

  return (
    <Card className="group p-5 hover:border-brand-100">
      <div className="flex items-start justify-between gap-5">
        {/* Left */}
        <div className="flex min-w-0 flex-1 gap-4">
          <div className="relative">
            <img
              src={friend.avatarUrl}
              alt={friend.fullName}
              className="h-16 w-16 rounded-2xl border border-surface-200 object-cover"
            />

            {/* UI-only online indicator */}
            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-display text-lg font-semibold text-ink-950">
                {friend.fullName}
              </h3>

              <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                Online
              </span>
            </div>

            {friend.bio && (
              <p className="mt-2 text-sm leading-6 text-ink-600">
                {friend.bio}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-brand-700">
                <Sparkles size={15} />
                <span>{compatibility}% Compatible</span>
              </div>

              <div className="flex items-center gap-1.5 text-green-600">
                <Circle
                  size={10}
                  className="fill-current"
                />
                <span>Active now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex shrink-0 gap-2">
          <Button
            variant="secondary"
            onClick={() => onMessage(friend)}
          >
            <MessageCircle size={16} />
            Message
          </Button>

          <Button
            variant="outline"
            disabled={actionPending}
            onClick={() => onRemove(friend)}
          >
            <UserMinus size={16} />
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
}