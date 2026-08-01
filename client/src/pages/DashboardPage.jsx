import { Link } from "react-router-dom";
import { useAuthUser } from "@/hooks/useAuthUser";
import Card from "@/components/ui/Card";
import { ROUTES } from "@/constants/routes";

const PLACEHOLDER_CARDS = [
  { label: "Discover", description: "Find people nearby.", to: ROUTES.DISCOVER },
  { label: "Friends", description: "Manage your connections.", to: ROUTES.FRIENDS },
  { label: "Chats", description: "Your conversations.", to: ROUTES.CHAT },
  { label: "Profile", description: "Edit how others see you.", to: ROUTES.PROFILE },
];

export default function DashboardPage() {
  const { fullName, email, avatarUrl, clerkId } = useAuthUser();

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl}
            alt={fullName}
            className="h-14 w-14 rounded-full border border-surface-200 object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-ink-950">{fullName}</p>
            <p className="text-sm text-ink-600">{email}</p>
            <p className="mt-1 text-xs text-ink-400">Clerk ID: {clerkId}</p>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PLACEHOLDER_CARDS.map((item) => (
          <Link key={item.label} to={item.to}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <p className="font-display text-base font-semibold text-ink-950">{item.label}</p>
              <p className="mt-1 text-sm text-ink-600">{item.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
