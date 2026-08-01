import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createConversation, fetchConversations } from "@/services/chatService";
import { useSocket } from "@/context/SocketContext";

export function useConversations() {
  const queryClient = useQueryClient();
  const socket = useSocket();
  const query = useQuery({ queryKey: ["conversations"], queryFn: fetchConversations });

  useEffect(() => {
    if (!socket) return undefined;

    // Any new message bumps that conversation to the top with an
    // updated preview, regardless of which conversation is open.
    const handleNewMessage = (message) => {
      queryClient.setQueryData(["conversations"], (current) => {
        if (!current) return current;
        const updated = current.map((conversation) =>
          conversation.id === message.conversationId
            ? { ...conversation, lastMessage: message, lastMessageAt: message.createdAt }
            : conversation
        );
        return updated.sort(
          (a, b) => new Date(b.lastMessageAt ?? 0) - new Date(a.lastMessageAt ?? 0)
        );
      });
    };

    socket.on("message:new", handleNewMessage);
    return () => socket.off("message:new", handleNewMessage);
  }, [socket, queryClient]);

  return query;
}

export function useCreateConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createConversation,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["conversations"] }),
  });
}
