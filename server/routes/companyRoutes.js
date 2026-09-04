import express from "express";
import User from "../models/User.js";
import Internship from "../models/Internship.js";
import Application from "../models/Application.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// COMPANY ONLY MIDDLEWARE
// ==========================================
const companyOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "company") {
    return res.status(403).json({
      message: "Access denied. Company only."
    });
  }

  next();
};

// ==========================================
// GET COMPANY DASHBOARD
// GET /api/company/dashboard
// ==========================================
router.get(
  "/dashboard",
  protect,
  companyOnly,
  async (req, res) => {
    try {
      const company = await User.findById(req.user.userId)
        .select("name email role");

      if (!company) {
        return res.status(404).json({
          message: "Company account not found"
        });
      }

      const internships = await Internship.find({
        organization: company.name
      });

      const internshipIds = internships.map(
        (internship) => internship._id
      );

      const applications = await Application.find({
        internship: { $in: internshipIds }
      }).populate(
        "applicant",
        "name email university fieldOfStudy"
      );

      const activeInternships = internships.filter(
        (internship) =>
          internship.status === "active" ||
          internship.status === "upcoming"
      ).length;

      const selectedInterns = internships.filter(
        (internship) => internship.intern
      ).length;

      res.json({
        company: {
          id: company._id,
          name: company.name,
          email: company.email
        },

        statistics: {
          activeInternships,
          applications: applications.length,
          selectedInterns
        },

        internships,

        recentApplications: applications
          .sort((a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
          )
          .slice(0, 5)
      });

    } catch (error) {
      console.error(
        "Company Dashboard Error:",
        error
      );

      res.status(500).json({
        message: "Server error while loading company dashboard",
        error: error.message
      });
    }
  }
);

// ==========================================
// GET COMPANY INTERNSHIPS
// GET /api/company/internships
// ==========================================
router.get(
  "/internships",
  protect,
  companyOnly,
  async (req, res) => {
    try {
      const company = await User.findById(req.user.userId);

      if (!company) {
        return res.status(404).json({
          message: "Company not found"
        });
      }

      const internships = await Internship.find({
        organization: company.name
      })
        .populate(
          "supervisor",
          "name email role"
        )
        .populate(
          "intern",
          "name email university fieldOfStudy"
        )
        .sort({ createdAt: -1 });

      const results = await Promise.all(
        internships.map(async (internship) => {
          const applicants =
            await Application.countDocuments({
              internship: internship._id
            });

          return {
            ...internship.toObject(),
            applicants
          };
        })
      );

      res.json({
        count: results.length,
        internships: results
      });

    } catch (error) {
      console.error(
        "Company Internships Error:",
        error
      );

      res.status(500).json({
        message: "Server error while getting company internships",
        error: error.message
      });
    }
  }
);

// ==========================================
// GET SUPERVISORS
// GET /api/company/supervisors
// ==========================================
router.get(
  "/supervisors",
  protect,
  companyOnly,
  async (req, res) => {
    try {
      const supervisors = await User.find({
        role: "supervisor"
      }).select("name email");

      res.json({
        count: supervisors.length,
        supervisors
      });

    } catch (error) {
      res.status(500).json({
        message: "Server error while getting supervisors",
        error: error.message
      });
    }
  }
);

// ==========================================
// CREATE COMPANY INTERNSHIP
// POST /api/company/internships
// ==========================================
router.post(
  "/internships",
  protect,
  companyOnly,
  async (req, res) => {
    try {
      const company = await User.findById(
        req.user.userId
      );

      if (!company) {
        return res.status(404).json({
          message: "Company not found"
        });
      }

      const {
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

      if (
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
            "Please provide all required internship information including GPS location and supervisor"
        });
      }

      const supervisorUser =
        await User.findById(supervisor);

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

      const internship = await Internship.create({
        organization: company.name,
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
            : 200,
        status: "upcoming"
      });

      const populatedInternship =
        await Internship.findById(
          internship._id
        )
          .populate(
            "supervisor",
            "name email role"
          );

      res.status(201).json({
        message:
          "Internship created successfully",
        internship: populatedInternship
      });

    } catch (error) {
      console.error(
        "Company Create Internship Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while creating internship",
        error: error.message
      });
    }
  }
);

