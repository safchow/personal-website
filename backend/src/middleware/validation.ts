import { ValidationError } from "@website/core";
import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";

export function validate<T extends ZodSchema>(schema: T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        throw new ValidationError(
          "Validation failed",
          result.error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          }))
        );
      }
      req.body = result.data as z.infer<T>;
      next();
    } catch (error) {
      next(error);
    }
  };
}
