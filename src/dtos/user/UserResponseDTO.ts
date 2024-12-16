import { IUserResponseDTO } from "./IUserResponseDTO.js";

class UserResponseDTO implements IUserResponseDTO {
  public userName: string;
  public userEmail: string;
  public userRole: string;
  public userIsActive: boolean;
  public jwtSignToken?: string | undefined;
  constructor(
    userName: string,
    userEmail: string,
    userRole: string,
    userIsActive: boolean,
    jwtSignToken?: string | undefined
  ) {
    this.userName = userName;
    this.userEmail = userEmail;
    this.userRole = userRole;
    this.userIsActive = userIsActive;
    this.jwtSignToken = jwtSignToken || undefined;
  }
}

export { UserResponseDTO };
