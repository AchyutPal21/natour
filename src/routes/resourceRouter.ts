import { router as tourRouter } from "@routes/tourRouter.js";
import { router as userRouter } from "@routes/userRouter.js";
import { Router } from "express";

const resourceRouter = Router();

resourceRouter.use("/tours", tourRouter);
resourceRouter.use("/users", userRouter);

export { resourceRouter };
