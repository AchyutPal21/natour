import { IGeometry } from "@shared/interfaces/IGeometry.js";

interface ILocationResponseDTO {
  locationId: string;
  description: string;
  geometry: IGeometry;
  address: string;
  days: number;
}

export { ILocationResponseDTO };
