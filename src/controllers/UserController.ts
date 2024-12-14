import { CreateUserDTO } from "@dtos/user/CreateUserDTO.js";
import { HttpStatus } from "@enums/HttpStatusEnum.js";
import { ResponseCode } from "@enums/ResponseCodesEnum.js";
import { BadRequestException } from "@exceptions/BadRequestException.js";
import { TokenExpiredException } from "@exceptions/TokenExpiredException.js";
import { EmailService } from "@implementations/EmailService.js";
import { UserService } from "@implementations/UserService.js";
import { IUserService } from "@services/IUserService.js";
import {
  generateJwtVerificationToken,
  verifyJwtVerificationToken,
} from "@utils/jwtUtils.js";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class UserController {
  private userService: IUserService;

  constructor() {
    this.userService = new UserService();
    this.registerUser = this.registerUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.verifyUserEmail = this.verifyUserEmail.bind(this);
  }

  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userName, userEmail, userPassword } = req.body;
    const userDto = new CreateUserDTO(userName, userEmail, userPassword);
    const user = await this.userService.validateAndCreateUser(userDto);

    // Generating verification token
    const verificationToken = generateJwtVerificationToken(user.userEmail);

    // Send the verification email
    const emailService = new EmailService();
    emailService.sendVerificationEmail(
      user.userName,
      user.userEmail,
      verificationToken
    );

    res.status(HttpStatus.CREATED).json({
      status: "success",
      code: ResponseCode.CREATED,
      data: {
        message:
          "Registration successful. A verification email has been sent to your email address.",
      },
    });
  }

  async verifyUserEmail(req: Request, res: Response, next: NextFunction) {
    const token = req.query.token as string;

    if (!token) {
      throw new BadRequestException("Invalid verification url");
    }

    try {
      const payload = verifyJwtVerificationToken(token);
      const { email } = payload;
      await this.userService.updateUserEmailVerification(email);
      res.status(HttpStatus.OK).json({
        status: "success",
        code: ResponseCode.OK,
        data: {
          message: "Email verified successfully.",
        },
      });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new TokenExpiredException("Token is invalid or expired");
      }

      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        data: "hello from the server",
      });
    } catch (error) {}
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    const tourData = req.body;
    try {
    } catch (error) {}
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const tourData = req.body;
    try {
    } catch (error) {}
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const tourData = req.body;
    try {
    } catch (error) {}
  }
}

export default new UserController();
