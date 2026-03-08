import "dotenv/config";

import { errorHandler } from "@/middleware/errorHandler.js";
import router from "@/routes/index.js";
import {
  config,
  logger,
  prisma,
  requestIdMiddleware,
  requestLogger,
} from "@website/core";
import cors from "cors";
import express, { json } from "express";

const app = express();

// Trust proxy (Railway uses a reverse proxy)
app.set("trust proxy", 1);

const allowedOrigins = [
  config.clientUrl,
  "https://www.safwaan-chowdhury.com",
  "https://safwaan-chowdhury.com",
  "http://localhost:5173",
].filter(Boolean);

// CORS first so preflight (OPTIONS) is handled before other middleware
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // same-origin or non-browser
      if (allowedOrigins.includes(origin)) return cb(null, true);
      if (origin.endsWith(".safwaan-chowdhury.com")) return cb(null, true);
      cb(null, false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(requestIdMiddleware);
app.use(requestLogger);
app.use(json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "backend",
  });
});

app.get("/ready", async (req, res) => {
  try {
    await prisma.$runCommandRaw({ ping: 1 });
    res.status(200).json({
      status: "ready",
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch (error) {
    res.status(503).json({
      status: "not ready",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.use("/api", router);
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${config.nodeEnv}`);
  logger.info(`API available at http://localhost:${PORT}/api`);
});
