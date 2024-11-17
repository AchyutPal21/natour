import { ICreateUserDTO } from "./ICreateUserDTO.js";

class CreateUserDTO implements ICreateUserDTO {
  constructor(
    public userName: string,
    public userEmail: string,
    public userPassword: string
  ) {}
}

export { CreateUserDTO };
