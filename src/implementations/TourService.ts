import { CreateTourResponseDTO } from "@dtos/tour/CreateTourResponseDTO.js";
import { ICreateTourDTO } from "@dtos/tour/ICreateTourDTO.js";
import { ICreateTourResponseDTO } from "@dtos/tour/ICreateTourResponseDTO.js";
import { ITourDocument, TourModel } from "@models/tourModel.js";
import { ITourService } from "@services/ITourService.js";
import { APIQueryFeatures } from "@shared/classes/APIQueryFeatures.js";
import { TourAggregate, TourQuery } from "@shared/types/toursTypes.js";

class TourService implements ITourService {
  private tourModel;

  constructor() {
    this.tourModel = TourModel;
  }

  private createPartialTourResponse(tours: ITourDocument[], fields: string) {
    const queryFields = fields.split(",");

    const toIncludeFieldsSet = new Set();
    const toExcludeFieldsSet = new Set();

    queryFields.forEach((field) => {
      if (field.startsWith("-")) {
        toExcludeFieldsSet.add(field.substring(1));
      } else {
        toIncludeFieldsSet.add(field);
      }
    });

    return tours.map((tour) => {
      const tourResponsePartialDTO: Partial<ICreateTourResponseDTO> = {};
      for (const key in tour.toObject()) {
        if (key === "_id") {
          tourResponsePartialDTO["tourId"] = tour._id.toString();
          continue;
        }

        // When their is no field to include but only to exclude fields i.e. ?fields=-field1,-field2,...etc
        if (toIncludeFieldsSet.size === 0) {
          // Exclude the fields and include rest field
          if (toExcludeFieldsSet.has(key)) {
            continue;
          }

          tourResponsePartialDTO[key as keyof ICreateTourResponseDTO] =
            tour[key as keyof ITourDocument];
        } else {
          if (toIncludeFieldsSet.has(key)) {
            tourResponsePartialDTO[key as keyof ICreateTourResponseDTO] =
              tour[key as keyof ITourDocument];
          }
        }
      }

      return tourResponsePartialDTO;
    });
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

  public async createTour(
    tour: ICreateTourDTO
  ): Promise<ICreateTourResponseDTO> {
    try {
      const newTour = await this.tourModel.create(tour);
      const tourResponse = this.createTourResponse(newTour);
      return tourResponse;
    } catch (error) {
      console.error(error);
      throw new Error("Error while creating the tour");
    }
  }

  public async updateTour(
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

  public async getAllTour(
    query: TourQuery
  ): Promise<Partial<ICreateTourResponseDTO>[]> {
    const apiQueryFeatures = new APIQueryFeatures<ITourDocument>(
      this.tourModel,
      query
    );

    const tours = await apiQueryFeatures
      .filterQuery()
      .sortDocument()
      .limitFields()
      .paginate()
      .execute();

    if (query.fields) {
      return this.createPartialTourResponse(tours, query.fields);
    }

    return tours.map((tour) => {
      return this.createTourResponse(tour);
    });
  }

  public async getTourById(
    tourId: string
  ): Promise<ICreateTourResponseDTO | null> {
    const tour = await this.tourModel.findById(tourId);
    if (!tour) {
      return null;
    }

    const tourResponse = this.createTourResponse(tour);

    return tourResponse;
  }

  public async deleteTourById(
    tourId: string
  ): Promise<ICreateTourResponseDTO | null> {
    const deletedTour = await this.tourModel.findByIdAndDelete(tourId);

    if (!deletedTour) return null;

    return this.createTourResponse(deletedTour);
  }

  public async getToursStats(): Promise<TourAggregate[]> {
    const stats = await this.tourModel.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4 } },
      },
      {
        $group: {
          _id: "$difficulty",
          totalTours: { $sum: 1 },
          totalRatings: { $sum: "$ratings" },
          averageRating: { $avg: "$ratingsAverage" },
          averagePrice: { $avg: "$price" },
          minimumPrice: { $min: "$price" },
          maximumPrice: { $max: "$price" },
        },
      },
      {
        $sort: { minimumPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: "easy" } },
      // },
    ]);

    return stats;
  }

  public async getToursYearlyPlan(year: number): Promise<TourAggregate[]> {
    const monthlyTourPlan = await this.tourModel.aggregate([
      {
        $unwind: "$startDates",
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          toursPerMonth: { $sum: 1 },
          tours: { $push: "$tourName" },
        },
      },
      {
        $addFields: { month: "$_id" },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          toursPerMonth: -1,
          month: 1,
        },
      },
    ]);

    return monthlyTourPlan;
  }
}

export { TourService };

/*
OLD CODE EXAMPLE

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
    // -field_name means exclude the field
    // selecting field => ?fields=tourName,price,average...
    if (query.fields) {
      const selectedFields = query.fields.replaceAll(",", " ");
      toursQuery = toursQuery.select(selectedFields);
    }

    // Pagination
    if (query.page || query.limit) {
      const page = Math.max(1, query.page || 1); // Default to page 1
      const limit = Math.max(1, query.limit || 1); // Default 1 item per page
      const skip = (page - 1) * limit;
      toursQuery = toursQuery.skip(skip).limit(limit);
    }

    // Finally executing the query
    const tourQueryResult = await toursQuery;

    return tourQueryResult.map((tour) => {
      return this.createTourResponse(tour);
    });
  }

*/
