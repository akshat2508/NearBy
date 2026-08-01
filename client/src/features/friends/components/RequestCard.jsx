import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function RequestCard({ request, direction, onAccept, onReject, actionPending }) {
  return (
    <Card className="flex items-center gap-4">
      <img
        src={request.user.avatarUrl}
        alt={request.user.fullName}
        className="h-12 w-12 rounded-full border border-surface-200 object-cover"
      />
      <div className="flex-1">
        <p className="font-medium text-ink-950">{request.user.fullName}</p>
        <p className="text-sm text-ink-600">
          {direction === "incoming" ? "Wants to be friends" : "Request sent — awaiting response"}
        </p>
      </div>
      {direction === "incoming" ? (
        <div className="flex gap-2">
          <Button disabled={actionPending} onClick={() => onAccept(request)}>
            Accept
          </Button>
          <Button variant="outline" disabled={actionPending} onClick={() => onReject(request)}>
            Decline
          </Button>
        </div>
      ) : (
        <Button variant="outline" disabled>
          Pending
        </Button>
      )}
    </Card>
  );
}
