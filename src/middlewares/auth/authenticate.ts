import { TokenExpiredException } from "@exceptions/TokenExpiredException.js";
import { UnauthorizedException } from "@exceptions/UnauthorizedException.js";
import { IAuthUser } from "@shared/interfaces/IAuthUser.js";
import { verifyJwtToken } from "@utils/jwtUtils.js";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function authenticate(req: Request, res: Response, next: NextFunction) {
  // Check if the token is present "Bearer <Token>"
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return next(new UnauthorizedException("Not Authorized"));
  }

  // auth token
  let token: string = "";

  if (authHeader.split(" ").length === 2 && authHeader.split(" ")[1]) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return next(new UnauthorizedException("Unauthorized Request"));
  }

  try {
    const accessPayload = verifyJwtToken(token);
    const { id, active, role } = accessPayload;
    console.log(accessPayload);
    if (!id || !active || !role) {
      return next(new UnauthorizedException("Unauthorized"));
    }
    const authUser: IAuthUser = {
      userEmail: id,
      userIsActive: active,
      userRole: role,
    };

    res.locals["user"] = authUser;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new TokenExpiredException("Expired Token"));
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return next(new UnauthorizedException("Unauthorized"));
    }

    next(error);
  }
}

export { authenticate };
