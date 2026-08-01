import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/services/userService";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
  });
}
