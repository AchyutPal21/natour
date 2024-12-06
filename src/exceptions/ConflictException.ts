import { HttpStatus } from "@enums/HttpStatusEnum.js";
import { ResponseCode } from "@enums/ResponseCodesEnum.js";
import { HttpException } from "./HttpException.js";
import { ErrorDetails } from "./IHttpException.js";

class ConflictException extends HttpException {
  constructor(message: string, errorDetails?: ErrorDetails) {
    super(
      message,
      HttpStatus.BAD_REQUEST,
      ResponseCode.BAD_REQUEST,
      "error",
      errorDetails
    );
  }
}

export { ConflictException };
