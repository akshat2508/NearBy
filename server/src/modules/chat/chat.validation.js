import { z } from "zod";

export const createConversationSchema = z.object({
  friendId: z.string().uuid(),
});

export const sendMessageSchema = z.object({
  content: z.string().trim().min(1).max(2000),
});

export const listMessagesQuerySchema = z.object({
  cursor: z.string().uuid().optional(),
  limit: z.coerce.number().min(1).max(100).default(30),
});
