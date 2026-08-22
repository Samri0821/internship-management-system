import express from "express";
import Internship from "../models/Internship.js";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();


// ==========================================
// CREATE INTERNSHIP
// ADMIN ONLY
// ==========================================
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const {
      intern,
      organization,
      department,
      position,
      supervisor,
      startDate,
      endDate,
      description
    } = req.body;

    // Validate required fields
    if (
      !intern ||
      !organization ||
      !department ||
      !position ||
      !supervisor ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        message: "Please provide all required fields"
      });
    }

    // Check intern
    const internUser = await User.findById(intern);

    if (!internUser) {
      return res.status(404).json({
        message: "Intern not found"
      });
    }

    if (internUser.role !== "intern") {
      return res.status(400).json({
        message: "Selected user is not an intern"
      });
    }

    // Check supervisor
    const supervisorUser = await User.findById(supervisor);

    if (!supervisorUser) {
      return res.status(404).json({
        message: "Supervisor not found"
      });
    }

    if (supervisorUser.role !== "supervisor") {
      return res.status(400).json({
        message: "Selected user is not a supervisor"
      });
    }

    // Create internship
    const internship = await Internship.create({
      intern,
      organization,
      department,
      position,
      supervisor,
      startDate,
      endDate,
      description
    });

    res.status(201).json({
      message: "Internship created successfully",
      internship
    });

  } catch (error) {
    console.error("Create Internship Error:", error);

    res.status(500).json({
      message: "Server error while creating internship"
    });
  }
});


// ==========================================
// GET MY INTERNSHIP
// INTERN ONLY
// ==========================================
router.get("/my", protect, async (req, res) => {
  try {
    const internships = await Internship.find({
      intern: req.user.userId
    })
      .populate("supervisor", "name email")
      .sort({ createdAt: -1 });

    res.json({
      count: internships.length,
      internships
    });

  } catch (error) {
    console.error("Get My Internship Error:", error);

    res.status(500).json({
      message: "Server error while getting internship"
    });
  }
});


// ==========================================
// GET ALL INTERNSHIPS
// ADMIN ONLY
// ==========================================
router.get("/all", protect, adminOnly, async (req, res) => {
  try {
    const internships = await Internship.find()
      .populate("intern", "name email")
      .populate("supervisor", "name email")
      .sort({ createdAt: -1 });

    res.json({
      count: internships.length,
      internships
    });

  } catch (error) {
    console.error("Get All Internships Error:", error);

    res.status(500).json({
      message: "Server error while getting internships"
    });
  }
});

// ==========================================
// UPDATE INTERNSHIP GPS LOCATION
// ADMIN ONLY - DEVELOPMENT
// ==========================================
router.patch("/:id/location", protect, adminOnly, async (req, res) => {
  try {
    const {
      latitude,
      longitude,
      allowedRadius
    } = req.body;

    if (
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        message: "Latitude and longitude are required"
      });
    }

    const internship = await Internship.findById(
      req.params.id
    );

    if (!internship) {
      return res.status(404).json({
        message: "Internship not found"
      });
    }

    internship.latitude = latitude;
    internship.longitude = longitude;

    if (allowedRadius !== undefined) {
      internship.allowedRadius = allowedRadius;
    }

    await internship.save();

    res.json({
      message: "Internship GPS location updated successfully",
      internship
    });

  } catch (error) {
    console.error(
      "Update GPS Location Error:",
      error
    );

    res.status(500).json({
      message: "Server error while updating GPS location"
    });
  }
});

export default router;