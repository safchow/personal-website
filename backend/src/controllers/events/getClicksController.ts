import { prisma } from "@website/core";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const getClicksQuerySchema = z.object({
  path: z.string().min(1),
  target: z.string().min(1),
});

/**
 * Returns target-level click analytics for a given path.
 *
 * Response shape:
 * - `path`: the route the metrics were calculated for
 * - `target`: the click target the metrics were calculated for
 * - `count`: total number of click events recorded for the target on the path
 */
export async function getClicksController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { path, target } = getClicksQuerySchema.parse(req.query);

    const count = await prisma.event.count({
      where: {
        path,
        target,
        type: "click",
      },
    });

    res.status(200).json({
      data: {
        path,
        target,
        count,
      },
    });
  } catch (error) {
    next(error);
  }
}
