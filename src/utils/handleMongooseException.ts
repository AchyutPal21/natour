import { NODE_ENV } from "@configs/env.js";
import { BadRequestException } from "@exceptions/BadRequestException.js";
import { ConflictException } from "@exceptions/ConflictException.js";
import { HttpException } from "@exceptions/HttpException.js";
import { InternalException } from "@exceptions/InternalException.js";

function handleMongooseException(error: any): never {
  if (error instanceof HttpException) {
    throw error;
  }

  if (error.name === "ValidationError") {
    throw new BadRequestException("Validation failed", {
      detail: error.message,
    });
  }

  if (error.name === "CastError") {
    let path: string = error.path.startsWith("_")
      ? error.path.slice(1)
      : error.path;
    throw new BadRequestException("Invalid ID format", {
      detail: "Invalid ID",
      reason: [{ [path]: error.value }],
    });
  }

  if (error.code === 11000) {
    throw new ConflictException("Duplicate key error", {
      detail: "Duplicate unique field detected",
      reason: [error.errorResponse.keyValue],
    });
  }

  throw new InternalException("Unexpected error occurred", {
    detail: error.message,
    ...(NODE_ENV === "development" && { reason: [error.stack] }),
  });
}

export { handleMongooseException };
