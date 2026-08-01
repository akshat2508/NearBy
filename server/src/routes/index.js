import { Router } from "express";
import authRoutes from "#modules/auth/auth.routes.js";
import usersRoutes from "#modules/users/users.routes.js";
import discoveryRoutes from "#modules/discovery/discovery.routes.js";
import friendsRoutes from "#modules/friends/friends.routes.js";
import chatRoutes from "#modules/chat/chat.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/discovery", discoveryRoutes);
router.use("/friends", friendsRoutes);
router.use("/chat", chatRoutes);

export default router;
