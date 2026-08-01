import { Router } from "express";
import { requireAuth } from "#middleware/requireAuth.js";
import { attachAppUser } from "#middleware/attachAppUser.js";
import { usersController } from "#modules/users/users.controller.js";
import { asyncHandler } from "#utils/asyncHandler.js";

const router = Router();

router.use(requireAuth, attachAppUser);

router.get("/me", asyncHandler(usersController.getCurrentUser));
router.patch("/me", asyncHandler(usersController.updateCurrentUser));

export default router;
