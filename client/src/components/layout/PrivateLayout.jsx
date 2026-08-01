import { Outlet } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { ROUTES } from "@/constants/routes";

export default function PrivateLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-surface-200 bg-surface-0 px-6">
          <Link to={ROUTES.DASHBOARD} className="font-display text-lg font-semibold tracking-tight">
            Nearby
          </Link>
          <UserButton afterSignOutUrl={ROUTES.HOME} />
        </header>
        <main className="flex-1 bg-surface-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
