import { clerkMiddleware } from "@clerk/express";
import { env } from "#config/env.js";

// Clerk is the identity provider only. The backend attaches auth state to
// req.auth via this middleware; application users are owned by our own
// database (see modules/users).
export const clerkAuthMiddleware = clerkMiddleware({
  secretKey: env.clerkSecretKey,
  publishableKey: env.clerkPublishableKey,
});
