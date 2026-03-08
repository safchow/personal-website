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
import express, { json } from "express";

const app = express();

// Trust proxy (Railway uses a reverse proxy)
app.set("trust proxy", 1);

// Relaxed CORS - allow all origins (TODO: restrict later)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
});
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
