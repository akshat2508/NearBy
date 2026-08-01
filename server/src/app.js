import express from "express";
import cors from "cors";
import { env } from "#config/env.js";
import { clerkAuthMiddleware } from "#config/clerk.js";
import routes from "#routes/index.js";
import { errorHandler } from "#middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(cors({ origin: env.clientUrl, credentials: true }));
  app.use(express.json());
  app.use(clerkAuthMiddleware);

  app.get("/health", (req, res) => res.json({ status: "ok" }));

  app.use("/api", routes);

  app.use(errorHandler);

  return app;
}
