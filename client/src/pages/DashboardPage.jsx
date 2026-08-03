import { Link } from "react-router-dom";
import {
  Compass,
  Users,
  MessageCircle,
  User,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import { useAuthUser } from "@/hooks/useAuthUser";
import { ROUTES } from "@/constants/routes";

const QUICK_ACTIONS = [
  {
    label: "Discover",
    description: "Find nearby people around your location.",
    icon: Compass,
    to: ROUTES.DISCOVER,
  },
  {
    label: "Friends",
    description: "Manage your connections.",
    icon: Users,
    to: ROUTES.FRIENDS,
  },
  {
    label: "Chats",
    description: "Continue your conversations.",
    icon: MessageCircle,
    to: ROUTES.CHAT,
  },
  {
    label: "Profile",
    description: "Update your public profile.",
    icon: User,
    to: ROUTES.PROFILE,
  },
];

export default function DashboardPage() {
  const {
    fullName,
    email,
    avatarUrl,
    clerkId,
  } = useAuthUser();

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Hero */}

      <Card className="overflow-hidden p-0">

        <div className="h-32 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500" />

        <div className="relative px-8 pb-8">

          <div className="-mt-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div className="flex items-end gap-5">

              <img
                src={avatarUrl}
                alt={fullName}
                className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-lg"
              />

              <div>

                <div className="flex items-center gap-2">

                  <h1 className="font-display text-3xl font-semibold text-ink-950">
                    Welcome back,
                  </h1>

                  <BadgeCheck
                    size={20}
                    className="text-brand-700"
                  />

                </div>

                <p className="mt-2 text-lg text-ink-700">
                  {fullName}
                </p>

                <p className="text-sm text-ink-600">
                  {email}
                </p>

              </div>

            </div>

            <Link to={ROUTES.PROFILE}>
              <Button>
                Edit Profile
              </Button>
            </Link>

          </div>

        </div>

      </Card>

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-3">

        <Card>

          <p className="text-sm text-ink-600">
            Profile
          </p>

          <p className="mt-3 text-xl font-semibold text-green-600">
            Ready
          </p>

        </Card>

        <Card>

          <p className="text-sm text-ink-600">
            Account
          </p>

          <p className="mt-3 text-xl font-semibold text-ink-950">
            Connected
          </p>

        </Card>

        <Card>

          <p className="text-sm text-ink-600">
            Clerk ID
          </p>

          <p className="mt-3 truncate text-sm font-medium text-ink-600">
            {clerkId}
          </p>

        </Card>

      </div>

      {/* Quick Actions */}

      <section>

        <div className="mb-6">

          <h2 className="font-display text-2xl font-semibold text-ink-950">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-ink-600">
            Navigate through Nearby.
          </p>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {QUICK_ACTIONS.map((item) => {

            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                to={item.to}
              >
                <Card className="group h-full p-6 hover:border-brand-100">

                  <div className="flex items-start justify-between">

                    <div>

                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">

                        <Icon size={22} />

                      </div>

                      <h3 className="font-display text-lg font-semibold text-ink-950">
                        {item.label}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-ink-600">
                        {item.description}
                      </p>

                    </div>

                    <ArrowRight
                      size={20}
                      className="text-ink-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-700"
                    />

                  </div>

                </Card>
              </Link>
            );

          })}

        </div>

      </section>

      {/* Welcome */}

      <Card className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">

        <div>

          <h2 className="font-display text-2xl font-semibold text-ink-950">
            Ready to discover people nearby?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-ink-600">
            Nearby helps you connect with people around you,
            make new friends and start meaningful conversations
            based on location.
          </p>

        </div>

        <Link to={ROUTES.DISCOVER}>

          <Button>
            Explore Nearby
          </Button>

        </Link>

      </Card>

    </div>
  );
}