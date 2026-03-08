import { Router } from "express";
import eventsRouter from "./events.js";

const router: ReturnType<typeof Router> = Router();

router.get("/healthcheck", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

router.use("/events", eventsRouter);

export default router;
