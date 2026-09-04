
import express from "express";
import Application from "../models/Application.js";
import Internship from "../models/Internship.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();


// ==========================================
// SUBMIT INTERNSHIP APPLICATION
// INTERN
// ==========================================
router.post("/", protect, async (req, res) => {
  try {
    const {
      internshipId,
      motivation
    } = req.body;

    // Validate required fields
    if (!internshipId || !motivation) {
      return res.status(400).json({
        message: "Internship ID and motivation are required"
      });
    }

    // Find internship opportunity
    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({
        message: "Internship opportunity not found"
      });
    }

    // Check if internship is available
    if (internship.status !== "upcoming") {
      return res.status(400).json({
        message: "This internship is not currently available"
      });
    }

    // Check if intern already applied
    const existingApplication = await Application.findOne({
      internship: internshipId,
      applicant: req.user.userId
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this internship"
      });
    }

    // Create application
    const application = await Application.create({
      internship: internshipId,
      applicant: req.user.userId,
      organization: internship.organization,
      position: internship.position,
      department: internship.department,
      startDate: internship.startDate,
      endDate: internship.endDate,
      motivation
    });

    // Get created application with related data
    const populatedApplication = await Application.findById(
      application._id
    )
      .populate(
        "applicant",
        "name email university fieldOfStudy"
      )
      .populate(
        "internship",
        "organization fieldOfStudy department position supervisor startDate endDate status description latitude longitude allowedRadius"
      );

    res.status(201).json({
      message: "Internship application submitted successfully",
      application: populatedApplication
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
// INTERN
// ==========================================
router.get("/my", protect, async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.userId
    })
      .populate(
        "applicant",
        "name email university fieldOfStudy"
      )
      .populate(
        "internship",
        "organization fieldOfStudy department position supervisor startDate endDate status description latitude longitude allowedRadius"
      )
      .sort({ createdAt: -1 });

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


// ==========================================
// GET ALL APPLICATIONS
// ADMIN ONLY
// ==========================================
router.get("/all", protect, adminOnly, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate(
        "applicant",
        "name email role university fieldOfStudy"
      )
      .populate(
        "internship",
        "organization fieldOfStudy department position supervisor intern startDate endDate status description latitude longitude allowedRadius"
      )
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


// ==========================================
// UPDATE APPLICATION STATUS
// ADMIN ONLY
// ==========================================
router.patch("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const {
      status,
      remarks
    } = req.body;

    // Allowed application statuses
    const allowedStatuses = [
      "pending",
      "approved",
      "rejected"
    ];

    // Validate status
    if (!status) {
      return res.status(400).json({
        message: "Status is required"
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Use pending, approved, or rejected"
      });
    }

    // Find application
    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }


    // ==========================================
    // APPROVE APPLICATION
    // ==========================================
    if (status === "approved") {

      // Make sure application is linked to an internship
      if (!application.internship) {
        return res.status(400).json({
          message: "This application is not linked to an internship"
        });
      }

      // Find the internship
      const internship = await Internship.findById(
        application.internship
      );

      if (!internship) {
        return res.status(404).json({
          message: "Internship opportunity not found"
        });
      }

      // Check if another intern is already assigned
      if (
        internship.intern &&
        internship.intern.toString() !==
        application.applicant.toString()
      ) {
        return res.status(400).json({
          message:
            "This internship has already been assigned to another intern"
        });
      }

      // Assign applicant to internship
      internship.intern = application.applicant;

      await internship.save();
    }


    // ==========================================
    // UPDATE APPLICATION
    // ==========================================
    application.status = status;

    // Update remarks if provided
    if (remarks !== undefined) {
      application.remarks = remarks;
    }

    await application.save();


    // ==========================================
    // RETURN UPDATED APPLICATION
    // ==========================================
    const updatedApplication = await Application.findById(
      application._id
    )
      .populate(
        "applicant",
        "name email role university fieldOfStudy"
      )
      .populate(
        "internship",
        "organization fieldOfStudy department position supervisor intern startDate endDate status description latitude longitude allowedRadius"
      );

    res.json({
      message: `Application ${status} successfully`,
      application: updatedApplication
    });

  } catch (error) {
    console.error(
      "Update Application Status Error:",
      error
    );

    res.status(500).json({
      message: "Server error while updating application status"
    });
  }
});


export default router;