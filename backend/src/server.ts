import "dotenv/config";

import { errorHandler } from "@/middleware/errorHandler.js";
import router from "@/routes/index.js";
import { ensureAnalyticsStorage } from "@/services/analyticsStorage.js";
import {
  config,
  connectMongo,
  disconnectMongo,
  getMongoClient,
  logger,
  requestIdMiddleware,
  requestLogger,
} from "@website/core";
import cors from "cors";
import express, { json } from "express";
import type { Server } from "node:http";

const app = express();

// Trust proxy (Railway uses a reverse proxy)
app.set("trust proxy", 1);

const allowedOrigins = [
  config.clientUrl,
  "https://www.safwaan-chowdhury.com",
  "https://safwaan-chowdhury.com",
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
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
    await getMongoClient().db().command({ ping: 1 });
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

function setupGracefulShutdown(server: Server) {
  let isShuttingDown = false;

  const shutdown = (signal: NodeJS.Signals) => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    logger.info({ signal }, "Shutting down server");
    const forceExitTimer = setTimeout(() => {
      logger.error("Forced shutdown after timeout");
      process.exit(1);
    }, 10_000);
    forceExitTimer.unref?.();

    server.close(async (error) => {
      if (error) {
        logger.error({ err: error }, "Error closing HTTP server");
      }

      try {
        await disconnectMongo();
      } catch (disconnectError) {
        logger.error(
          { err: disconnectError },
          "Error disconnecting MongoDB client",
        );
      }

      clearTimeout(forceExitTimer);
      process.exit(error ? 1 : 0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

async function start() {
  // Connect to Mongo, but never let a DB issue crash the process: the HTTP
  // server must still come up so /health (liveness) passes and the driver can
  // reconnect lazily on the first query.
  try {
    await connectMongo();
    await ensureAnalyticsStorage();
  } catch (error) {
    logger.error(
      { err: error },
      "Initial MongoDB connection failed; starting server anyway",
    );
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    logger.info(`Server running on port ${PORT}`);
    logger.info(`Environment: ${config.nodeEnv}`);
    logger.info(`API available at http://localhost:${PORT}/api`);
  });

  setupGracefulShutdown(server);
}

void start();
