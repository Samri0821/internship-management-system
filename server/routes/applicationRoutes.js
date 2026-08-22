import express from "express";
import Application from "../models/Application.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// ==========================================
// SUBMIT INTERNSHIP APPLICATION
// ==========================================
router.post("/", protect, async (req, res) => {
  try {
    const {
      organization,
      position,
      department,
      startDate,
      endDate,
      motivation
    } = req.body;

    // Validate required fields
    if (
      !organization ||
      !position ||
      !startDate ||
      !endDate ||
      !motivation
    ) {
      return res.status(400).json({
        message: "Please provide all required fields"
      });
    }

    // Create application
    const application = await Application.create({
      applicant: req.user.userId,
      organization,
      position,
      department,
      startDate,
      endDate,
      motivation
    });

    res.status(201).json({
      message: "Internship application submitted successfully",
      application
    });

  } catch (error) {
    console.error("Application Error:", error);

    res.status(500).json({
      message: "Server error while submitting application"
    });
  }
});


// ==========================================
// GET MY APPLICATIONS
// ==========================================
router.get("/my", protect, async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.userId
    }).sort({ createdAt: -1 });

    res.json({
      count: applications.length,
      applications
    });

  } catch (error) {
    console.error("Get Applications Error:", error);

    res.status(500).json({
      message: "Server error while getting applications"
    });
  }
});

// Get all applications - Admin only
router.get("/all", protect, adminOnly, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("applicant", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      count: applications.length,
      applications
    });

  } catch (error) {
    console.error("Get All Applications Error:", error);

    res.status(500).json({
      message: "Server error while getting applications"
    });
  }
});

export default router;