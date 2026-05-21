import { prisma } from "@website/core";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const getPageviewsQuerySchema = z.object({
  path: z.string().min(1).max(512),
});

type PageviewsAggregationResult = {
  pageviews?: Array<{ count: number }>;
  uniqueSessions?: Array<{ count: number }>;
};

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

    const [metrics] = (await prisma.event.aggregateRaw({
      pipeline: [
        { $match: { path, type: "pageview" } },
        {
          $facet: {
            pageviews: [{ $count: "count" }],
            uniqueSessions: [
              { $group: { _id: "$sessionId" } },
              { $count: "count" },
            ],
          },
        },
      ],
    })) as PageviewsAggregationResult[];

    const pageviews = metrics?.pageviews?.[0]?.count ?? 0;
    const uniqueSessions = metrics?.uniqueSessions?.[0]?.count ?? 0;

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
