import mongoose from "mongoose";

const dailyReportSchema = new mongoose.Schema(
  {
    // Intern who submitted the report
    intern: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Internship associated with the report
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true
    },

    // Report date
    date: {
      type: Date,
      required: true
    },

    // What the intern worked on
    title: {
      type: String,
      required: true,
      trim: true
    },

    // Detailed daily activities
    activities: {
      type: String,
      required: true,
      trim: true
    },

    // Problems or difficulties encountered
    challenges: {
      type: String,
      default: "",
      trim: true
    },

    // What the intern achieved
    achievements: {
      type: String,
      default: "",
      trim: true
    },

    // Number of hours worked
    hoursWorked: {
      type: Number,
      default: 0,
      min: 0
    },

    // Supervisor feedback
    supervisorComment: {
      type: String,
      default: "",
      trim: true
    },

    // Report status
    status: {
      type: String,
      enum: ["submitted", "reviewed"],
      default: "submitted"
    }
  },
  {
    timestamps: true
  }
);

const DailyReport = mongoose.model(
  "DailyReport",
  dailyReportSchema
);

export default DailyReport;