import { UserRole } from "@enums/UserRoleEnum.js";
import { IUserEntity } from "./IUserEntity.js";

class UserEntity implements IUserEntity {
  constructor(
    public userId: string,
    public userName: string,
    public userEmail: string,
    public userPassword: string,
    public userRole: UserRole,
    public userIsActive: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

export { UserEntity };
