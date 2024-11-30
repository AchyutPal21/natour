import { ICreateTourDTO } from "@dtos/tour/ICreateTourDTO.js";
import { ICreateTourResponseDTO } from "@dtos/tour/ICreateTourResponseDTO.js";

interface ITourService {
  createTour(tour: ICreateTourDTO): Promise<ICreateTourResponseDTO>;
  updateTour(
    tourId: string,
    updates: Partial<ICreateTourDTO>
  ): Promise<ICreateTourResponseDTO | null>;
  getTourById(tourId: string): Promise<ICreateTourResponseDTO | null>;
  getAllTour(): Promise<ICreateTourResponseDTO[]>;
  deleteTourById(tourId: string): Promise<ICreateTourResponseDTO | null>;
}

export { ITourService };
