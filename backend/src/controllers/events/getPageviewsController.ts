import { getEventsCollection } from "@website/core";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const getPageviewsQuerySchema = z.object({
  path: z.string().min(1).max(512),
});

const aggregationCountSchema = z.object({
  count: z.number(),
});

const pageviewsAggregationResultSchema = z
  .object({
    pageviews: z.array(aggregationCountSchema).optional(),
    uniqueSessions: z.array(aggregationCountSchema).optional(),
  })
  .array();

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

    const [metrics] = pageviewsAggregationResultSchema.parse(
      await getEventsCollection()
        .aggregate([
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
        ])
        .toArray(),
    );

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
