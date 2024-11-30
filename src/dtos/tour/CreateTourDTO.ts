import { ICreateTourDTO } from "./ICreateTourDTO.js";

class CreateTourDTO implements ICreateTourDTO {
  constructor(
    public tourName: string,
    public rating: number,
    public price: number
  ) {}
}

export { CreateTourDTO };
