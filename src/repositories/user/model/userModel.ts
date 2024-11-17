import mongoose, { Model } from "mongoose";
import { IUserDocument, UserSchema } from "../schema/userSchema.js";

const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  UserSchema
);

export { UserModel };
