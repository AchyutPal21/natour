import { CreateUserDTO } from "@dtos/user/CreateUserDTO.js";
import { HttpStatus } from "@enums/HttpStatusEnum.js";
import { ResponseCode } from "@enums/ResponseCodesEnum.js";
import { UserService } from "@implementations/UserService.js";
import { IUserService } from "@services/IUserService.js";
import { NextFunction, Request, Response } from "express";

class UserController {
  private userService: IUserService;

  constructor() {
    this.userService = new UserService();
    this.registerUser = this.registerUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userName, userEmail, userPassword } = req.body;
    const userDto = new CreateUserDTO(userName, userEmail, userPassword);
    const user = await this.userService.validateAndCreateUser(userDto);
    res.status(HttpStatus.CREATED).json({
      status: "success",
      code: ResponseCode.CREATED,
      data: {
        user,
      },
    });
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
