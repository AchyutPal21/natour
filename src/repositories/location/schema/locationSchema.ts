import { ILocationEntity } from "@entities/location/ILocationEntity.js";
import { Document, Schema, Types } from "mongoose";

interface ILocationDocument extends ILocationEntity, Document {
  _id: Types.ObjectId;
}

const LocationSchema = new Schema<ILocationDocument>(
  {
    description: {
      type: String,
      required: true,
    },
    geometry: {
      type: {
        geoType: {
          type: String,
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export { ILocationDocument, LocationSchema };
