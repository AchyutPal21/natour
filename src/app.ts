import { rootRouter } from "@routes/rootRouter.js";
import express from "express";
import morgan from "morgan";
import { NODE_ENV } from "./configs/env.js";

const app = express();

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api", rootRouter);

export { app };
