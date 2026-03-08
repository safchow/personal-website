import { ValidationError } from "@website/core";
import { NextFunction, Request, Response } from "express";

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

  if (error instanceof Error) {
    res.status(500).json({
      error: "Internal server error",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "An unexpected error occurred",
    });
    return;
  }

  res.status(500).json({
    error: "Internal server error",
    message: "An unexpected error occurred",
  });
}
