import { NavLink } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";

const NAV_ITEMS = [
  { label: "Dashboard", to: ROUTES.DASHBOARD },
  { label: "Discover", to: ROUTES.DISCOVER },
  { label: "Friends", to: ROUTES.FRIENDS },
  { label: "Chats", to: ROUTES.CHAT },
  { label: "Profile", to: ROUTES.PROFILE },
  { label: "Settings", to: ROUTES.SETTINGS },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-surface-200 bg-surface-0 px-4 py-6 md:block">
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors",
                "hover:bg-surface-50 hover:text-ink-950",
                isActive && "bg-brand-50 text-brand-700"
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
