import { IsEmail, IsStrongPassword } from "class-validator";
import { ISignInUserDTO } from "./ICreateUserDTO.js";

class SignInUserDTO implements ISignInUserDTO {
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

  constructor(userEmail: string, userPassword: string) {
    this.userEmail = userEmail;
    this.userPassword = userPassword;
  }
}

export { SignInUserDTO };
