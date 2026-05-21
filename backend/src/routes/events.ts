import {
  createEventController,
  createEventSchema,
} from "@/controllers/events/createEventController.js";
import { getClicksController } from "@/controllers/events/getClicksController.js";
import { getPageviewsController } from "@/controllers/events/getPageviewsController.js";
import { listEventsController } from "@/controllers/events/listEventsController.js";
import { requireAdminKey } from "@/middleware/adminKey.js";
import { requireAnalyticsOrigin } from "@/middleware/analyticsOrigin.js";
import {
  analyticsReadRateLimiter,
  analyticsWriteRateLimiter,
} from "@/middleware/rateLimit.js";
import { validate } from "@/middleware/validation.js";
import { Router } from "express";

const router: ReturnType<typeof Router> = Router();

router.get(
  "/",
  analyticsReadRateLimiter,
  requireAdminKey,
  listEventsController,
);
router.get(
  "/pageviews",
  analyticsReadRateLimiter,
  requireAdminKey,
  getPageviewsController,
);
router.get(
  "/clicks",
  analyticsReadRateLimiter,
  requireAdminKey,
  getClicksController,
);
router.post(
  "/",
  analyticsWriteRateLimiter,
  requireAnalyticsOrigin,
  validate(createEventSchema),
  createEventController,
);

export default router;
