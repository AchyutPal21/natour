import { ICreateLocationDTO } from "@dtos/location/ICreateLocationDTO.js";
import { ILocationResponseDTO } from "@dtos/location/ILocationResponseDTO.js";

interface ILocationService {
  createLocation(location: ICreateLocationDTO): Promise<ILocationResponseDTO>;
  getAllLocation(): Promise<ILocationResponseDTO[]>;
  getLocationById(locationId: string): Promise<ILocationResponseDTO | null>;
  updateLocationById(
    locationId: string,
    locationData: Partial<ICreateLocationDTO>
  ): Promise<ILocationResponseDTO | null>;
  deleteLocationById(locationId: string): Promise<ILocationResponseDTO>;
}

export { ILocationService };
