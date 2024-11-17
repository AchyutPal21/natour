import { IGeometry } from "../../shared/interfaces/IGeometry.js";
import { ILocationEntity } from "./ILocationEntity.js";

class LocationEntity implements ILocationEntity {
  locationId: string;
  description: string;
  geometry: IGeometry;
  address: string;
  days: number;

  constructor(
    locationId: string,
    description: string,
    geometry: IGeometry,
    address: string,
    days: number
  ) {
    this.locationId = locationId;
    this.description = description;
    this.geometry = geometry;
    this.address = address;
    this.days = days;
  }
}

export { LocationEntity };
