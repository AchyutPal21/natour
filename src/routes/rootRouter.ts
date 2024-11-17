import { Router } from "express";
import { resourceRouter } from "./resourceRouter.js";

const rootRouter = Router();

rootRouter.use("/v1", resourceRouter);

export { rootRouter };
