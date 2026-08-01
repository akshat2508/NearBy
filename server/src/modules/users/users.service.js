import { clerkClient } from "@clerk/express";
import { usersRepository } from "#modules/users/users.repository.js";
import { upsertUserSchema } from "#modules/users/users.validation.js";

// Ensures every authenticated Clerk identity has a corresponding
// application-owned user row, creating or refreshing it as needed.
export const usersService = {
  async getOrSyncCurrentUser(clerkUserId) {
    const existing = await usersRepository.findByClerkId(clerkUserId);
    if (existing) return existing;

    const clerkUser = await clerkClient.users.getUser(clerkUserId);

    const payload = upsertUserSchema.parse({
      clerkId: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress ?? clerkUser.emailAddresses[0]?.emailAddress,
      fullName: [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null,
      avatarUrl: clerkUser.imageUrl ?? null,
    });

    return usersRepository.upsertByClerkId(payload);
  },

  updateProfile(userId, data) {
    return usersRepository.updateProfile(userId, data);
  },
};
