import { NotFoundException } from "@exceptions/NotFoundException.js";
import { globalExceptionHandler } from "@middlewares/exceptions/globalExceptionHandler.js";
import { rootRouter } from "@routes/rootRouter.js";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { NODE_ENV } from "./configs/env.js";

import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173", // React app's URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Enable cookies and credentials
};

const app = express();

if (NODE_ENV === "development") {
  app.use(cors(corsOptions));
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api", rootRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundException("Path not found"));
});

app.use(globalExceptionHandler);

export { app };
