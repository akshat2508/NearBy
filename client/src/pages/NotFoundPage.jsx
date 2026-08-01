import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <p className="font-display text-2xl font-semibold text-ink-950">Page not found</p>
      <p className="text-sm text-ink-600">The page you're looking for doesn't exist.</p>
      <Button as={Link} to={ROUTES.HOME}>
        Back home
      </Button>
    </div>
  );
}
