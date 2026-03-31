import { prisma } from "@website/core";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const getPageviewsQuerySchema = z.object({
  path: z.string().min(1),
});

/**
 * Returns route-level pageview analytics for a given path.
 *
 * Response shape:
 * - `path`: the route the metrics were calculated for
 * - `pageviews`: total number of pageview events recorded for the path
 * - `uniqueSessions`: number of distinct anonymous session IDs that viewed the path
 */
export async function getPageviewsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { path } = getPageviewsQuerySchema.parse(req.query);

    const [pageviewEvents, pageviews] = await Promise.all([
      prisma.event.findMany({
        where: {
          path,
          type: "pageview",
        },
        select: {
          sessionId: true,
        },
      }),
      prisma.event.count({
        where: {
          path,
          type: "pageview",
        },
      }),
    ]);

    const uniqueSessions = new Set(
      pageviewEvents.map((event) => event.sessionId),
    ).size;

    res.status(200).json({
      data: {
        path,
        pageviews,
        uniqueSessions,
      },
    });
  } catch (error) {
    next(error);
  }
}
