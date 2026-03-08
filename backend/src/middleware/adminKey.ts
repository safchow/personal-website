import { NextFunction, Request, Response } from "express";

/**
 * Middleware that requires ?key=<value> to match ADMIN_API_KEY when that env var is set.
 * If ADMIN_API_KEY is not set, the request passes through.
 */
export function requireAdminKey(req: Request, res: Response, next: NextFunction) {
  const adminKey = process.env.ADMIN_API_KEY;
  if (adminKey && req.query.key !== adminKey) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
