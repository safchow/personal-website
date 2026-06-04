import { getEventsCollection } from "@website/core";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const getEventStatsQuerySchema = z.object({
  path: z.string().min(1).max(512),
  type: z.enum(["click", "pageview"]).optional(),
  target: z.string().min(1).optional(),
});

const aggregationCountSchema = z.object({ count: z.number() });

const statsAggregationResultSchema = z
  .object({
    total: z.array(aggregationCountSchema).optional(),
    uniqueSessions: z.array(aggregationCountSchema).optional(),
  })
  .array();

/**
 * Returns aggregate analytics for events on a path, optionally narrowed by
 * `type` (click|pageview) and `target`. Replaces the per-type clicks/pageviews
 * controllers with a single endpoint.
 *
 * Response shape:
 * - `path`, `type`, `target`: the filters used (null when not provided)
 * - `count`: total events matching the filters
 * - `uniqueSessions`: distinct anonymous sessions among those events
 */
export async function getEventStatsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { path, type, target } = getEventStatsQuerySchema.parse(req.query);

    const match: Record<string, string> = { path };
    if (type) match.type = type;
    if (target) match.target = target;

    const [metrics] = statsAggregationResultSchema.parse(
      await getEventsCollection()
        .aggregate([
          { $match: match },
          {
            $facet: {
              total: [{ $count: "count" }],
              uniqueSessions: [
                { $group: { _id: "$sessionId" } },
                { $count: "count" },
              ],
            },
          },
        ])
        .toArray(),
    );

    res.status(200).json({
      data: {
        path,
        type: type ?? null,
        target: target ?? null,
        count: metrics?.total?.[0]?.count ?? 0,
        uniqueSessions: metrics?.uniqueSessions?.[0]?.count ?? 0,
      },
    });
  } catch (error) {
    next(error);
  }
}
