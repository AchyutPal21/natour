import { router as tourRouter } from "@routes/tourRouter.js";
import { Router } from "express";

const resourceRouter = Router();

resourceRouter.use("/tours", tourRouter);

export { resourceRouter };
