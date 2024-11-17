import { IUserResponseDTO } from "./IUserResponseDTO.js";

class UserResponseDTO implements IUserResponseDTO {
  constructor(
    public userName: string,
    public userEmail: string,
    public userRole: string,
    public userIsActive: boolean
  ) {}
}

export { UserResponseDTO };
