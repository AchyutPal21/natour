import { ICreateUserDTO } from "@dtos/user/ICreateUserDTO.js";
import { IUserResponseDTO } from "@dtos/user/IUserResponseDTO.js";
import { UserResponseDTO } from "@dtos/user/UserResponseDTO.js";
import { UserEntity } from "@entities/user/UserEntity.js";
import { UserRole } from "@enums/UserRoleEnum.js";
import { UserRepositoryImpl } from "@repositories/user/impl/UserRepositoryImpl.js";
import { IUserService } from "@services/IUserService.js";

class UserServiceImpl implements IUserService {
  private userRepository: UserRepositoryImpl;

  constructor() {
    this.userRepository = new UserRepositoryImpl();
  }

  public async createUser(
    createUserDto: ICreateUserDTO
  ): Promise<IUserResponseDTO> {
    const userEntity = new UserEntity(
      "",
      createUserDto.userName,
      createUserDto.userEmail,
      createUserDto.userPassword,
      UserRole.USER,
      false,
      new Date(),
      new Date()
    );

    const user = await this.userRepository.createUser(userEntity);

    return new UserResponseDTO(
      user.userName,
      user.userEmail,
      user.userRole,
      user.userIsActive
    );
  }

  public updateUserByEmailId(userEmail: string): Promise<IUserResponseDTO> {
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

export { UserServiceImpl };
