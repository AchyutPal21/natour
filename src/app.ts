import { NotFoundException } from "@exceptions/NotFoundException.js";
import { globalExceptionHandler } from "@middlewares/exceptions/globalExceptionHandler.js";
import { rootRouter } from "@routes/rootRouter.js";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { NODE_ENV } from "./configs/env.js";

const app = express();

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api", rootRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundException("Path not found"));
});

app.use(globalExceptionHandler);

export { app };
