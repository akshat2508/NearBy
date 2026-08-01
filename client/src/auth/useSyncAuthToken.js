import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { setAuthTokenGetter } from "@/api/axiosClient";

// Registers Clerk's getToken with the shared axios client so every API
// call carries a fresh session token, without every call site having to
// remember to fetch and attach one itself.
export function useSyncAuthToken() {
  const { getToken } = useAuth();

  useEffect(() => {
    setAuthTokenGetter(getToken);
  }, [getToken]);
}
