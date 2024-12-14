import { CreateUserDTO } from "@dtos/user/CreateUserDTO.js";
import { ICreateUserDTO } from "@dtos/user/ICreateUserDTO.js";
import { IUserResponseDTO } from "@dtos/user/IUserResponseDTO.js";
import { UserResponseDTO } from "@dtos/user/UserResponseDTO.js";
import { BadRequestException } from "@exceptions/BadRequestException.js";
import { NotFoundException } from "@exceptions/NotFoundException.js";
import { IUserDocument, UserModel } from "@models/userModel.js";
import { IUserService } from "@services/IUserService.js";
import { handleMongooseException } from "@utils/handleMongooseException.js";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

class UserService implements IUserService {
  private userModel;

  constructor() {
    this.userModel = UserModel;
  }

  private createUserResponse(user: IUserDocument): IUserResponseDTO {
    return new UserResponseDTO(
      user.userName,
      user.userEmail,
      user.userRole,
      user.userIsActive
    );
  }

  async createUser(user: ICreateUserDTO): Promise<IUserResponseDTO> {
    try {
      const newUser = await this.userModel.create(user);
      const tourResponse = this.createUserResponse(newUser);
      return tourResponse;
    } catch (error: any) {
      handleMongooseException(error);
    }
  }

  async validateAndCreateUser(user: ICreateUserDTO): Promise<IUserResponseDTO> {
    // Transform incoming plain object to a class instance
    const createUserDto = plainToInstance(CreateUserDTO, user);
    // Perform validation
    const errors = await validate(createUserDto);

    if (errors.length) {
      const reason = errors.map((error) => {
        const constraints = Object.values(error.constraints || {});
        return {
          [error.property]: constraints.length
            ? constraints[0]
            : "Invalid field type",
        };
      });

      throw new BadRequestException("Bad Request", {
        detail: "Invalid fields type",
        reason,
      });
    }

    return await this.createUser(createUserDto);
  }

  // Initial email verification when user sign-up
  async updateUserEmailVerification(
    userEmail: string
  ): Promise<IUserResponseDTO | null> {
    const user = await this.getUserByEmailId(userEmail);
    if (user.userIsActive) {
      throw new BadRequestException("Email is already verified");
    }

    const updatedUser = await this.userModel.findOneAndUpdate(
      { userEmail: user.userEmail },
      { userIsActive: true },
      { runValidators: true, new: true }
    );

    if (!updatedUser) {
      throw new NotFoundException("User not found during update");
    }

    return this.createUserResponse(updatedUser);
  }

  async getUserByEmailId(userEmail: string): Promise<IUserResponseDTO> {
    const user = await this.userModel.findOne({ userEmail });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  updateUserPasswordByEmailId(userEmail: string): Promise<IUserResponseDTO> {
    throw new Error("Method not implemented.");
  }

  promoteUser(userEmail: string): Promise<IUserResponseDTO> {
    throw new Error("Method not implemented.");
  }
  demoteUser(userEmail: string): Promise<IUserResponseDTO> {
    throw new Error("Method not implemented.");
  }
}

export { UserService };
