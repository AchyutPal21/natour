import { ICreateTourDTO } from "@dtos/tour/ICreateTourDTO.js";

type TourQuery = Partial<ICreateTourDTO> & {
  page?: number;
  sort?: string;
  limit?: number;
  fields?: string;
} & {
  [key: string]: string | number | undefined;
};

export { TourQuery };
