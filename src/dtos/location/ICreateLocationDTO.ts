import { IGeometry } from "@shared/interfaces/IGeometry.js";

interface ICreateLocationDTO {
  description: string;
  geometry: IGeometry;
  address: string;
  days: number;
}

export { ICreateLocationDTO };
