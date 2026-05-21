import { prisma } from "@website/core";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const createEventSchema = z.object({
  sessionId: z.string().min(1).max(64),
  type: z.enum(["click", "pageview"]),
  target: z.string().min(1).max(256).optional(),
  path: z.string().min(1).max(512).optional(),
  metadata: z.string().max(2_048).optional(),
});

export async function createEventController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = req.body as z.infer<typeof createEventSchema>;
    const event = await prisma.event.create({
      data: {
        sessionId: body.sessionId,
        type: body.type,
        target: body.target,
        path: body.path,
        metadata: body.metadata,
      },
    });

    res.status(201).json({ data: { event } });
  } catch (error) {
    next(error);
  }
}
