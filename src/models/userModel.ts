import { ENCRYPT_SALT_ROUND } from "@configs/env.js";
import { UserRole } from "@enums/UserRoleEnum.js";
import bcrypt from "bcrypt";
import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface IUserDocument extends Document {
  _id: Types.ObjectId;
  userName: string;
  userPassword: string;
  userEmail: string;
  userPhoto: string;
  userRole: UserRole;
  userIsActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      lowercase: true,
    },

    userEmail: {
      type: String,
      required: [true, "Email should be unique"],
      unique: true,
      lowercase: true,
    },

    userPassword: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },

    userPhoto: {
      type: String,
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

// Encrypt user password before saving
UserSchema.pre("save", async function (next) {
  // Return if the password is not modified
  if (!this.isModified("userPassword")) return next();

  this.userPassword = await bcrypt.hash(this.userPassword, ENCRYPT_SALT_ROUND);
  next();
});

const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  UserSchema
);

export { IUserDocument, UserModel };
