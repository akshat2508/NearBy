import { Router } from "express";
import { requireAuth } from "#middleware/requireAuth.js";
import { attachAppUser } from "#middleware/attachAppUser.js";
import { chatController } from "#modules/chat/chat.controller.js";
import { asyncHandler } from "#utils/asyncHandler.js";

const router = Router();

router.use(requireAuth, attachAppUser);

router.get("/conversations", asyncHandler(chatController.listConversations));
router.post("/conversations", asyncHandler(chatController.createConversation));
router.get("/conversations/:conversationId/messages", asyncHandler(chatController.listMessages));
router.post("/conversations/:conversationId/messages", asyncHandler(chatController.sendMessage));

export default router;
