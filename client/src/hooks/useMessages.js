import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMessages, sendMessage as sendMessageRequest } from "@/services/chatService";
import { useSocket } from "@/context/SocketContext";

export function useMessages(conversationId) {
  const socket = useSocket();
  const queryClient = useQueryClient();
  const queryKey = ["messages", conversationId];

  const query = useQuery({
    queryKey,
    queryFn: () => fetchMessages(conversationId),
    enabled: Boolean(conversationId),
  });

  useEffect(() => {
    if (!socket || !conversationId) return undefined;

    socket.emit("conversation:join", conversationId);

    const handleNewMessage = (message) => {
      if (message.conversationId !== conversationId) return;
      queryClient.setQueryData(queryKey, (current) => {
        if (!current) return current;
        if (current.some((existing) => existing.id === message.id)) return current;
        return [...current, message];
      });
    };

    socket.on("message:new", handleNewMessage);
    return () => socket.off("message:new", handleNewMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, conversationId]);

  // Sends over the socket when connected (instant delivery + broadcast),
  // falling back to a plain REST call so chat still works if the socket
  // hasn't connected yet.
  async function sendMessage(content) {
    if (socket?.connected) {
      return new Promise((resolve, reject) => {
        socket.emit("message:send", { conversationId, content }, (response) => {
          if (response?.ok) resolve(response.message);
          else reject(new Error(response?.error ?? "Failed to send message"));
        });
      });
    }
    return sendMessageRequest(conversationId, content);
  }

  return { ...query, sendMessage };
}
