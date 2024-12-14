import jwt from "jsonwebtoken";

interface IJwtPayloadExtended extends jwt.JwtPayload {
  email: string;
}

export { IJwtPayloadExtended };
