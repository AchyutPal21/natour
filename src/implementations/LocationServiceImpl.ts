import { ICreateLocationDTO } from "@dtos/location/ICreateLocationDTO.js";
import { ILocationResponseDTO } from "@dtos/location/ILocationResponseDTO.js";
import { LocationResponseDTO } from "@dtos/location/LocationResponseDTO.js";
import { LocationEntity } from "@entities/location/LocationEntity.js";
import { LocationRepositoryImpl } from "@repositories/location/impl/LocationRepositoryImpl.js";
import { ILocationService } from "@services/ILocationService.js";

class LocationServiceImpl implements ILocationService {
  private locationRepository: LocationRepositoryImpl;

  constructor() {
    this.locationRepository = new LocationRepositoryImpl();
  }

  async createLocation(
    location: ICreateLocationDTO
  ): Promise<ILocationResponseDTO> {
    try {
      console.log(location);
      const locationEntity = new LocationEntity(
        "",
        location.description,
        location.geometry,
        location.address,
        location.days
      );

      const createdLocationEntity =
        await this.locationRepository.createLocation(locationEntity);

      return new LocationResponseDTO(
        createdLocationEntity.locationId,
        createdLocationEntity.description,
        createdLocationEntity.geometry,
        createdLocationEntity.address,
        createdLocationEntity.days
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error while creating location from service layer");
    }
  }

  async getAllLocation(): Promise<ILocationResponseDTO[]> {
    const allLocations = await this.locationRepository.getAllLocation();

    return allLocations.map(
      (location) =>
        new LocationResponseDTO(
          location.locationId,
          location.description,
          location.geometry,
          location.address,
          location.days
        )
    );
  }

  async getLocationById(
    locationId: string
  ): Promise<ILocationResponseDTO | null> {
    const location = await this.locationRepository.getLocationById(locationId);

    if (!location) return null;

    return new LocationResponseDTO(
      location.locationId,
      location.description,
      location.geometry,
      location.address,
      location.days
    );
  }

  async updateLocationById(
    locationId: string,
    locationData: Partial<ICreateLocationDTO>
  ): Promise<ILocationResponseDTO | null> {
    const updateData: Partial<LocationEntity> = {};

    if (locationData.description) {
      updateData.description = locationData.description;
    }
    if (locationData.geometry) {
      updateData.geometry = locationData.geometry;
    }
    if (locationData.address) {
      updateData.address = locationData.address;
    }
    if (locationData.days) {
      updateData.days = locationData.days;
    }

    const updatedLocation = await this.locationRepository.updateLocationById(
      locationId,
      updateData
    );

    if (!updatedLocation) {
      return null;
    }

    return new LocationResponseDTO(
      updatedLocation.locationId,
      updatedLocation.description,
      updatedLocation.geometry,
      updatedLocation.address,
      updatedLocation.days
    );
  }

  async deleteLocationById(locationId: string): Promise<ILocationResponseDTO> {
    throw new Error("Method not implemented.");
  }
}

export { LocationServiceImpl };
