import { TourDifficulty } from "@enums/TourDifficultyEnum.js";
import { ICreateTourDTO } from "./ICreateTourDTO.js";

class CreateTourDTO implements ICreateTourDTO {
  constructor(
    public tourName: string,
    public duration: number,
    public maxGroupSize: number,
    public difficulty: TourDifficulty.EASY,
    public ratings: number,
    public ratingsAverage: number,
    public price: number,
    public priceDiscount: number,
    public summary: string,
    public description: string,
    public imageCover: string,
    public images: string[],
    public startDates: Date[]
  ) {}
}

export { CreateTourDTO };
