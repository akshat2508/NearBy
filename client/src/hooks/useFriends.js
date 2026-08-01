import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptFriendRequest,
  fetchFriendRequests,
  fetchFriends,
  rejectFriendRequest,
  removeFriend,
  sendFriendRequest,
} from "@/services/friendsService";

export function useFriendsList() {
  return useQuery({ queryKey: ["friends"], queryFn: fetchFriends });
}

export function useFriendRequests() {
  return useQuery({ queryKey: ["friendRequests"], queryFn: fetchFriendRequests });
}

function useInvalidateFriendsQueries() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["friends"] });
    queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    queryClient.invalidateQueries({ queryKey: ["nearby"] });
  };
}

export function useSendFriendRequest() {
  const invalidate = useInvalidateFriendsQueries();
  return useMutation({ mutationFn: sendFriendRequest, onSuccess: invalidate });
}

export function useAcceptFriendRequest() {
  const invalidate = useInvalidateFriendsQueries();
  return useMutation({ mutationFn: acceptFriendRequest, onSuccess: invalidate });
}

export function useRejectFriendRequest() {
  const invalidate = useInvalidateFriendsQueries();
  return useMutation({ mutationFn: rejectFriendRequest, onSuccess: invalidate });
}

export function useRemoveFriend() {
  const invalidate = useInvalidateFriendsQueries();
  return useMutation({ mutationFn: removeFriend, onSuccess: invalidate });
}
