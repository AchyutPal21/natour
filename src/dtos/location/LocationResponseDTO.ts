import { IGeometry } from "@shared/interfaces/IGeometry.js";
import { ILocationResponseDTO } from "./ILocationResponseDTO.js";

class LocationResponseDTO implements ILocationResponseDTO {
  constructor(
    public locationId: string,
    public description: string,
    public geometry: IGeometry,
    public address: string,
    public days: number
  ) {}
}

export { LocationResponseDTO };
