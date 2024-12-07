import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import { ICreateUserDTO } from "./ICreateUserDTO.js";

class CreateUserDTO implements ICreateUserDTO {
  @IsString()
  userName: string;

  @IsEmail()
  userEmail: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { always: true }
  )
  userPassword: string;

  constructor(userName: string, userEmail: string, userPassword: string) {
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
  }
}

export { CreateUserDTO };
