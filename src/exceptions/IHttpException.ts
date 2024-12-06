type ErrorDetails = {
  detail?: string;
  reason?: { [key: string]: string }[];
} | null;

interface IHttpException {
  statusCode: number;
  responseCode: number;
  status: string;
  errorDetails?: ErrorDetails;
}

export { ErrorDetails, IHttpException };
