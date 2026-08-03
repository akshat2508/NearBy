import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  MapPin,
  Sparkles,
  CheckCircle2,
  Clock3,
  UserPlus,
} from "lucide-react";

const ACTION_BY_STATUS = {
  none: {
    label: "Connect",
    variant: "primary",
    disabled: false,
    icon: UserPlus,
  },
  pending_sent: {
    label: "Requested",
    variant: "outline",
    disabled: true,
    icon: Clock3,
  },
  pending_received: {
    label: "Accept",
    variant: "primary",
    disabled: false,
    icon: CheckCircle2,
  },
  friends: {
    label: "Friends",
    variant: "secondary",
    disabled: true,
    icon: CheckCircle2,
  },
};

export default function NearbyUserCard({
  user,
  onAction,
  actionPending,
}) {
  const action =
    ACTION_BY_STATUS[user.friendStatus] ??
    ACTION_BY_STATUS.none;

  const ActionIcon = action.icon;

  // Temporary compatibility score until backend provides one.
  const compatibility =
    user.compatibility ??
    Math.max(
      70,
      100 - Math.round(Number(user.distanceKm) * 3)
    );

  return (
    <Card className="group p-5 hover:border-brand-100">
      <div className="flex items-start justify-between gap-5">
        {/* Left */}
        <div className="flex min-w-0 flex-1 gap-4">
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="h-16 w-16 rounded-2xl border border-surface-200 object-cover"
            />

            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-display text-lg font-semibold text-ink-950">
                {user.fullName}
              </h3>

              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                Active
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-ink-600">
              <div className="flex items-center gap-1.5">
                <MapPin size={15} />
                <span>{user.distanceKm} km away</span>
              </div>

              <div className="flex items-center gap-1.5 text-brand-700">
                <Sparkles size={15} />
                <span>{compatibility}% Match</span>
              </div>
            </div>

            {user.bio && (
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink-600">
                {user.bio}
              </p>
            )}

            {/* Temporary interest chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {(user.interests ?? [
                "Programming",
                "Fitness",
                "Music",
              ]).map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-surface-200 bg-surface-50 px-3 py-1 text-xs font-medium text-ink-600"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex shrink-0 flex-col items-end gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
            <span className="text-lg font-semibold text-brand-700">
              {compatibility}
            </span>
          </div>

          <Button
            variant={action.variant}
            disabled={action.disabled || actionPending}
            onClick={() => onAction(user)}
            className="min-w-[120px]"
          >
            <ActionIcon size={16} />
            {action.label}
          </Button>
        </div>
      </div>
    </Card>
  );
}