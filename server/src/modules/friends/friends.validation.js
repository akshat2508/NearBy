import { z } from "zod";

export const sendRequestSchema = z.object({
  receiverId: z.string().uuid(),
});

export const requestIdParamSchema = z.object({
  requestId: z.string().uuid(),
});

export const friendUserIdParamSchema = z.object({
  userId: z.string().uuid(),
});
