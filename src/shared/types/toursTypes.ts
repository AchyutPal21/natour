import { ICreateTourDTO } from "@dtos/tour/ICreateTourDTO.js";

type TourQuery = Partial<ICreateTourDTO> & {
  page?: number;
  sort?: string;
  limit?: number;
  fields?: string;
} & {
  [key: string]: string | number | undefined;
};

type TourStats = Partial<{
  _id?: string | null;
  totalTours?: number;
  totalRatings?: number;
  averageRating?: number;
  averagePrice?: number;
  minimumPrice?: number;
  maximumPrice?: number;
  toursPerMonth?: number;
  tours?: string[];
  month?: number;
}>;

export { TourQuery, TourStats };
