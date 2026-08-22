import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    intern: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    organization: {
      type: String,
      required: true,
      trim: true
    },

    department: {
      type: String,
      required: true,
      trim: true
    },

    position: {
      type: String,
      required: true,
      trim: true
    },

    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // ==========================================
    // INTERNSHIP LOCATION
    // ==========================================

    latitude: {
      type: Number,
      required: true
    },

    longitude: {
      type: Number,
      required: true
    },

    allowedRadius: {
      type: Number,
      default: 200
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: [
        "upcoming",
        "active",
        "completed",
        "cancelled"
      ],
      default: "upcoming"
    },

    description: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Internship = mongoose.model(
  "Internship",
  internshipSchema
);

export default Internship;