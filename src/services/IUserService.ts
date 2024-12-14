import { ICreateUserDTO } from "@dtos/user/ICreateUserDTO.js";
import { IUserResponseDTO } from "@dtos/user/IUserResponseDTO.js";

interface IUserService {
  createUser(user: ICreateUserDTO): Promise<IUserResponseDTO>;
  validateAndCreateUser(user: ICreateUserDTO): Promise<IUserResponseDTO>;
  getUserByEmailId(userEmail: string): Promise<IUserResponseDTO>;
  updateUserPasswordByEmailId(userEmail: string): Promise<IUserResponseDTO>;
  updateUserEmailVerification(
    userEmail: string
  ): Promise<IUserResponseDTO | null>;
  promoteUser(userEmail: string): Promise<IUserResponseDTO>;
  demoteUser(userEmail: string): Promise<IUserResponseDTO>;
}

export { IUserService };
