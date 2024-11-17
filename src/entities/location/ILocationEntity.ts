import { IGeometry } from "@shared/interfaces/IGeometry.js";

interface ILocationEntity {
  locationId: string;
  description: string;
  geometry: IGeometry;
  address: string;
  days: number;
}

export { ILocationEntity };
