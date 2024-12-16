import { ICreateUserDTO } from "@dtos/user/ICreateUserDTO.js";
import { ISignInUserDTO } from "@dtos/user/ISignInUserDTO.js";
import { IUserResponseDTO } from "@dtos/user/IUserResponseDTO.js";
import { IUserDocument } from "@models/userModel.js";

interface IUserService {
  createUser(user: ICreateUserDTO): Promise<IUserResponseDTO>;
  validateAndCreateUser(user: ICreateUserDTO): Promise<IUserResponseDTO>;

  getUserByEmailId(userEmail: string): Promise<IUserDocument>;

  signInUser(user: ISignInUserDTO): Promise<IUserResponseDTO>;

  updateUserEmailVerification(
    userEmail: string
  ): Promise<IUserResponseDTO | null>;
  updateUserPasswordByEmailId(userEmail: string): Promise<IUserResponseDTO>;

  promoteUser(userEmail: string): Promise<IUserResponseDTO>;
  demoteUser(userEmail: string): Promise<IUserResponseDTO>;
}

export { IUserService };