// ==========================================
// DELETE COMPANY INTERNSHIP
// DELETE /api/company/internships/:id
// ==========================================
router.delete(
  "/internships/:id",
  protect,
  companyOnly,
  async (req, res) => {
    try {
      const company = await User.findById(
        req.user.userId
      );

      const internship =
        await Internship.findOne({
          _id: req.params.id,
          organization: company.name
        });

      if (!internship) {
        return res.status(404).json({
          message:
            "Internship not found or does not belong to your company"
        });
      }

      const applications =
        await Application.countDocuments({
          internship: internship._id
        });

      if (applications > 0) {
        return res.status(400).json({
          message:
            "This internship cannot be deleted because applications already exist"
        });
      }

      await Internship.findByIdAndDelete(
        internship._id
      );

      res.json({
        message:
          "Internship deleted successfully"
      });

    } catch (error) {
      console.error(
        "Company Delete Internship Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while deleting internship",
        error: error.message
      });
    }
  }
);

// ==========================================
// GET COMPANY APPLICATIONS
// GET /api/company/applications
// ==========================================
router.get(
  "/applications",
  protect,
  companyOnly,
  async (req, res) => {
    try {
      const company = await User.findById(
        req.user.userId
      );

      const internships =
        await Internship.find({
          organization: company.name
        }).select("_id");

      const internshipIds =
        internships.map(
          (item) => item._id
        );

      const applications =
        await Application.find({
          internship: {
            $in: internshipIds
          }
        })
          .populate(
            "applicant",
            "name email university fieldOfStudy role"
          )
          .populate(
            "internship",
            "organization fieldOfStudy department position supervisor intern startDate endDate status"
          )
          .sort({ createdAt: -1 });

      res.json({
        count: applications.length,
        applications
      });

    } catch (error) {
      console.error(
        "Company Applications Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while getting company applications",
        error: error.message
      });
    }
  }
);

// ==========================================
// UPDATE APPLICATION
// PATCH /api/company/applications/:id/status
// ==========================================
router.patch(
  "/applications/:id/status",
  protect,
  companyOnly,
  async (req, res) => {
    try {
      const {
        status,
        remarks
      } = req.body;

      if (
        !["pending", "approved", "rejected"]
          .includes(status)
      ) {
        return res.status(400).json({
          message:
            "Invalid application status"
        });
      }

      const company = await User.findById(
        req.user.userId
      );

      const application =
        await Application.findById(
          req.params.id
        );

      if (!application) {
        return res.status(404).json({
          message: "Application not found"
        });
      }

      const internship =
        await Internship.findById(
          application.internship
        );

      if (!internship) {
        return res.status(404).json({
          message: "Internship not found"
        });
      }

      if (
        internship.organization !==
        company.name
      ) {
        return res.status(403).json({
          message:
            "You cannot manage this application"
        });
      }

      // ========================================
      // APPROVE APPLICATION
      // ========================================
      if (status === "approved") {
        if (
          internship.intern &&
          internship.intern.toString() !==
            application.applicant.toString()
        ) {
          return res.status(400).json({
            message:
              "This internship already has an assigned intern"
          });
        }

        internship.intern =
          application.applicant;

        await internship.save();
      }

      application.status = status;

      if (remarks !== undefined) {
        application.remarks = remarks;
      }

      await application.save();

      const updated =
        await Application.findById(
          application._id
        )
          .populate(
            "applicant",
            "name email university fieldOfStudy role"
          )
          .populate(
            "internship",
            "organization fieldOfStudy department position supervisor intern startDate endDate status"
          );

      res.json({
        message:
          `Application ${status} successfully`,
        application: updated
      });

    } catch (error) {
      console.error(
        "Company Application Status Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while updating application",
        error: error.message
      });
    }
  }
);

export default router;