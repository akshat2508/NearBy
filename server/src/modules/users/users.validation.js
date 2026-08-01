import { z } from "zod";

export const upsertUserSchema = z.object({
  clerkId: z.string().min(1),
  email: z.string().email(),
  fullName: z.string().nullable().optional(),
  avatarUrl: z.string().url().nullable().optional(),
});

export const updateProfileSchema = z.object({
  bio: z.string().trim().max(280).nullable().optional(),
});
