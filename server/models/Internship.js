
import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    // ==========================================
    // ASSIGNED INTERN
    // ==========================================
    // Empty when the opportunity is first posted.
    // Filled after an application is approved.
    intern: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },

    // ==========================================
    // COMPANY
    // ==========================================
    organization: {
      type: String,
      required: true,
      trim: true,
      default: "EWENET Communication PLC"
    },

    // ==========================================
    // ELIGIBLE FIELD OF STUDY
    // ==========================================
    fieldOfStudy: {
      type: String,
      required: true,
      enum: [
        "Computer Science",
        "Software Engineering",
        "Information Technology",
        "Information Systems",
        "Cybersecurity"
      ]
    },

    // ==========================================
    // INTERNSHIP INFORMATION
    // ==========================================
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

    // ==========================================
    // DATES
    // ==========================================
    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    // ==========================================
    // STATUS
    // ==========================================
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

    // ==========================================
    // DESCRIPTION
    // ==========================================
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
