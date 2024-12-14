import { HttpStatus } from "@enums/HttpStatusEnum.js";
import { ResponseCode } from "@enums/ResponseCodesEnum.js";
import { HttpException } from "./HttpException.js";
import { ErrorDetails } from "./IHttpException.js";

class TokenExpiredException extends HttpException {
  constructor(message: string, errorDetails?: ErrorDetails) {
    super(message, HttpStatus.GONE, ResponseCode.GONE, "error", errorDetails);
  }
}

export { TokenExpiredException };
