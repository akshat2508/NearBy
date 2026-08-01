import { getAuth } from "@clerk/express";

// Guards a route so it only proceeds when Clerk has an authenticated
// session attached to the request.
export function requireAuth(req, res, next) {
  const auth = getAuth(req);

  if (!auth?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.clerkUserId = auth.userId;
  next();
}
