import { NODE_ENV } from "@configs/env.js";
import { HttpStatus } from "@enums/HttpStatusEnum.js";
import { ResponseCode } from "@enums/ResponseCodesEnum.js";
import { BadRequestException } from "@exceptions/BadRequestException.js";
import { TokenExpiredException } from "@exceptions/TokenExpiredException.js";
import { UnauthorizedException } from "@exceptions/UnauthorizedException.js";
import { EmailService } from "@implementations/EmailService.js";
import { UserService } from "@implementations/UserService.js";
import { IUserService } from "@services/IUserService.js";
import {
  generateJwtRefreshToken,
  generateJwtVerificationToken,
  verifyJwtToken,
} from "@utils/jwtUtils.js";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class UserController {
  private readonly userService: IUserService;

  constructor() {
    this.userService = new UserService();
    this.registerUser = this.registerUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.verifyUserEmail = this.verifyUserEmail.bind(this);
    this.signInUser = this.signInUser.bind(this);
  }

  // => SING-UP USER CONTROLLER
  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userName, userEmail, userPassword } = req.body;
    const user = await this.userService.validateAndCreateUser({
      userName,
      userEmail,
      userPassword,
    });

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

  // => SIGN-IN USER CONTROLLER
  async signInUser(req: Request, res: Response, next: NextFunction) {
    const { userEmail, userPassword } = req.body;
    const signInDto = await this.userService.signInUser({
      userEmail,
      userPassword,
    });
    const refreshToken = generateJwtRefreshToken(signInDto.userEmail);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiration
    });

    res.status(HttpStatus.CREATED).json({
      status: "success",
      code: ResponseCode.CREATED,
      data: {
        accessToken: signInDto.jwtSignToken,
      },
    });
  }

  // => USER EMAIL ADDRESS VERIFICATION CONTROLLER CONTROLLER
  async verifyUserEmail(req: Request, res: Response, next: NextFunction) {
    const token = req.query.token as string;

    if (!token) {
      throw new BadRequestException("Invalid verification url");
    }

    try {
      const payload = verifyJwtToken(token);
      const { userEmail } = payload;

      if (!userEmail) {
        throw new UnauthorizedException("Invalid token");
      }

      await this.userService.updateUserEmailVerification(userEmail);
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

  async getUser(req: Request, res: Response, next: NextFunction) {
    res.status(200).send("Received");
  }
  async getUsers(req: Request, res: Response, next: NextFunction) {}
  async updateUser(req: Request, res: Response, next: NextFunction) {}
  async deleteUser(req: Request, res: Response, next: NextFunction) {}
}

export default new UserController();
