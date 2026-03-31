import {
  createEventController,
  createEventSchema,
} from "@/controllers/events/createEventController.js";
import { getClicksController } from "@/controllers/events/getClicksController.js";
import { getPageviewsController } from "@/controllers/events/getPageviewsController.js";
import { listEventsController } from "@/controllers/events/listEventsController.js";
import { requireAdminKey } from "@/middleware/adminKey.js";
import { validate } from "@/middleware/validation.js";
import { Router } from "express";

const router: ReturnType<typeof Router> = Router();

router.get("/", requireAdminKey, listEventsController);
router.get("/pageviews", getPageviewsController);
router.get("/clicks", getClicksController);
router.post("/", validate(createEventSchema), createEventController);

export default router;
