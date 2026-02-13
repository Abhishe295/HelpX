import mongoose from "mongoose";

const { Schema, model } = mongoose;

/* =========================
   Interaction Schema (ML)
========================= */
const interactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["tutoring", "lending"],
      required: true
    },

    targetId: {
      type: Schema.Types.ObjectId,
      required: true
    },

    ratingGiven: {
      type: Number,
      min: 1,
      max: 5
    },

    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

/* =========================
   Subject Offering Schema
========================= */
const subjectOfferingSchema = new Schema(
  {
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },

    pricePerHour: {
      type: Number,
      required: true
    },

    description: String
  },
  { _id: false }
);

/* =========================
   User Schema
========================= */
const userSchema = new Schema(
  {
    // Basic Info
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    branch: {
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    // Ratings
    rating: {
      average: {
        type: Number,
        default: 0
      },
      count: {
        type: Number,
        default: 0
      }
    },

    // Earnings
    earnings: {
      type: Number,
      default: 0
    },

    // Tutoring
    subjectsOffered: [subjectOfferingSchema],

    isAvailableToTeach: {
      type: Boolean,
      default: false
    },

    // Lending
    isAvailableToLend: {
      type: Boolean,
      default: false
    },

    // Analytics (ML)
    totalSessionsAsConsumer: {
      type: Number,
      default: 0
    },

    totalSessionsAsProvider: {
      type: Number,
      default: 0
    },

    interactions: [interactionSchema]
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
