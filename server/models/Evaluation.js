import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema(
  {
    intern: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true
    },

    technicalSkills: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    communication: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    teamwork: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    problemSolving: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    overallScore: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    comments: {
      type: String,
      trim: true,
      default: ""
    },

    evaluationDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Evaluation = mongoose.model(
  "Evaluation",
  evaluationSchema
);

export default Evaluation;