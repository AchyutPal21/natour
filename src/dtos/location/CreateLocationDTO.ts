import { IGeometry } from "@shared/interfaces/IGeometry.js";
import { ICreateLocationDTO } from "./ICreateLocationDTO.js";

class CreateLocationDTO implements ICreateLocationDTO {
  constructor(
    public description: string,
    public geometry: IGeometry,
    public address: string,
    public days: number
  ) {}
}

export { CreateLocationDTO };
