import { NextFunction, Request, Response } from "express";

function catchAsync(
  func: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    func(req, res, next).catch((error) => next(error));
  };
}

export { catchAsync };
