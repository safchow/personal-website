import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const requestId = (req.headers["x-request-id"] as string) || randomUUID();
  (req as Request & { id: string }).id = requestId;
  res.setHeader("X-Request-ID", requestId);
  next();
}
