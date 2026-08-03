import { Link } from "react-router-dom";
import {
  MapPin,
  Users,
  MessageCircle,
  UserCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { useAuthUser } from "@/hooks/useAuthUser";
import Card from "@/components/ui/Card";
import { ROUTES } from "@/constants/routes";

const PLACEHOLDER_CARDS = [
  {
    label: "Discover",
    description: "Find people nearby.",
    to: ROUTES.DISCOVER,
    icon: MapPin,
    color:
      "from-cyan-400/20 via-sky-400/10 to-transparent text-cyan-600",
  },
  {
    label: "Friends",
    description: "Manage your connections.",
    to: ROUTES.FRIENDS,
    icon: Users,
    color:
      "from-emerald-400/20 via-green-400/10 to-transparent text-emerald-600",
  },
  {
    label: "Chats",
    description: "Your conversations.",
    to: ROUTES.CHAT,
    icon: MessageCircle,
    color:
      "from-orange-400/20 via-amber-400/10 to-transparent text-orange-600",
  },
  {
    label: "Profile",
    description: "Edit how others see you.",
    to: ROUTES.PROFILE,
    icon: UserCircle,
    color:
      "from-pink-400/20 via-rose-400/10 to-transparent text-pink-600",
  },
];

export default function DashboardPage() {
  const { fullName, email, avatarUrl, clerkId } = useAuthUser();

  const firstName = fullName?.split(" ")[0];

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* Greeting */}

      <div className="flex items-center justify-between">

        <div>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3 py-1 backdrop-blur">

            <Sparkles className="h-4 w-4 text-brand-600" />

            <span className="text-xs font-medium text-brand-700">
              Welcome Back
            </span>

          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-ink-950">

            Good morning,{" "}

            <span className="bg-gradient-to-r from-brand-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
              {firstName}
            </span>

            👋

          </h1>

          <p className="mt-2 max-w-xl text-base text-ink-500 leading-relaxed">
            Discover people around you, reconnect with friends and explore your
            local community.
          </p>

        </div>

      </div>

      {/* Profile */}

      <Card className="relative overflow-hidden border border-white/30 bg-white/80 backdrop-blur-xl shadow-xl">
       

        <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 via-transparent to-brand-50" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-5">

            <div className="relative">

              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-400 to-cyan-400 blur-lg opacity-30" />

              <img
                src={avatarUrl}
                alt={fullName}
                className="relative h-20 w-20 rounded-full border-4 border-white object-cover shadow-xl"
              />

            </div>

            <div>

              <h2 className="text-xl font-semibold text-ink-950">
                {fullName}
              </h2>

              <p className="mt-1 text-sm text-ink-500">
                {email}
              </p>

              <div className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                ID • {clerkId}
              </div>

            </div>

          </div>

        </div>

      </Card>

      {/* Navigation */}

      <div className="grid gap-5 sm:grid-cols-2">

        {PLACEHOLDER_CARDS.map((item) => (

          <Link
            key={item.label}
            to={item.to}
            className="group"
          >

            <Card
              className="
                relative
                overflow-hidden
                border
                border-slate-200/60
                bg-white/80
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-brand-200
                hover:shadow-2xl
              "
            >

              <div
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br ${item.color}`}
              />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div
                    className={`
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      ${item.color}
                      shadow-lg
                    `}
                  >

                    <item.icon
                      className="h-6 w-6"
                      strokeWidth={2}
                    />

                  </div>

                  <ArrowRight
                    className="
                      h-5
                      w-5
                      text-ink-400
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                      group-hover:text-brand-600
                    "
                  />

                </div>

                <h3 className="mt-6 text-lg font-semibold text-ink-950 transition-colors group-hover:text-brand-700">
                  {item.label}
                </h3>

                <p className="mt-2 text-sm leading-6 text-ink-500">
                  {item.description}
                </p>

              </div>

            </Card>

          </Link>

        ))}

      </div>

    </div>
  );
}