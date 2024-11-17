import { ILocationEntity } from "@entities/location/ILocationEntity.js";

interface ILocationRepository {
  createLocation(location: ILocationEntity): Promise<ILocationEntity>;
  getAllLocation(): Promise<ILocationEntity[]>;
  getLocationById(locationId: string): Promise<ILocationEntity | null>;
  updateLocationById(
    locationId: string,
    updateDate: Partial<ILocationEntity>
  ): Promise<ILocationEntity | null>;
  deleteLocationById(locationId: string): Promise<ILocationEntity | null>;
}

export { ILocationRepository };
