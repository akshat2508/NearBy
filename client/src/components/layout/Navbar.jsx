import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

import { ROUTES } from "@/constants/routes";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-8">
        {/* Brand */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-700 text-white shadow-sm">
            <Compass size={20} />
          </div>

          <div>
            <h1 className="font-display text-xl font-semibold tracking-tight text-ink-950">
              Nearby
            </h1>

            <p className="text-xs text-ink-600">
              Location-based social platform
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}