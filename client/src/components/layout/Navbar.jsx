import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-200 bg-surface-0/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to={ROUTES.HOME} className="font-display text-lg font-semibold tracking-tight">
          Nearby
        </Link>
      </div>
    </header>
  );
}
