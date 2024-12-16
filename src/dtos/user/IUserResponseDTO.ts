interface IUserResponseDTO {
  userName: string;
  userEmail: string;
  userRole: string;
  userIsActive: boolean;
  jwtSignToken?: string | undefined;
}

export { IUserResponseDTO };
