import { router as locationRouter } from "@routes/locationRouter.js";
import { router as tourRouter } from "@routes/tourRouter.js";
import { router as userRouter } from "@routes/userRouter.js";
import { Router } from "express";

const resourceRouter = Router();

resourceRouter.use("/users", userRouter);
resourceRouter.use("/tours", tourRouter);
resourceRouter.use("/locations", locationRouter);

export { resourceRouter };
