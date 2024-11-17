import { CreateLocationDTO } from "@dtos/location/CreateLocationDTO.js";
import { HttpStatus } from "@enums/HttpStatusEnum.js";
import { LocationServiceImpl } from "@implementations/LocationServiceImpl.js";
import { ILocationService } from "@services/ILocationService.js";
import { NextFunction, Request, Response } from "express";

class LocationController {
  private locationService: ILocationService;

  constructor() {
    this.locationService = new LocationServiceImpl();
    this.createLocation = this.createLocation.bind(this);
  }

  async createLocation(req: Request, res: Response, next: NextFunction) {
    const location = req.body;
    const locationDto = new CreateLocationDTO(
      location.description,
      location.geometry,
      location.address,
      location.days
    );

    console.log("FROM CONTROLLER: ", locationDto);
    const createdLocation = await this.locationService.createLocation(
      locationDto
    );
    res.status(HttpStatus.OK).json(createdLocation);
  }
}

export default new LocationController();
