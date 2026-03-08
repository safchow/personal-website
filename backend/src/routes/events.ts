import { createEventController, createEventSchema } from "@/controllers/events/createEventController.js";
import { validate } from "@/middleware/validation.js";
import { Router } from "express";

const router: ReturnType<typeof Router> = Router();

router.post("/", validate(createEventSchema), createEventController);

export default router;
