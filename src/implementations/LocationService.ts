import { ICreateLocationDTO } from "@dtos/location/ICreateLocationDTO.js";
import { ILocationResponseDTO } from "@dtos/location/ILocationResponseDTO.js";
import { ILocationService } from "@services/ILocationService.js";

class LocationService implements ILocationService {
  createLocation(location: ICreateLocationDTO): Promise<ILocationResponseDTO> {
    throw new Error("Method not implemented.");
  }
  getAllLocation(): Promise<ILocationResponseDTO[]> {
    throw new Error("Method not implemented.");
  }
  getLocationById(locationId: string): Promise<ILocationResponseDTO | null> {
    throw new Error("Method not implemented.");
  }
  updateLocationById(
    locationId: string,
    locationData: Partial<ICreateLocationDTO>
  ): Promise<ILocationResponseDTO | null> {
    throw new Error("Method not implemented.");
  }
  deleteLocationById(locationId: string): Promise<ILocationResponseDTO> {
    throw new Error("Method not implemented.");
  }
}

export { LocationService };
