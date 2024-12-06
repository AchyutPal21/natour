import { HttpStatus } from "@enums/HttpStatusEnum.js";
import { ResponseCode } from "@enums/ResponseCodesEnum.js";
import { HttpException } from "./HttpException.js";
import { ErrorDetails } from "./IHttpException.js";

class UnprocessableEntityException extends HttpException {
  constructor(message: string, errorDetails?: ErrorDetails) {
    super(
      message,
      HttpStatus.UNPROCESSABLE_ENTITY,
      ResponseCode.UNPROCESSABLE_ENTITY,
      "error",
      errorDetails
    );
  }
}

export { UnprocessableEntityException };
