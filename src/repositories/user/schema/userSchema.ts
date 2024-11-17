import { IUserEntity } from "@entities/user/IUserEntity.js";
import { UserRole } from "@enums/UserRoleEnum.js";
import { Document, Schema, Types } from "mongoose";

interface IUserDocument extends IUserEntity, Document {
  _id: Types.ObjectId;
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

export { IUserDocument, UserSchema };
