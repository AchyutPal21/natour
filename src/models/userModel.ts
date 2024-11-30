import { UserRole } from "@enums/UserRoleEnum.js";
import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface IUserDocument extends Document {
  _id: Types.ObjectId;
  userName: string;
  userPassword: string;
  userEmail: string;
  userRole: UserRole;
  userIsActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },

    userPassword: {
      type: String,
      required: true,
    },

    userRole: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },

    userIsActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  UserSchema
);

export { UserModel };
