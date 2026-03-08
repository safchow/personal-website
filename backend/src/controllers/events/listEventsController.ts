import { prisma } from "@website/core";
import { NextFunction, Request, Response } from "express";

/**
 * GET /api/events - List events from MongoDB.
 * Use this to view analytics data when you can't connect directly (e.g. Railway internal hosts).
 * Optional: set ADMIN_API_KEY env var and pass ?key=<value> to protect the endpoint.
 */
export async function listEventsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = Math.min(parseInt(String(req.query.limit || "100"), 10), 1000);
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
