import { HttpStatus } from "@enums/HttpStatusEnum.js";
import { ResponseCode } from "@enums/ResponseCodesEnum.js";
import { HttpException } from "./HttpException.js";
import { ErrorDetails } from "./IHttpException.js";

class NotFoundException extends HttpException {
  constructor(message: string, errorDetails?: ErrorDetails) {
    super(
      message,
      HttpStatus.NOT_FOUND,
      ResponseCode.NOT_FOUND,
      "error",
      errorDetails
    );
  }
}

export { NotFoundException };
