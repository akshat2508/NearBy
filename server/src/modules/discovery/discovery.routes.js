import { Router } from "express";
import { requireAuth } from "#middleware/requireAuth.js";
import { attachAppUser } from "#middleware/attachAppUser.js";
import { discoveryController } from "#modules/discovery/discovery.controller.js";
import { asyncHandler } from "#utils/asyncHandler.js";

const router = Router();

router.use(requireAuth, attachAppUser);

router.put("/location", asyncHandler(discoveryController.updateLocation));
router.patch("/visibility", asyncHandler(discoveryController.updateVisibility));
router.get("/nearby", asyncHandler(discoveryController.listNearby));

export default router;
