import { TourDifficulty } from "@enums/TourDifficultyEnum.js";
import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface ITourDocument extends Document {
  _id: Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

const TourSchema = new Schema<ITourDocument>(
  {
    tourName: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
    },

    ratings: {
      type: Number,
      default: 4.5,
    },

    price: {
      type: Number,
      require: [true, "A tour must have a price"],
    },

    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },

    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a max group size"],
    },

    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
    },

    ratingsAverage: {
      type: Number,
    },

    priceDiscount: {
      type: Number,
      default: 0,
    },

    summary: {
      type: String,
      required: [true, "A tour must have a summary"],
    },

    description: {
      type: String,
      required: [true, "A tour must have a description"],
    },

    imageCover: {
      type: String,
      required: [true, "A tour must have a description"],
    },

    images: {
      type: [String],
    },

    startDates: {
      type: [Date],
    },
  },
  {
    timestamps: true,
  }
);

const TourModel: Model<ITourDocument> = mongoose.model<ITourDocument>(
  "Tour",
  TourSchema
);

export { ITourDocument, TourModel };
