import { useUser } from "@clerk/clerk-react";

export function useAuthUser() {
  const { user, isLoaded, isSignedIn } = useUser();

  return {
    isLoaded,
    isSignedIn,
    fullName: user?.fullName ?? "",
    email: user?.primaryEmailAddress?.emailAddress ?? "",
    avatarUrl: user?.imageUrl ?? "",
    clerkId: user?.id ?? "",
  };
}
