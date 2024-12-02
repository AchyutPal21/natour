import { CreateTourDTO } from "@dtos/tour/CreateTourDTO.js";
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

  async addTour(req: Request, res: Response, next: NextFunction) {
    const tourData = req.body;
    const createTourDto = new CreateTourDTO(
      tourData.tourName,
      tourData.duration,
      tourData.maxGroupSize,
      tourData.difficulty,
      tourData.ratings,
      tourData.ratingsAverage,
      tourData.price,
      tourData.priceDiscount,
      tourData.summary,
      tourData.description,
      tourData.imageCover,
      tourData.images,
      tourData.startDates
    );

    try {
      const tour = await this.tourService.createTour(createTourDto);
      res.status(HttpStatus.CREATED).json({
        code: ResponseCode.CREATED,
        status: "success",
        data: {
          tour,
        },
      });
    } catch (error) {}
  }

  async getTours(req: Request, res: Response, next: NextFunction) {
    try {
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
    } catch (error) {}
  }

  async getTour(req: Request, res: Response, next: NextFunction) {
    const tourId = req.params.id;
    try {
      const tour = await this.tourService.getTourById(tourId);
      res.status(HttpStatus.OK).json({
        status: "success",
        code: ResponseCode.OK,
        data: {
          tour,
        },
      });
    } catch (error) {}
  }

  async updateTour(req: Request, res: Response, next: NextFunction) {
    const tourId = req.params.id;
    const updateData: Partial<CreateTourDTO> = req.body;
    try {
      const tour = await this.tourService.updateTour(tourId, updateData);
      res.status(HttpStatus.OK).json({
        status: "success",
        code: ResponseCode.OK,
        data: {
          tour,
        },
      });
    } catch (error) {}
  }

  async deleteTour(req: Request, res: Response, next: NextFunction) {
    const tourId = req.params.id;
    try {
      await this.tourService.deleteTourById(tourId);
      res.status(HttpStatus.NO_CONTENT).json({
        code: ResponseCode.NO_CONTENT,
        status: "success",
        data: null,
      });
    } catch (error) {}
  }

  async toursStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await this.tourService.getToursStats();
      res.status(HttpStatus.OK).json({
        code: ResponseCode.OK,
        status: "success",
        data: stats,
      });
    } catch (error) {}
  }

  async toursYearlyPlan(req: Request, res: Response, next: NextFunction) {
    try {
      const year = +req.params.year;
      const yearlyPlan = await this.tourService.getToursYearlyPlan(year);
      res.status(HttpStatus.OK).json({
        code: ResponseCode.OK,
        status: "success",
        data: yearlyPlan,
      });
    } catch (error) {}
  }
}

export default new TourController();
