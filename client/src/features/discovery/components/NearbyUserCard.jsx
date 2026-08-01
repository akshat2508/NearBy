import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const ACTION_BY_STATUS = {
  none: { label: "Add friend", variant: "primary", disabled: false },
  pending_sent: { label: "Requested", variant: "outline", disabled: true },
  pending_received: { label: "Accept request", variant: "primary", disabled: false },
  friends: { label: "Friends", variant: "secondary", disabled: true },
};

export default function NearbyUserCard({ user, onAction, actionPending }) {
  const action = ACTION_BY_STATUS[user.friendStatus] ?? ACTION_BY_STATUS.none;

  return (
    <Card className="flex items-center gap-4">
      <img
        src={user.avatarUrl}
        alt={user.fullName}
        className="h-12 w-12 rounded-full border border-surface-200 object-cover"
      />
      <div className="flex-1">
        <p className="font-medium text-ink-950">{user.fullName}</p>
        <p className="text-sm text-ink-600">{user.distanceKm} km away</p>
        {user.bio && <p className="mt-1 text-sm text-ink-400">{user.bio}</p>}
      </div>
      <Button
        variant={action.variant}
        disabled={action.disabled || actionPending}
        onClick={() => onAction(user)}
      >
        {action.label}
      </Button>
    </Card>
  );
}
