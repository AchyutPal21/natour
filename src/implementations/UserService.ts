import { ICreateUserDTO } from "@dtos/user/ICreateUserDTO.js";
import { IUserResponseDTO } from "@dtos/user/IUserResponseDTO.js";
import { IUserService } from "@services/IUserService.js";

class UserService implements IUserService {
  createUser(user: ICreateUserDTO): Promise<IUserResponseDTO> {
    throw new Error("Method not implemented.");
  }
  getUserByEmailId(userEmail: string): Promise<IUserResponseDTO> {
    throw new Error("Method not implemented.");
  }
  updateUserPasswordByEmailId(userEmail: string): Promise<IUserResponseDTO> {
    throw new Error("Method not implemented.");
  }
  activateUserAccount(userEmail: string): Promise<IUserResponseDTO> {
    throw new Error("Method not implemented.");
  }
  deactivateUserAccount(userEmail: string): Promise<IUserResponseDTO> {
    throw new Error("Method not implemented.");
  }
  promoteUserPower(userEmail: string): Promise<IUserResponseDTO> {
    throw new Error("Method not implemented.");
  }
  demoteUserPoser(userEmail: string): Promise<IUserResponseDTO> {
    throw new Error("Method not implemented.");
  }
}

export { UserService };
