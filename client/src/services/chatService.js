import axiosClient from "@/api/axiosClient";

export async function fetchConversations() {
  const { data } = await axiosClient.get("/chat/conversations");
  return data;
}

export async function createConversation(friendId) {
  const { data } = await axiosClient.post("/chat/conversations", { friendId });
  return data;
}

export async function fetchMessages(conversationId) {
  const { data } = await axiosClient.get(`/chat/conversations/${conversationId}/messages`);
  return data;
}

export async function sendMessage(conversationId, content) {
  const { data } = await axiosClient.post(`/chat/conversations/${conversationId}/messages`, {
    content,
  });
  return data;
}
