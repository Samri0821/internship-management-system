import express from "express";
import Internship from "../models/Internship.js";
import Attendance from "../models/Attendance.js";
import Application from "../models/Application.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// SUPERVISOR ROLE CHECK
// ==========================================
const supervisorOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "supervisor") {
    return res.status(403).json({
      message: "Access denied. Supervisor only."
    });
  }

  next();
};


// ==========================================
// GET MY INTERNSHIPS
// SUPERVISOR ONLY
// ==========================================
router.get(
  "/my-internships",
  protect,
  supervisorOnly,
  async (req, res) => {
    try {
      const internships = await Internship.find({
        supervisor: req.user.userId
      })
        .populate(
          "intern",
          "name email university fieldOfStudy role"
        )
        .populate(
          "supervisor",
          "name email"
        )
        .sort({ createdAt: -1 });

      res.json({
        count: internships.length,
        internships
      });

    } catch (error) {
      console.error(
        "Get Supervisor Internships Error:",
        error
      );

      res.status(500).json({
        message: "Server error while getting supervisor internships"
      });
    }
  }
);


// ==========================================
// GET MY ASSIGNED INTERNS
// SUPERVISOR ONLY
// ==========================================
router.get(
  "/my-interns",
  protect,
  supervisorOnly,
  async (req, res) => {
    try {
      const internships = await Internship.find({
        supervisor: req.user.userId,
        intern: { $ne: null }
      })
        .populate(
          "intern",
          "name email university fieldOfStudy role"
        )
        .sort({ createdAt: -1 });


      const interns = internships
        .filter((internship) => internship.intern)
        .map((internship) => ({
          _id: internship.intern._id,
          name: internship.intern.name,
          email: internship.intern.email,
          university: internship.intern.university,
          fieldOfStudy: internship.intern.fieldOfStudy,
          role: internship.intern.role,

          internship: {
            _id: internship._id,
            organization: internship.organization,
            fieldOfStudy: internship.fieldOfStudy,
            department: internship.department,
            position: internship.position,
            startDate: internship.startDate,
            endDate: internship.endDate,
            status: internship.status
          }
        }));


      res.json({
        count: interns.length,
        interns
      });

    } catch (error) {
      console.error(
        "Get My Interns Error:",
        error
      );

      res.status(500).json({
        message: "Server error while getting assigned interns"
      });
    }
  }
);


// ==========================================
// GET MY INTERNS' APPLICATIONS
// SUPERVISOR ONLY
// ==========================================
router.get(
  "/my-applications",
  protect,
  supervisorOnly,
  async (req, res) => {
    try {

      // Find internships assigned to this supervisor
      const internships = await Internship.find({
        supervisor: req.user.userId
      }).select("_id");


      const internshipIds = internships.map(
        (internship) => internship._id
      );


      // Find applications belonging to those internships
      const applications = await Application.find({
        internship: { $in: internshipIds }
      })
        .populate(
          "applicant",
          "name email university fieldOfStudy role"
        )
        .populate(
          "internship",
          "organization fieldOfStudy department position startDate endDate status"
        )
        .sort({ createdAt: -1 });


      res.json({
        count: applications.length,
        applications
      });

    } catch (error) {
      console.error(
        "Get Supervisor Applications Error:",
        error
      );

      res.status(500).json({
        message: "Server error while getting supervisor applications"
      });
    }
  }
);


// ==========================================
// GET MY INTERNS' ATTENDANCE
// SUPERVISOR ONLY
// ==========================================
router.get(
  "/my-attendance",
  protect,
  supervisorOnly,
  async (req, res) => {
    try {

      // Find internships assigned to this supervisor
      const internships = await Internship.find({
        supervisor: req.user.userId
      }).select(
        "_id organization fieldOfStudy department position startDate endDate status"
      );


      // No internships assigned
      if (internships.length === 0) {
        return res.json({
          count: 0,
          attendance: []
        });
      }


      // Get internship IDs
      const internshipIds = internships.map(
        (internship) => internship._id
      );


      // Find attendance for those internships
      const attendance = await Attendance.find({
        internship: { $in: internshipIds }
      })
        .populate(
          "intern",
          "name email university fieldOfStudy role"
        )
        .populate(
          "internship",
          "organization fieldOfStudy department position startDate endDate status"
        )
        .sort({ date: -1 });


      res.json({
        count: attendance.length,
        attendance
      });

    } catch (error) {
      console.error(
        "Get Supervisor Attendance Error:",
        error
      );

      res.status(500).json({
        message: "Server error while getting supervisor attendance"
      });
    }
  }
);


export default router;