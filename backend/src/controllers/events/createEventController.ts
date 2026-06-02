import { getEventsCollection } from "@website/core";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const createEventSchema = z.object({
  sessionId: z.string().min(1),
  type: z.enum(["click", "pageview"]),
  target: z.string().optional(),
  path: z.string().optional(),
  metadata: z.string().optional(),
});

export async function createEventController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = req.body as z.infer<typeof createEventSchema>;
    const doc = {
      sessionId: body.sessionId,
      type: body.type,
      target: body.target ?? null,
      path: body.path ?? null,
      timestamp: new Date(),
      metadata: body.metadata ?? null,
    };

    const { insertedId } = await getEventsCollection().insertOne(doc);

    res.status(201).json({
      data: {
        event: {
          id: insertedId.toHexString(),
          sessionId: doc.sessionId,
          type: doc.type,
          target: doc.target,
          path: doc.path,
          timestamp: doc.timestamp.toISOString(),
          metadata: doc.metadata,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}
