import { prisma } from "@website/core";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const listEventsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(1000).default(100),
});

/**
 * GET /api/events - List events from MongoDB.
 * Use this to view analytics data when you can't connect directly (e.g. Railway internal hosts).
 * Optional: set ADMIN_API_KEY env var and pass ?key=<value> to protect the endpoint.
 */
export async function listEventsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { limit } = listEventsQuerySchema.parse(req.query);
    const events = await prisma.event.findMany({
      orderBy: { timestamp: "desc" },
      take: limit,
    });

    res.status(200).json({
      data: { events },
      meta: { count: events.length },
    });
  } catch (error) {
    next(error);
  }
}
