import { TourDifficulty } from "@enums/TourDifficultyEnum.js";
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  Length,
} from "class-validator";
import { ICreateTourDTO } from "./ICreateTourDTO.js";

class CreateTourDTO implements ICreateTourDTO {
  @IsString()
  @Length(10)
  tourName: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  maxGroupSize: number;

  @IsEnum(TourDifficulty)
  difficulty: TourDifficulty;

  @IsNumber()
  price: number;

  @IsString()
  summary: string;

  @IsString()
  description: string;

  @IsString()
  imageCover: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsArray()
  @IsDateString({ strict: true, strictSeparator: true }, { each: true })
  startDates: Date[];

  constructor(
    tourName: string,
    duration: number,
    maxGroupSize: number,
    difficulty: TourDifficulty,
    price: number,
    summary: string,
    description: string,
    imageCover: string,
    images: string[],
    startDates: Date[]
  ) {
    this.tourName = tourName;
    this.duration = duration;
    this.maxGroupSize = maxGroupSize;
    this.difficulty = difficulty;
    this.price = price;
    this.summary = summary;
    this.description = description;
    this.imageCover = imageCover;
    this.images = images;
    this.startDates = startDates;
  }
}

export { CreateTourDTO };
