import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import Spinner from "@/components/ui/Spinner";

export default function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
