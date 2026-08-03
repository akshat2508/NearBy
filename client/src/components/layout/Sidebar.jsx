import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Compass,
  Users,
  MessageCircle,
  User,
  Settings,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    to: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    label: "Discover",
    to: ROUTES.DISCOVER,
    icon: Compass,
  },
  {
    label: "Friends",
    to: ROUTES.FRIENDS,
    icon: Users,
  },
  {
    label: "Chats",
    to: ROUTES.CHAT,
    icon: MessageCircle,
  },
  {
    label: "Profile",
    to: ROUTES.PROFILE,
    icon: User,
  },
  {
    label: "Settings",
    to: ROUTES.SETTINGS,
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-68 shrink-0 border-r border-surface-200 bg-surface-0 md:flex md:flex-col">
      {/* Logo */}
      <div className="border-b border-surface-100 px-7 py-7">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-950">
          Nearby
        </h1>

        <p className="mt-1 text-sm text-ink-600">
          Discover people around you
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 rounded-xl px-4 py-3",
                  "text-sm font-medium transition-all duration-200",

                  "text-ink-600 hover:bg-surface-50 hover:text-ink-950",

                  isActive &&
                    "bg-brand-50 text-brand-700 shadow-sm"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-brand-700" />
                  )}

                  <Icon
                    size={18}
                    className={cn(
                      "transition-colors",
                      isActive
                        ? "text-brand-700"
                        : "text-ink-600 group-hover:text-ink-950"
                    )}
                  />

                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Branding */}
      <div className="border-t border-surface-100 px-6 py-5">
        <div className="rounded-2xl border border-surface-200 bg-surface-50 p-4">
          <p className="text-sm font-medium text-ink-950">
            Nearby
          </p>

          <p className="mt-1 text-xs leading-5 text-ink-600">
            Connect with people who share your interests nearby.
          </p>
        </div>
      </div>
    </aside>
  );
}