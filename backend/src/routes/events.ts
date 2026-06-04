import {
  createEventController,
  createEventSchema,
} from "@/controllers/events/createEventController.js";
import { getEventStatsController } from "@/controllers/events/getEventStatsController.js";
import { listEventsController } from "@/controllers/events/listEventsController.js";
import { requireAdminKey } from "@/middleware/adminKey.js";
import { validate } from "@/middleware/validation.js";
import { Router } from "express";

const router: ReturnType<typeof Router> = Router();

router.get("/", requireAdminKey, listEventsController);
router.get("/stats", getEventStatsController);
router.post("/", validate(createEventSchema), createEventController);

export default router;
