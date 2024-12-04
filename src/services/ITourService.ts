import { ICreateTourDTO } from "@dtos/tour/ICreateTourDTO.js";
import { ICreateTourResponseDTO } from "@dtos/tour/ICreateTourResponseDTO.js";
import { TourAggregate, TourQuery } from "@shared/types/toursTypes.js";

interface ITourService {
  createTour(tour: ICreateTourDTO): Promise<ICreateTourResponseDTO>;
  updateTour(
    tourId: string,
    updates: Partial<ICreateTourDTO>
  ): Promise<ICreateTourResponseDTO | null>;
  getTourById(tourId: string): Promise<ICreateTourResponseDTO | null>;
  getAllTour(query: TourQuery): Promise<Partial<ICreateTourResponseDTO>[]>;
  deleteTourById(tourId: string): Promise<ICreateTourResponseDTO | null>;
  getToursStats(): Promise<TourAggregate[]>;
  getToursYearlyPlan(year: number): Promise<TourAggregate[]>;
}

export { ITourService };
