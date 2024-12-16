import { UserRole } from "@enums/UserRoleEnum.js";
import jwt from "jsonwebtoken";

interface IJwtPayloadExtended extends jwt.JwtPayload {
  username: string;
  userEmail: string;
  userIsActive: boolean;
  userRole: UserRole;
}

export { IJwtPayloadExtended };
