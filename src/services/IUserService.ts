import { ICreateUserDTO } from "@dtos/user/ICreateUserDTO.js";
import { IUserResponseDTO } from "@dtos/user/IUserResponseDTO.js";

interface IUserService {
  createUser(user: ICreateUserDTO): Promise<IUserResponseDTO>;
  getUserByEmailId(userEmail: string): Promise<IUserResponseDTO>;
  updateUserPasswordByEmailId(userEmail: string): Promise<IUserResponseDTO>;
  activateUserAccount(userEmail: string): Promise<IUserResponseDTO>;
  deactivateUserAccount(userEmail: string): Promise<IUserResponseDTO>;
  promoteUserPower(userEmail: string): Promise<IUserResponseDTO>;
  demoteUserPoser(userEmail: string): Promise<IUserResponseDTO>;
}

export { IUserService };
