import mongoose, { Model } from "mongoose";
import { ILocationDocument, LocationSchema } from "../schema/locationSchema.js";

const LocationModel: Model<ILocationDocument> =
  mongoose.model<ILocationDocument>("location", LocationSchema);

export { LocationModel };
