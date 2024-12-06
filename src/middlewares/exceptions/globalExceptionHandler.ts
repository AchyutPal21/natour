import { NODE_ENV } from "@configs/env.js";
import { HttpStatus } from "@enums/HttpStatusEnum.js";
import { ResponseCode } from "@enums/ResponseCodesEnum.js";
import { HttpException } from "@exceptions/HttpException.js";
import { NextFunction, Request, Response } from "express";

function globalExceptionHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof HttpException) {
    res.status(error.statusCode).json({
      code: error.responseCode,
      status: error.status,
      message: error.message,
      ...(error.errorDetails && { errorDetails: error.errorDetails }),
    });
  } else {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: ResponseCode.INTERNAL_SERVER_ERROR,
      status: "error",
      message: "Something went wrong!!!",
      ...(NODE_ENV === "development" && { errorDetails: error.stack }),
    });
  }
}

export { globalExceptionHandler };
