import { HttpStatus } from "@enums/HttpStatusEnum.js";
import { ResponseCode } from "@enums/ResponseCodesEnum.js";
import { HttpException } from "./HttpException.js";
import { ErrorDetails } from "./IHttpException.js";

class UnauthorizedException extends HttpException {
  constructor(message: string, errorDetails?: ErrorDetails) {
    super(
      message,
      HttpStatus.UNAUTHORIZED,
      ResponseCode.UNAUTHORIZED,
      "error",
      errorDetails
    );
  }
}

export { UnauthorizedException };
