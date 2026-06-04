import {
  createEventController,
  createEventSchema,
} from "@/controllers/events/createEventController.js";
import { getEventStatsController } from "@/controllers/events/getEventStatsController.js";
import { listEventsController } from "@/controllers/events/listEventsController.js";
import { requireAnalyticsOrigin } from "@/middleware/analyticsOrigin.js";
import {
  analyticsReadRateLimiter,
  analyticsWriteRateLimiter,
} from "@/middleware/rateLimit.js";
import { validate } from "@/middleware/validation.js";
import { Router } from "express";

const router: ReturnType<typeof Router> = Router();

router.get("/", analyticsReadRateLimiter, listEventsController);
router.get("/stats", analyticsReadRateLimiter, getEventStatsController);
router.post(
  "/",
  analyticsWriteRateLimiter,
  requireAnalyticsOrigin,
  validate(createEventSchema),
  createEventController,
);

export default router;
