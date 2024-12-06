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
    throw new BadRequestException("Invalid ID format", {
      detail: error.message,
    });
  }

  if (error.code === 11000) {
    throw new ConflictException("Duplicate key error", {
      detail: "Duplicate unique field detected",
    });
  }

  throw new InternalException("Unexpected error occurred", {
    detail: error.message,
  });
}

export { handleMongooseException };
