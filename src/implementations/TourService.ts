import { CreateTourResponseDTO } from "@dtos/tour/CreateTourResponseDTO.js";
import { ICreateTourDTO } from "@dtos/tour/ICreateTourDTO.js";
import { ICreateTourResponseDTO } from "@dtos/tour/ICreateTourResponseDTO.js";
import { TourModel } from "@models/tourModel.js";
import { ITourService } from "@services/ITourService.js";

class TourService implements ITourService {
  private tourModel;

  constructor() {
    this.tourModel = TourModel;
  }

  async createTour(tour: ICreateTourDTO): Promise<ICreateTourResponseDTO> {
    try {
      const newTour = await this.tourModel.create(tour);
      const tourResponse = new CreateTourResponseDTO(
        newTour._id.toString(),
        newTour.tourName,
        newTour.rating,
        newTour.price
      );
      return tourResponse;
    } catch (error) {
      console.error(error);
      throw new Error("Error while creating the tour");
    }
  }

  async updateTour(
    tourId: string,
    updates: Partial<ICreateTourDTO>
  ): Promise<ICreateTourResponseDTO | null> {
    const updateTour = await this.tourModel.findByIdAndUpdate(tourId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updateTour) {
      return null;
    }

    const tourResponse = new CreateTourResponseDTO(
      updateTour._id.toString(),
      updateTour.tourName,
      updateTour.rating,
      updateTour.price
    );

    return tourResponse;
  }

  async getTourById(tourId: string): Promise<ICreateTourResponseDTO | null> {
    const tour = await this.tourModel.findById(tourId);
    if (!tour) {
      return null;
    }

    const tourResponse = new CreateTourResponseDTO(
      tour._id.toString(),
      tour.tourName,
      tour.rating,
      tour.price
    );

    return tourResponse;
  }
  async getAllTour(): Promise<ICreateTourResponseDTO[]> {
    const tours = await this.tourModel.find();

    return tours.map((tour) => {
      return new CreateTourResponseDTO(
        tour._id.toString(),
        tour.tourName,
        tour.rating,
        tour.price
      );
    });
  }

  async deleteTourById(tourId: string): Promise<ICreateTourResponseDTO | null> {
    const deletedTour = await this.tourModel.findByIdAndDelete(tourId);

    if (!deletedTour) return null;

    return new CreateTourResponseDTO(
      deletedTour._id.toString(),
      deletedTour.tourName,
      deletedTour.rating,
      deletedTour.price
    );
  }
}

export { TourService };
