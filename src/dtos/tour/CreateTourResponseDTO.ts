import { ICreateTourResponseDTO } from "./ICreateTourResponseDTO.js";

class CreateTourResponseDTO implements ICreateTourResponseDTO {
  constructor(
    public tourId: string,
    public tourName: string,
    public rating: number,
    public price: number
  ) {}
}

export { CreateTourResponseDTO };
