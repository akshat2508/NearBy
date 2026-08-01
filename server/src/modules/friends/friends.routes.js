import { Router } from "express";
import { requireAuth } from "#middleware/requireAuth.js";
import { attachAppUser } from "#middleware/attachAppUser.js";
import { friendsController } from "#modules/friends/friends.controller.js";
import { asyncHandler } from "#utils/asyncHandler.js";

const router = Router();

router.use(requireAuth, attachAppUser);

router.get("/", asyncHandler(friendsController.listFriends));
router.delete("/:userId", asyncHandler(friendsController.removeFriend));

router.get("/requests", asyncHandler(friendsController.listRequests));
router.post("/requests", asyncHandler(friendsController.sendRequest));
router.post("/requests/:requestId/accept", asyncHandler(friendsController.acceptRequest));
router.post("/requests/:requestId/reject", asyncHandler(friendsController.rejectRequest));

export default router;
