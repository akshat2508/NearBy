import { Outlet, Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { Bell, Search } from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import { ROUTES } from "@/constants/routes";

export default function PrivateLayout() {
  return (
    <div className="min-h-screen bg-surface-50">
      <div className="flex">
        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-surface-200 bg-white/80 backdrop-blur-xl">
            <div className="flex h-18 items-center justify-between px-8">
              {/* Left */}
              <div className="flex flex-col">
                <Link
                  to={ROUTES.DASHBOARD}
                  className="font-display text-xl font-semibold tracking-tight text-ink-950"
                >
                  Nearby
                </Link>

                <p className="text-sm text-ink-600">
                  Location-based social platform
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="hidden lg:flex">
                  <div className="flex h-11 w-72 items-center gap-3 rounded-xl border border-surface-200 bg-surface-0 px-4 transition-all duration-200 focus-within:border-brand-100 focus-within:ring-2 focus-within:ring-brand-50">
                    <Search
                      size={17}
                      className="text-ink-500"
                    />

                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full bg-transparent text-sm outline-none placeholder:text-ink-500"
                    />
                  </div>
                </div>

                {/* Notification */}
                <button
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-surface-200 bg-white text-ink-600 transition-all duration-200 hover:border-brand-100 hover:bg-brand-50 hover:text-brand-700"
                  type="button"
                >
                  <Bell size={18} />
                </button>

                {/* User */}
                <div className="rounded-full border border-surface-200 bg-white p-1 shadow-sm">
                  <UserButton afterSignOutUrl={ROUTES.HOME} />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mx-auto w-full max-w-7xl px-8 py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}