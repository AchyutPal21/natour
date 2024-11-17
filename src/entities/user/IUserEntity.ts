import { UserRole } from "@enums/UserRoleEnum.js";

interface IUserEntity {
  userId: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: UserRole;
  userIsActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export { IUserEntity };
