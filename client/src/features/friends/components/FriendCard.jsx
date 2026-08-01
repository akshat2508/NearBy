import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function FriendCard({ friend, onMessage, onRemove, actionPending }) {
  return (
    <Card className="flex items-center gap-4">
      <img
        src={friend.avatarUrl}
        alt={friend.fullName}
        className="h-12 w-12 rounded-full border border-surface-200 object-cover"
      />
      <div className="flex-1">
        <p className="font-medium text-ink-950">{friend.fullName}</p>
        {friend.bio && <p className="text-sm text-ink-600">{friend.bio}</p>}
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => onMessage(friend)}>
          Message
        </Button>
        <Button variant="outline" disabled={actionPending} onClick={() => onRemove(friend)}>
          Remove
        </Button>
      </div>
    </Card>
  );
}
