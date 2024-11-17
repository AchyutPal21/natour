import { UserEntity } from "@entities/user/UserEntity.js";

interface IUserRepository {
  createUser(userEntity: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
}

export { IUserRepository };
