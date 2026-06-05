import { config } from "@website/core";
import { NextFunction, Request, Response } from "express";
import { createHash, timingSafeEqual } from "node:crypto";

function sha256Hex(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

/**
 * Gates the analytics read endpoints behind a single shared admin password.
 *
 * The password is never stored in plaintext: only its SHA-256 hex digest lives
 * in config (ANALYTICS_ADMIN_PASSWORD_HASH). The caller sends the plaintext via
 * the `x-admin-password` header (or `?password=`), and we constant-time compare
 * digests. These endpoints are only ever called by the site owner, so the
 * secret never ships to visitors.
 *
 * If no hash is configured we fail closed in production and pass through in
 * other environments (keeps local dev and the e2e suite simple).
 */
export function requireAdminPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const expectedHash = config.adminPasswordHash;

  if (!expectedHash) {
    if (config.nodeEnv === "production") {
      res.status(503).json({ error: "Admin password is not configured" });
      return;
    }

    next();
    return;
  }

  const provided =
    req.get("x-admin-password") ||
    (typeof req.query.password === "string" ? req.query.password : "");

  const providedDigest = Buffer.from(sha256Hex(provided), "hex");
  const expectedDigest = Buffer.from(expectedHash, "hex");

  if (
    providedDigest.length !== expectedDigest.length ||
    !timingSafeEqual(providedDigest, expectedDigest)
  ) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}
