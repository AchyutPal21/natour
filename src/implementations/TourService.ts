import { CreateTourResponseDTO } from "@dtos/tour/CreateTourResponseDTO.js";
import { ICreateTourDTO } from "@dtos/tour/ICreateTourDTO.js";
import { ICreateTourResponseDTO } from "@dtos/tour/ICreateTourResponseDTO.js";
import { ITourDocument, TourModel } from "@models/tourModel.js";
import { ITourService } from "@services/ITourService.js";
import { TourQuery } from "@shared/types/queryObject.js";

class TourService implements ITourService {
  private tourModel;

  constructor() {
    this.tourModel = TourModel;
  }

  private createTourResponse(tour: ITourDocument) {
    return new CreateTourResponseDTO(
      tour._id.toString(),
      tour.tourName,
      tour.duration,
      tour.maxGroupSize,
      tour.difficulty,
      tour.ratings,
      tour.ratingsAverage,
      tour.price,
      tour.priceDiscount,
      tour.summary,
      tour.description,
      tour.imageCover,
      tour.images,
      tour.startDates
    );
  }

  async createTour(tour: ICreateTourDTO): Promise<ICreateTourResponseDTO> {
    try {
      const newTour = await this.tourModel.create(tour);
      const tourResponse = this.createTourResponse(newTour);
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

    const tourResponse = this.createTourResponse(updateTour);

    return tourResponse;
  }

  async getAllTour(query: TourQuery): Promise<ICreateTourResponseDTO[]> {
    // Filtering the query and pagination
    const initial = { ...query };
    const excludeFields = ["sort", "page", "fields", "limit"];
    excludeFields.forEach(
      (field: string) => field in initial && delete initial[field]
    );

    // query string => difficulty=medium&maxGroupSize[gte]=10
    // This gets converted into => { difficulty: 'medium', maxGroupSize: { 'gte': '10' } }
    let queryString = JSON.stringify(initial);
    // In mongo we need to use {value: {$gte: 5}}
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    const searchQuery = JSON.parse(queryString);

    // Building the query
    let toursQuery = this.tourModel.find(searchQuery);

    // Sorting
    // sorting query => ?sort=-ratingsAverage,price
    // when come multiple fields we have to separate them by space
    if (query.sort) {
      const sortingFields = query.sort.replaceAll(",", " ");
      toursQuery = toursQuery.sort(sortingFields);
    }

    // Field limiting
    // selecting field => ?fields=tourName,price,average...
    if (query.fields) {
      const selectedFields = query.fields.replaceAll(",", " ");
      toursQuery = toursQuery.select(selectedFields);
    }

    // Pagination
    if (query.page && query.limit) {
      const page = Math.max(1, query.page); // Default to page 1
      const limit = Math.max(1, query.limit); // Default 1 item per page
      const skip = (page - 1) * limit;
      toursQuery = toursQuery.skip(skip).limit(limit);
    }

    // Finally executing the query
    const tourQueryResult = await toursQuery;

    return tourQueryResult.map((tour) => {
      return this.createTourResponse(tour);
    });
  }

  async getTourById(tourId: string): Promise<ICreateTourResponseDTO | null> {
    const tour = await this.tourModel.findById(tourId);
    if (!tour) {
      return null;
    }

    const tourResponse = this.createTourResponse(tour);

    return tourResponse;
  }

  async deleteTourById(tourId: string): Promise<ICreateTourResponseDTO | null> {
    const deletedTour = await this.tourModel.findByIdAndDelete(tourId);

    if (!deletedTour) return null;

    return this.createTourResponse(deletedTour);
  }
}

export { TourService };
