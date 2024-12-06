import { HttpStatus } from "@enums/HttpStatusEnum.js";
import { ResponseCode } from "@enums/ResponseCodesEnum.js";
import { HttpException } from "./HttpException.js";
import { ErrorDetails } from "./IHttpException.js";

class InternalException extends HttpException {
  constructor(message: string, errorDetails?: ErrorDetails) {
    super(
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      ResponseCode.INTERNAL_SERVER_ERROR,
      "error",
      errorDetails
    );
  }
}

export { InternalException };
