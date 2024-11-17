import { ILocationEntity } from "@entities/location/ILocationEntity.js";
import { TourDifficulty } from "@enums/TourDifficultyEnum.js";
import { ITourEntity } from "./ITourEntity.js";

class TourEntity implements ITourEntity {
  tourServiceId: string;
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

  constructor(
    tourServiceId: string,
    startLocation: ILocationEntity,
    ratingsAverage: number,
    ratingsQuantity: number,
    images: string[],
    startDates: Date[],
    tourName: string,
    duration: number,
    maxGroupSize: number,
    difficulty: TourDifficulty,
    guidesId: string[],
    price: number,
    summary: string,
    description: string,
    imageCover: string,
    locations: ILocationEntity[]
  ) {
    this.tourServiceId = tourServiceId;
    this.startLocation = startLocation;
    this.ratingsAverage = ratingsAverage;
    this.ratingsQuantity = ratingsQuantity;
    this.images = images;
    this.startDates = startDates;
    this.tourName = tourName;
    this.duration = duration;
    this.maxGroupSize = maxGroupSize;
    this.difficulty = difficulty;
    this.guidesId = guidesId;
    this.price = price;
    this.summary = summary;
    this.description = description;
    this.imageCover = imageCover;
    this.locations = locations;
  }
}

export { TourEntity };
