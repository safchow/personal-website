import { config, logger } from "@website/core";
import { NextFunction, Request, Response } from "express";

type RateLimitOptions = {
  windowMs: number;
  maxRequests: number;
  maxKeys?: number;
  message: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

function pruneExpiredEntries(
  entries: Map<string, RateLimitEntry>,
  now: number,
) {
  for (const [key, entry] of entries) {
    if (entry.resetAt <= now) {
      entries.delete(key);
    }
  }
}

function trimOldestEntries(
  entries: Map<string, RateLimitEntry>,
  maxKeys: number,
) {
  while (entries.size > maxKeys) {
    const oldestKey = entries.keys().next().value as string | undefined;
    if (!oldestKey) return;
    entries.delete(oldestKey);
  }
}

export function createRateLimiter({
  windowMs,
  maxRequests,
  maxKeys = 10_000,
  message,
}: RateLimitOptions) {
  const entries = new Map<string, RateLimitEntry>();
  const cleanupTimer = setInterval(() => {
    pruneExpiredEntries(entries, Date.now());
  }, windowMs);

  cleanupTimer.unref?.();

  return (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const existing = entries.get(key);
    const entry =
      existing && existing.resetAt > now
        ? existing
        : { count: 0, resetAt: now + windowMs };

    entry.count += 1;
    entries.delete(key);
    entries.set(key, entry);

    pruneExpiredEntries(entries, now);
    trimOldestEntries(entries, maxKeys);

    const resetSeconds = Math.ceil((entry.resetAt - now) / 1000);
    res.setHeader("RateLimit-Limit", String(maxRequests));
    res.setHeader(
      "RateLimit-Remaining",
      String(Math.max(maxRequests - entry.count, 0)),
    );
    res.setHeader("RateLimit-Reset", String(resetSeconds));

    if (entry.count > maxRequests) {
      logger.warn(
        { ip: key, path: req.path, method: req.method },
        "Rate limit exceeded",
      );
      res.status(429).json({
        error: "Too many requests",
        message,
        retryAfterSeconds: resetSeconds,
      });
      return;
    }

    next();
  };
}

export const analyticsWriteRateLimiter = createRateLimiter({
  windowMs: 60_000,
  maxRequests: Math.max(config.analyticsWriteLimitPerMinute, 1),
  message: "Too many analytics events. Please retry later.",
});

export const analyticsReadRateLimiter = createRateLimiter({
  windowMs: 60_000,
  maxRequests: Math.max(config.analyticsReadLimitPerMinute, 1),
  message: "Too many analytics reads. Please retry later.",
});
