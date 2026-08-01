import axiosClient from "@/api/axiosClient";

export async function fetchFriends() {
  const { data } = await axiosClient.get("/friends");
  return data;
}

export async function fetchFriendRequests() {
  const { data } = await axiosClient.get("/friends/requests");
  return data;
}

export async function sendFriendRequest(receiverId) {
  const { data } = await axiosClient.post("/friends/requests", { receiverId });
  return data;
}

export async function acceptFriendRequest(requestId) {
  const { data } = await axiosClient.post(`/friends/requests/${requestId}/accept`);
  return data;
}

export async function rejectFriendRequest(requestId) {
  const { data } = await axiosClient.post(`/friends/requests/${requestId}/reject`);
  return data;
}

export async function removeFriend(userId) {
  const { data } = await axiosClient.delete(`/friends/${userId}`);
  return data;
}
