import { getAuth } from "@clerk/express";

// Extension point: session-related endpoints beyond what Clerk's own
// client SDK already covers (e.g. custom onboarding checks) go here.
export const authController = {
  getStatus(req, res) {
    const auth = getAuth(req);
    res.json({ authenticated: Boolean(auth?.userId) });
  },
};
