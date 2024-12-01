import { TourDifficulty } from "@enums/TourDifficultyEnum.js";

interface ICreateTourResponseDTO {
  tourId: string;
  tourName: string;
  duration: number;
  maxGroupSize: number;
  difficulty: TourDifficulty.EASY;
  ratings: number;
  ratingsAverage: number;
  price: number;
  priceDiscount: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  startDates: Date[];
}

export { ICreateTourResponseDTO };
