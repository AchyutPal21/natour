import { UserEntity } from "@entities/user/UserEntity.js";
import { IUserRepository } from "../interfaces/IUserRepository.js";
import { UserModel } from "../model/userModel.js";

class UserRepositoryImpl implements IUserRepository {
  async createUser(userEntity: UserEntity): Promise<UserEntity> {
    const user = await UserModel.create({
      userName: userEntity.userName,
      userEmail: userEntity.userEmail,
      userPassword: userEntity.userPassword,
      userIsActive: userEntity.userIsActive,
      userRole: userEntity.userRole,
    });

    return new UserEntity(
      user._id.toString(),
      user.userName,
      user.userEmail,
      user.userPassword,
      user.userRole,
      user.userIsActive,
      user.createdAt!,
      user.updatedAt!
    );
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<UserEntity | null> {
    throw new Error("Method not implemented.");
  }
}

export { UserRepositoryImpl };
