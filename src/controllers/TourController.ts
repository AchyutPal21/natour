import { CreateTourDTO } from "@dtos/tour/CreateTourDTO.js";
import { ICreateTourDTO } from "@dtos/tour/ICreateTourDTO.js";
import { HttpStatus } from "@enums/HttpStatusEnum.js";
import { ResponseCode } from "@enums/ResponseCodesEnum.js";
import { TourService } from "@implementations/TourService.js";
import { ITourService } from "@services/ITourService.js";
import { TourQuery } from "@shared/types/toursTypes.js";

import { NextFunction, Request, Response } from "express";

class TourController {
  private tourService: ITourService;

  constructor() {
    this.tourService = new TourService();
    this.addTour = this.addTour.bind(this);
    this.getTours = this.getTours.bind(this);
    this.getTour = this.getTour.bind(this);
    this.updateTour = this.updateTour.bind(this);
    this.deleteTour = this.deleteTour.bind(this);
    this.toursStats = this.toursStats.bind(this);
    this.toursYearlyPlan = this.toursYearlyPlan.bind(this);
  }

  public async addTour(req: Request, res: Response, next: NextFunction) {
    const tourData = req.body as ICreateTourDTO;
    const tour = await this.tourService.validateAndCreateTour(tourData);
    res.status(HttpStatus.CREATED).json({
      status: "success",
      code: ResponseCode.CREATED,
      data: {
        tour,
      },
    });
  }

  async getTours(req: Request, res: Response, next: NextFunction) {
    const query = req.query as TourQuery;
    const tours = await this.tourService.getAllTour(query);
    res.status(HttpStatus.OK).json({
      status: "success",
      code: ResponseCode.OK,
      data: {
        count: tours.length,
        tours,
      },
    });
  }

  async getTour(req: Request, res: Response, next: NextFunction) {
    const tourId = req.params.id;
    const tour = await this.tourService.getTourById(tourId);
    res.status(HttpStatus.OK).json({
      status: "success",
      code: ResponseCode.OK,
      data: {
        tour,
      },
    });
  }

  async updateTour(req: Request, res: Response, next: NextFunction) {
    const tourId = req.params.id;
    const updateData: Partial<CreateTourDTO> = req.body;
    const tour = await this.tourService.updateTour(tourId, updateData);
    res.status(HttpStatus.OK).json({
      status: "success",
      code: ResponseCode.OK,
      data: {
        tour,
      },
    });
  }

  async deleteTour(req: Request, res: Response, next: NextFunction) {
    const tourId = req.params.id;
    await this.tourService.deleteTourById(tourId);
    res.status(HttpStatus.NO_CONTENT).json({
      status: "success",
      code: ResponseCode.NO_CONTENT,
      data: null,
    });
  }

  async toursStats(req: Request, res: Response, next: NextFunction) {
    const stats = await this.tourService.getToursStats();
    res.status(HttpStatus.OK).json({
      code: ResponseCode.OK,
      status: "success",
      data: stats,
    });
  }

  async toursYearlyPlan(req: Request, res: Response, next: NextFunction) {
    const year = +req.params.year;
    const yearlyPlan = await this.tourService.getToursYearlyPlan(year);
    res.status(HttpStatus.OK).json({
      code: ResponseCode.OK,
      status: "success",
      data: yearlyPlan,
    });
  }
}

export default new TourController();
