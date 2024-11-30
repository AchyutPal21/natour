import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface ITourDocument extends Document {
  _id: Types.ObjectId;
  tourName: string;
  rating: number;
  price: number;
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
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      require: [true, "A tour must have a price"],
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

export { TourModel };
