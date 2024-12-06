import { CreateTourDTO } from "@dtos/tour/CreateTourDTO.js";
import { CreateTourResponseDTO } from "@dtos/tour/CreateTourResponseDTO.js";
import { ICreateTourDTO } from "@dtos/tour/ICreateTourDTO.js";
import { ICreateTourResponseDTO } from "@dtos/tour/ICreateTourResponseDTO.js";
import { BadRequestException } from "@exceptions/BadRequestException.js";
import { NotFoundException } from "@exceptions/NotFoundException.js";
import { ITourDocument, TourModel } from "@models/tourModel.js";
import { ITourService } from "@services/ITourService.js";
import { APIQueryFeatures } from "@shared/classes/APIQueryFeatures.js";
import { TourAggregate, TourQuery } from "@shared/types/toursTypes.js";
import { handleMongooseException } from "@utils/handleMongooseException.js";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

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
    } catch (error: any) {
      handleMongooseException(error);
    }
  }

  public async validateAndCreateTour(
    data: ICreateTourDTO
  ): Promise<ICreateTourResponseDTO> {
    // Transform incoming plain object to a class instance
    const createTourDto = plainToInstance(CreateTourDTO, data);
    // Perform validation
    const errors = await validate(createTourDto);

    if (errors.length) {
      const reason = errors.map((error) => {
        const constraints = Object.values(error.constraints || {});
        return {
          [error.property]: constraints.length
            ? constraints[0]
            : "Invalid field type",
        };
      });

      throw new BadRequestException("Bad Request", {
        detail: "Invalid fields type",
        reason,
      });
    }

    return await this.createTour(createTourDto);
  }

  public async updateTour(
    tourId: string,
    updates: Partial<ICreateTourDTO>
  ): Promise<ICreateTourResponseDTO | null> {
    try {
      const updatedTour = await this.tourModel.findByIdAndUpdate(
        tourId,
        updates,
        { new: true, runValidators: true }
      );
      if (!updatedTour) {
        throw new NotFoundException(`Tour with ID ${tourId} not found`);
      }
      return this.createTourResponse(updatedTour);
    } catch (error: any) {
      handleMongooseException(error);
    }
  }

  public async getAllTour(
    query: TourQuery
  ): Promise<Partial<ICreateTourResponseDTO>[]> {
    try {
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
    } catch (error: any) {
      handleMongooseException(error);
    }
  }

  public async getTourById(
    tourId: string
  ): Promise<ICreateTourResponseDTO | null> {
    try {
      const tour = await this.tourModel.findById(tourId);

      if (!tour) {
        throw new NotFoundException(`Tour with ID ${tourId} not found`);
      }

      return this.createTourResponse(tour);
    } catch (error: any) {
      handleMongooseException(error);
    }
  }

  public async deleteTourById(
    tourId: string
  ): Promise<ICreateTourResponseDTO | null> {
    try {
      const deletedTour = await this.tourModel.findByIdAndDelete(tourId);

      if (!deletedTour) {
        throw new NotFoundException(`Tour with ID ${tourId} not found`);
      }

      return this.createTourResponse(deletedTour);
    } catch (error: any) {
      handleMongooseException(error);
    }
  }

  public async getToursStats(): Promise<TourAggregate[]> {
    try {
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
    } catch (error: any) {
      handleMongooseException(error);
    }
  }

  public async getToursYearlyPlan(year: number): Promise<TourAggregate[]> {
    try {
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
    } catch (error: any) {
      handleMongooseException(error);
    }
  }
}

export { TourService };
