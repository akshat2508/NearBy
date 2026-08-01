import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/services/userService";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updated) => {
      queryClient.setQueryData(["currentUser"], updated);
    },
  });
}
