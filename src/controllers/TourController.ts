import { HttpStatus } from "@enums/HttpStatusEnum.js";
import { ResponseCode } from "@enums/ResponseCodesEnum.js";
import { NextFunction, Request, Response } from "express";

class TourController {
  async getTours(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        data: "hello from the server",
      });
    } catch (error) {}
  }

  async addTour(req: Request, res: Response, next: NextFunction) {
    const tourData = req.body;
    try {
    } catch (error) {}
  }

  async getTour(req: Request, res: Response, next: NextFunction) {
    const tourData = req.body;
    try {
      res.status(HttpStatus.OK).json({
        status: "success",
        code: ResponseCode.OK,
      });
    } catch (error) {}
  }

  async updateTour(req: Request, res: Response, next: NextFunction) {
    const tourData = req.body;
    try {
    } catch (error) {}
  }

  async deleteTour(req: Request, res: Response, next: NextFunction) {
    const tourData = req.body;
    try {
    } catch (error) {}
  }
}

export { addTour, deleteTour, getTour, getTours, updateTour };
