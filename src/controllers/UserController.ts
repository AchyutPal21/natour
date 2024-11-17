import { CreateUserDTO } from "@dtos/user/CreateUserDTO.js";
import { HttpStatus } from "@enums/HttpStatusEnum.js";
import { UserServiceImpl } from "@implementations/UserServiceImpl.js";
import { IUserService } from "@services/IUserService.js";
import { NextFunction, Request, Response } from "express";

class UserController {
  private userService: IUserService;

  constructor() {
    this.userService = new UserServiceImpl();
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
    try {
      const { userName, userEmail, userPassword } = req.body;
      const userDto = new CreateUserDTO(userName, userEmail, userPassword);
      const user = await this.userService.createUser(userDto);
      res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      console.error(`Error while registering the user`, error);
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        data: error,
      });
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
