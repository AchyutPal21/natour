import { NextFunction, Request, Response } from "express";

function validateId(resourceId: string) {
  return function (
    req: Request,
    res: Response,
    next: NextFunction,
    value: number
  ) {
    console.log(`Validating id: ${value} for: ${resourceId} resource`);
    next();
  };
}

export { validateId };
