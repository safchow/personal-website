import { ValidationError, logger } from "@website/core";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (error instanceof ValidationError) {
    res.status(400).json({
      error: "Validation failed",
      details: error.details ?? [],
    });
    return;
  }

  // Controllers that validate query params with schema.parse() throw a raw
  // ZodError; surface it as a 400 (same shape as the validate() middleware)
  // instead of a 500.
  if (error instanceof ZodError) {
    res.status(400).json({
      error: "Validation failed",
      details: error.errors.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  if (error instanceof Error) {
    logger.error({ err: error, request_id: req.headers["x-request-id"] }, error.message);
    res.status(500).json({
      error: "Internal server error",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "An unexpected error occurred",
    });
    return;
  }

  logger.error({ error }, "Unknown error");
  res.status(500).json({
    error: "Internal server error",
    message: "An unexpected error occurred",
  });
}
