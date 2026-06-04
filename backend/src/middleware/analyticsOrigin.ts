import { config } from "@website/core";
import { NextFunction, Request, Response } from "express";

const allowedAnalyticsOrigins = new Set(
  [
    config.clientUrl,
    "https://www.safwaan-chowdhury.com",
    "https://safwaan-chowdhury.com",
    "http://localhost:5173",
  ]
    .filter(Boolean)
    .map((origin) => new URL(origin).origin),
);

function isAllowedOrigin(value: string | undefined): boolean {
  if (!value) return false;

  try {
    const origin = new URL(value).origin;
    return (
      allowedAnalyticsOrigins.has(origin) ||
      origin.endsWith(".safwaan-chowdhury.com")
    );
  } catch {
    return false;
  }
}

export function requireAnalyticsOrigin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (config.nodeEnv !== "production") {
    next();
    return;
  }

  const origin = req.get("origin");
  const referer = req.get("referer");

  if (isAllowedOrigin(origin) || isAllowedOrigin(referer)) {
    next();
    return;
  }

  res.status(403).json({
    error: "Forbidden",
    message: "Analytics events must originate from the website.",
  });
}
