import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";
import Spinner from "@/components/ui/Spinner";
import { ROUTES } from "@/constants/routes";

export default function LandingPage() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center sm:py-36">
      <span className="mb-5 rounded-full border border-surface-200 bg-surface-0 px-3 py-1 text-xs font-medium text-ink-600 shadow-soft">
        Now in early access
      </span>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-950 sm:text-5xl">
        Discover meaningful connections around you.
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg">
        Nearby helps you find and connect with people close to you, right now — no
        endless swiping, just proximity and genuine interest.
      </p>
      <div className="mt-9">
        <GoogleSignInButton className="px-7 py-3 text-base" />
      </div>
    </section>
  );
}
