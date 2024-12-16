import { CreateUserDTO } from "@dtos/user/CreateUserDTO.js";
import { ICreateUserDTO } from "@dtos/user/ICreateUserDTO.js";
import { ISignInUserDTO } from "@dtos/user/ISignInUserDTO.js";
import { IUserResponseDTO } from "@dtos/user/IUserResponseDTO.js";
import { SignInUserDTO } from "@dtos/user/SignInUserDTO.js";
import { UserResponseDTO } from "@dtos/user/UserResponseDTO.js";
import { BadRequestException } from "@exceptions/BadRequestException.js";
import { NotFoundException } from "@exceptions/NotFoundException.js";
import { UnauthorizedException } from "@exceptions/UnauthorizedException.js";
import { UnprocessableEntityException } from "@exceptions/UnprocessableEntityException.js";
import { IUserDocument, UserModel } from "@models/userModel.js";
import { IUserService } from "@services/IUserService.js";
import { handleMongooseException } from "@utils/handleMongooseException.js";
import {
  generateJwtAccessToken,
  generateJwtVerificationToken,
} from "@utils/jwtUtils.js";
import bcrypt from "bcrypt";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { EmailService } from "./EmailService.js";

class UserService implements IUserService {
  private userModel;

  constructor() {
    this.userModel = UserModel;
  }

  private createUserResponse(
    user: IUserDocument,
    signedJwtToken?: string
  ): IUserResponseDTO {
    return new UserResponseDTO(
      user.userName,
      user.userEmail,
      user.userRole,
      user.userIsActive,
      signedJwtToken || undefined
    );
  }

  // => REGISTER USER WITH OUT VALIDATION SERVICE
  async createUser(user: ICreateUserDTO): Promise<IUserResponseDTO> {
    try {
      const newUser = await this.userModel.create(user);
      const tourResponse = this.createUserResponse(newUser);
      return tourResponse;
    } catch (error: any) {
      handleMongooseException(error);
    }
  }

  // => REGISTER USER WITH VALIDATION INPUT SERVICE
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

  async getUserByEmailId(userEmail: string): Promise<IUserDocument> {
    const user = await this.userModel.findOne({ userEmail });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  // => USER SIGN-IN SERVICE
  async signInUser(user: ISignInUserDTO): Promise<IUserResponseDTO> {
    // 1> VALIDATE INCOMING DATA
    // Transform incoming plain object to a class instance
    const signInUserDto = plainToInstance(SignInUserDTO, user);
    // Perform validation
    const errors = await validate(signInUserDto);

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

    try {
      // 2> CHECK IF USER EXITS
      const registerUser = await this.getUserByEmailId(signInUserDto.userEmail);

      // 3> VALIDATE PASSWORD
      const isPasswordMatching = await bcrypt.compare(
        signInUserDto.userPassword,
        registerUser.userPassword
      );

      if (!isPasswordMatching) {
        throw new UnprocessableEntityException("Invalid credentials");
      }

      // 4> CHECK IF UER IS ACTIVE, ELSE SEND VERIFICATION TOKEN
      if (!registerUser.userIsActive) {
        const verificationToken = generateJwtVerificationToken(
          registerUser.userEmail
        );
        const emailService = new EmailService();
        emailService.sendVerificationEmail(
          registerUser.userName,
          registerUser.userEmail,
          verificationToken
        );
        throw new UnauthorizedException(
          "Verify your email address to login. A verification email has been sent to your register email address."
        );
      }

      // ! key "verified" is HARD CODED to TRUE value
      const signedJwtToken = generateJwtAccessToken({
        id: registerUser.userEmail,
        active: registerUser.userIsActive,
        role: registerUser.userRole,
        verified: true,
      });

      return this.createUserResponse(registerUser, signedJwtToken);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException(
          "Seems like you don't have an account, Register to login to your account."
        );
      }

      throw error;
    }
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

  // ========================VERIFICATION SERVICES=========================
  // => USER EMAIL VERIFICATION SERVICE
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
}

export { UserService };
