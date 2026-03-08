import { logger } from "../utils/logger.js";
import { NextFunction, Request, Response } from "express";

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const startTime = Date.now();
  const requestId = (req as Request & { id?: string }).id || "unknown";

  logger.info(
    {
      type: "http_request",
      method: req.method,
      path: req.path,
      request_id: requestId,
      user_agent: req.get("user-agent"),
      ip: req.ip,
    },
    "Request received"
  );

  res.on("finish", () => {
    const durationMs = Date.now() - startTime;
    logger.info(
      {
        type: "http_request",
        method: req.method,
        path: req.path,
        status_code: res.statusCode,
        duration_ms: durationMs,
        request_id: requestId,
      },
      "Request completed"
    );
  });

  next();
}
