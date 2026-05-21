import { config } from "@website/core";
import { NextFunction, Request, Response } from "express";

/**
 * Middleware that requires x-admin-api-key or ?key=<value> to match ADMIN_API_KEY.
 * Production defaults closed when ADMIN_API_KEY is missing.
 */
export function requireAdminKey(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const adminKey = config.adminApiKey;
  if (!adminKey) {
    if (config.nodeEnv === "production") {
      res.status(503).json({ error: "Admin API key is not configured" });
      return;
    }

    next();
    return;
  }

  const providedKey =
    req.get("x-admin-api-key") ||
    (typeof req.query.key === "string" ? req.query.key : undefined);

  if (providedKey !== adminKey) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
