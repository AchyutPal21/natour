import { ILocationEntity } from "@entities/location/ILocationEntity.js";
import { TourDifficulty } from "@enums/TourDifficultyEnum.js";

interface ITourEntity {
  tourId: string;
  startLocation: ILocationEntity;
  ratingsAverage: number;
  ratingsQuantity: number;
  images: string[];
  startDates: Date[];
  tourName: string;
  duration: number;
  maxGroupSize: number;
  difficulty: TourDifficulty;
  guidesId: string[];
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  locations: ILocationEntity[];
}

export { ITourEntity };
