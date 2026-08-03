import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Check,
  X,
  Clock3,
  UserPlus,
} from "lucide-react";

export default function RequestCard({
  request,
  direction,
  onAccept,
  onReject,
  actionPending,
}) {
  const isIncoming = direction === "incoming";

  return (
    <Card className="group p-5 hover:border-brand-100">
      <div className="flex items-start justify-between gap-5">
        {/* Left */}
        <div className="flex min-w-0 flex-1 gap-4">
          <div className="relative">
            <img
              src={request.user.avatarUrl}
              alt={request.user.fullName}
              className="h-16 w-16 rounded-2xl border border-surface-200 object-cover"
            />

            <span
              className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${
                isIncoming ? "bg-brand-600" : "bg-amber-500"
              }`}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-display text-lg font-semibold text-ink-950">
                {request.user.fullName}
              </h3>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  isIncoming
                    ? "bg-brand-50 text-brand-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {isIncoming ? "New Request" : "Pending"}
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-ink-600">
              {isIncoming
                ? "Wants to connect with you."
                : "Friend request sent. Waiting for a response."}
            </p>
          </div>
        </div>

        {/* Right */}
        {isIncoming ? (
          <div className="flex shrink-0 gap-2">
            <Button
              disabled={actionPending}
              onClick={() => onAccept(request)}
            >
              <Check size={16} />
              Accept
            </Button>

            <Button
              variant="outline"
              disabled={actionPending}
              onClick={() => onReject(request)}
            >
              <X size={16} />
              Decline
            </Button>
          </div>
        ) : (
          <Button
            variant="secondary"
            disabled
          >
            <Clock3 size={16} />
            Pending
          </Button>
        )}
      </div>
    </Card>
  );
}