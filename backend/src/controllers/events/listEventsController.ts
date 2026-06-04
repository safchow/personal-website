import { getEventsCollection } from "@website/core";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const listEventsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(1000).default(100),
});

/**
 * GET /api/events - List events from MongoDB.
 * Use this to view analytics data when you can't connect directly (e.g. Railway internal hosts).
 */
export async function listEventsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { limit } = listEventsQuerySchema.parse(req.query);
    const docs = await getEventsCollection()
      .find({})
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();

    const events = docs.map(({ _id, ...rest }) => ({
      id: _id?.toHexString(),
      ...rest,
    }));

    res.status(200).json({
      data: { events },
      meta: { count: events.length },
    });
  } catch (error) {
    next(error);
  }
}
