import { Router } from "express";
import { authController } from "#modules/auth/auth.controller.js";

const router = Router();

router.get("/status", authController.getStatus);

export default router;
