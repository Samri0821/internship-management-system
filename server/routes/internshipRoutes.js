import express from "express";
import Internship from "../models/Internship.js";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();


// ==========================================
// CREATE INTERNSHIP OPPORTUNITY
// ADMIN ONLY
// ==========================================
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const {
      organization,
      fieldOfStudy,
      department,
      position,
      supervisor,
      startDate,
      endDate,
      description,
      latitude,
      longitude,
      allowedRadius
    } = req.body;

    // ==========================================
    // VALIDATE REQUIRED FIELDS
    // ==========================================
    if (
      !organization ||
      !fieldOfStudy ||
      !department ||
      !position ||
      !supervisor ||
      !startDate ||
      !endDate ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        message:
          "Please provide all required fields including GPS location"
      });
    }

    // ==========================================
    // VALIDATE FIELD OF STUDY
    // ==========================================
    const allowedFields = [
      "Computer Science",
      "Software Engineering",
      "Information Technology",
      "Information Systems",
      "Cybersecurity"
    ];

    if (!allowedFields.includes(fieldOfStudy)) {
      return res.status(400).json({
        message: "Invalid field of study"
      });
    }

    // ==========================================
    // CHECK SUPERVISOR
    // ==========================================
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

    // ==========================================
    // CREATE INTERNSHIP
    // ==========================================
    const internship = await Internship.create({
      organization: organization.trim(),
      fieldOfStudy,
      department: department.trim(),
      position: position.trim(),
      supervisor,
      startDate,
      endDate,
      description: description || "",
      latitude: Number(latitude),
      longitude: Number(longitude),
      allowedRadius:
        allowedRadius !== undefined
          ? Number(allowedRadius)
          : 200
    });

    // ==========================================
    // POPULATE SUPERVISOR
    // ==========================================
    const populatedInternship = await Internship.findById(
      internship._id
    ).populate("supervisor", "name email role");

    res.status(201).json({
      message: "Internship opportunity created successfully",
      internship: populatedInternship
    });

  } catch (error) {
    console.error("Create Internship Error:", error);

    res.status(500).json({
      message: "Server error while creating internship",
      error: error.message
    });
  }
});


// ==========================================
// GET AVAILABLE INTERNSHIP OPPORTUNITIES
// INTERN ONLY
// ALL FIELDS OF STUDY CAN SEE THEM
// ==========================================
router.get("/available", protect, async (req, res) => {
  try {
    // ==========================================
    // GET LOGGED-IN INTERN
    // ==========================================
    const intern = await User.findById(req.user.userId);

    if (!intern) {
      return res.status(404).json({
        message: "Intern not found"
      });
    }

    // ==========================================
    // CHECK ROLE
    // ==========================================
    if (intern.role !== "intern") {
      return res.status(403).json({
        message: "Only interns can view available opportunities"
      });
    }

    // ==========================================
    // GET ALL AVAILABLE INTERNSHIPS
    // FIELD OF STUDY DOES NOT RESTRICT RESULTS
    // ==========================================
    const internships = await Internship.find({
      intern: null,
      status: "upcoming"
    })
      .populate(
        "supervisor",
        "name email role"
      )
      .sort({ createdAt: -1 });

    // ==========================================
    // RETURN RESULTS
    // ==========================================
    res.json({
      count: internships.length,
      internships
    });

  } catch (error) {
    console.error(
      "Get Available Internships Error:",
      error
    );

    res.status(500).json({
      message:
        "Server error while getting available internships",
      error: error.message
    });
  }
});


// ==========================================
// GET MY ASSIGNED INTERNSHIP
// INTERN ONLY
// ==========================================
router.get("/my", protect, async (req, res) => {
  try {
    // ==========================================
    // CHECK INTERN
    // ==========================================
    const intern = await User.findById(req.user.userId);

    if (!intern) {
      return res.status(404).json({
        message: "Intern not found"
      });
    }

    if (intern.role !== "intern") {
      return res.status(403).json({
        message:
          "Only interns can view their assigned internship"
      });
    }

    // ==========================================
    // FIND ASSIGNED INTERNSHIPS
    // ==========================================
    const internships = await Internship.find({
      intern: req.user.userId
    })
      .populate(
        "supervisor",
        "name email role"
      )
      .sort({ createdAt: -1 });

    res.json({
      count: internships.length,
      internships
    });

  } catch (error) {
    console.error(
      "Get My Internship Error:",
      error
    );

    res.status(500).json({
      message:
        "Server error while getting my internship",
      error: error.message
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
      .populate(
        "intern",
        "name email university fieldOfStudy role"
      )
      .populate(
        "supervisor",
        "name email role"
      )
      .sort({ createdAt: -1 });

    res.json({
      count: internships.length,
      internships
    });

  } catch (error) {
    console.error(
      "Get All Internships Error:",
      error
    );

    res.status(500).json({
      message:
        "Server error while getting internships",
      error: error.message
    });
  }
});


// ==========================================
// UPDATE INTERNSHIP GPS LOCATION
// ADMIN ONLY
// ==========================================
router.patch(
  "/:id/location",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const {
        latitude,
        longitude,
        allowedRadius
      } = req.body;

      // ==========================================
      // VALIDATE GPS
      // ==========================================
      if (
        latitude === undefined ||
        longitude === undefined
      ) {
        return res.status(400).json({
          message:
            "Latitude and longitude are required"
        });
      }

      const newLatitude = Number(latitude);
      const newLongitude = Number(longitude);

      if (
        Number.isNaN(newLatitude) ||
        Number.isNaN(newLongitude)
      ) {
        return res.status(400).json({
          message:
            "Latitude and longitude must be valid numbers"
        });
      }

      // ==========================================
      // FIND INTERNSHIP
      // ==========================================
      const internship =
        await Internship.findById(req.params.id);

      if (!internship) {
        return res.status(404).json({
          message: "Internship not found"
        });
      }

      // ==========================================
      // UPDATE GPS
      // ==========================================
      internship.latitude = newLatitude;
      internship.longitude = newLongitude;

      if (allowedRadius !== undefined) {
        const newRadius = Number(allowedRadius);

        if (
          Number.isNaN(newRadius) ||
          newRadius <= 0
        ) {
          return res.status(400).json({
            message:
              "Allowed radius must be a valid positive number"
          });
        }

        internship.allowedRadius = newRadius;
      }

      await internship.save();

      // ==========================================
      // RETURN UPDATED INTERNSHIP
      // ==========================================
      const updatedInternship =
        await Internship.findById(internship._id)
          .populate(
            "intern",
            "name email university fieldOfStudy role"
          )
          .populate(
            "supervisor",
            "name email role"
          );

      res.json({
        message:
          "Internship GPS location updated successfully",
        internship: updatedInternship
      });

    } catch (error) {
      console.error(
        "Update GPS Location Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while updating internship GPS location",
        error: error.message
      });
    }
  }
);


export default router;