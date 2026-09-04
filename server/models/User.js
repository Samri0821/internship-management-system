import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ===============================
    // BASIC USER INFORMATION
    // ===============================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ===============================
    // USER ROLE
    // ===============================
    role: {
      type: String,
      enum: ["admin", "supervisor", "intern", "company"],
      default: "intern",
    },

    // ===============================
    // INTERN INFORMATION
    // ===============================
    university: {
      type: String,
      required: function () {
        return this.role === "intern";
      },
      trim: true,
    },

    fieldOfStudy: {
      type: String,
      required: function () {
        return this.role === "intern";
      },
      enum: [
        "Computer Science",
        "Software Engineering",
        "Information Technology",
        "Information Systems",
        "Cybersecurity",
      ],
      trim: true,
    },

    // ===============================
    // SUPERVISOR INFORMATION
    // ===============================
    organization: {
      type: String,
      trim: true,
      default: "",
    },

    department: {
      type: String,
      trim: true,
      default: "",
    },

    // ===============================
    // GITHUB INFORMATION
    // ===============================
    github: {
      id: {
        type: String,
        default: null,
      },

      username: {
        type: String,
        default: null,
      },

      profileUrl: {
        type: String,
        default: null,
      },

      avatarUrl: {
        type: String,
        default: null,
      },

      accessToken: {
        type: String,
        default: null,
      },

      connected: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;