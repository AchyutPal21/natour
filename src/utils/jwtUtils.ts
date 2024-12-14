import {
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  JWT_SECRET,
  JWT_VERIFICATION_TOKEN_EXPIRES_IN,
} from "@configs/env.js";
import { IJwtPayloadExtended } from "@shared/interfaces/IJwtPayloadExtended.js";
import { UserAccessTokenPayload } from "@shared/types/userTypes.js";
import jwt from "jsonwebtoken";

function generateJwtRefreshToken(id: string): string {
  return jwt.sign({ id }, JWT_SECRET, {
    algorithm: "HS512",
    expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
  });
}

function generateJwtAccessToken(userPayload: UserAccessTokenPayload): string {
  return jwt.sign({ ...userPayload }, JWT_SECRET, {
    algorithm: "HS512",
    expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
  });
}

function generateJwtVerificationToken(email: string): string {
  return jwt.sign({ email }, JWT_SECRET, {
    algorithm: "HS512",
    expiresIn: JWT_VERIFICATION_TOKEN_EXPIRES_IN,
  });
}

function verifyJwtVerificationToken(token: string): IJwtPayloadExtended {
  return jwt.verify(token, JWT_SECRET) as IJwtPayloadExtended;
}

export {
  generateJwtAccessToken,
  generateJwtRefreshToken,
  generateJwtVerificationToken,
  verifyJwtVerificationToken,
};
