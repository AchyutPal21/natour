import { UserRole } from "@enums/UserRoleEnum.js";
import { UnauthorizedException } from "@exceptions/UnauthorizedException.js";
import { NextFunction, Request, Response } from "express";

function adminAuthorization(req: Request, res: Response, next: NextFunction) {
  if (!("user" in res.locals)) {
    return next(new UnauthorizedException("Unauthorized access"));
  }

  const { userRole } = res.locals["user"];
  if (!userRole) {
    return next(new UnauthorizedException("Not an authorized user"));
  }

  if (userRole !== UserRole.ADMIN) {
    return next(new UnauthorizedException("No authorized permissions"));
  }

  return next();
}

export { adminAuthorization };
