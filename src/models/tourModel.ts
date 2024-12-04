import { TourDifficulty } from "@enums/TourDifficultyEnum.js";

import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface ITourDocument extends Document {
  _id: Types.ObjectId;
  tourName: string;
  slug: string;
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

    slug: String,

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
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty need to be: easy/medium/difficult",
      },
    },

    ratingsAverage: {
      type: Number,
    },

    priceDiscount: {
      type: Number,
      default: 0,
      validate: {
        validator: function (val: number) {
          // ! this keyword points to the current document on new document creation and not upon updating
          return this.price > val;
        },

        message: "Discount price: {VALUE} should be below regular price",
      },
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

// toJSON: { virtuals: true },
// toObject: { virtuals: true },

// TourSchema.virtual("durationWeeks").get(function () {
//   return +(this.duration / 7).toFixed(1);
// });

// TourSchema.set("toObject", {
//   transform: (doc, ret) => {
//     ret.tourId = ret._id.toString();
//     delete ret._id;
//     delete ret.__v;
//     return ret;
//   },
// });

TourSchema.set("toObject", {
  transform: (doc, ret) => {
    delete ret.__v;
  },
});

// MONGOOSE MIDDLEWAREs HOOKS: DOCUMENT, QUERY, AGGREGATE, MODEL

// DOCUMENT MIDDLEWARE
// pre->save will get called just before the .save() .create() and not for .insertMany(), update(), findByIdUpdate()..
TourSchema.pre("save", function (next) {
  this.slug = this.tourName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  next();
});

// QUERY MIDDLEWARE
//

const TourModel: Model<ITourDocument> = mongoose.model<ITourDocument>(
  "Tour",
  TourSchema
);

export { ITourDocument, TourModel };
