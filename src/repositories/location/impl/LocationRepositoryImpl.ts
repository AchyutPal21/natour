import { ILocationEntity } from "@entities/location/ILocationEntity.js";
import { LocationEntity } from "@entities/location/LocationEntity.js";
import { ILocationRepository } from "../interfaces/ILocationRepository.js";
import { LocationModel } from "../model/locationModel.js";

class LocationRepositoryImpl implements ILocationRepository {
  async createLocation(location: ILocationEntity): Promise<ILocationEntity> {
    try {
      const createLocation = await LocationModel.create({
        description: location.description,
        address: location.address,
        days: location.days,
        geometry: location.geometry,
      });

      return new LocationEntity(
        createLocation._id.toString(),
        createLocation.description,
        createLocation.geometry,
        createLocation.address,
        createLocation.days
      );
    } catch (error) {
      throw new Error("Error while creating location document");
    }
  }

  async getAllLocation(): Promise<ILocationEntity[]> {
    try {
      const allLocation = await LocationModel.find().lean();

      return allLocation.map(
        (location) =>
          new LocationEntity(
            location._id.toString(),
            location.description,
            location.geometry,
            location.address,
            location.days
          )
      );
    } catch (error) {
      throw new Error("Error while getting all location document");
    }
  }

  async getLocationById(locationId: string): Promise<ILocationEntity | null> {
    try {
      const location = await LocationModel.findById(locationId);

      if (!location) {
        return null;
      }

      return new LocationEntity(
        location._id.toString(),
        location.description,
        location.geometry,
        location.address,
        location.days
      );
    } catch (error) {
      throw new Error("Error while getting all location document");
    }
  }

  async updateLocationById(
    locationId: string,
    updateDate: Partial<ILocationEntity>
  ): Promise<ILocationEntity | null> {
    try {
      const updateLocation = await LocationModel.findByIdAndUpdate(
        { _id: locationId },
        { $set: updateDate },
        { new: true, runValidators: true }
      );

      if (!updateLocation) {
        return null;
      }

      return new LocationEntity(
        updateLocation._id.toString(),
        updateLocation.description,
        updateLocation.geometry,
        updateLocation.address,
        updateLocation.days
      );
    } catch (error) {
      throw new Error("Error while getting all location document");
    }
  }
  async deleteLocationById(
    locationId: string
  ): Promise<ILocationEntity | null> {
    try {
      const toDeleteLocation = await LocationModel.findByIdAndDelete({
        _id: locationId,
      });

      if (!toDeleteLocation) {
        return null;
      }

      return new LocationEntity(
        toDeleteLocation._id.toString(),
        toDeleteLocation.description,
        toDeleteLocation.geometry,
        toDeleteLocation.address,
        toDeleteLocation.days
      );
    } catch (error) {
      throw new Error("Error while getting all location document");
    }
  }
}

export { LocationRepositoryImpl };
