import { UserRole } from "@enums/UserRoleEnum.js";

interface IAuthUser {
  userEmail: string;
  userIsActive: boolean;
  userRole: UserRole;
}

export { IAuthUser };
