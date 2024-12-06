import { ErrorDetails, IHttpException } from "./IHttpException.js";

class HttpException extends Error implements IHttpException {
  public statusCode: number;
  public responseCode: number;
  public status: string;
  public errorDetails?: ErrorDetails;

  constructor(
    message: string,
    statusCode: number,
    responseCode: number,
    status: string,
    errorDetails?: ErrorDetails
  ) {
    super(message);
    this.statusCode = statusCode;
    this.responseCode = responseCode;
    this.status = status;
    this.errorDetails = errorDetails || null;
  }
}

export { HttpException };
