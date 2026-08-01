import { usersService } from "#modules/users/users.service.js";

// Runs after requireAuth. Resolves the Clerk identity to our own User row
// (creating it on first sight) and attaches it as req.user so downstream
// controllers work with application user ids, not Clerk ids.
export async function attachAppUser(req, res, next) {
  try {
    req.user = await usersService.getOrSyncCurrentUser(req.clerkUserId);
    next();
  } catch (err) {
    next(err);
  }
}
