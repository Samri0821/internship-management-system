
import express from "express";

import {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance
} from "../controllers/attendanceController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import supervisorOnly from "../middleware/supervisorMiddleware.js";

import Attendance from "../models/Attendance.js";
import Internship from "../models/Internship.js";

const router = express.Router();


// ==========================================
// GPS CHECK-IN
// INTERN
// ==========================================

router.post(
  "/check-in",
  protect,
  checkIn
);


// ==========================================
// GPS CHECK-OUT
// INTERN
// ==========================================

router.post(
  "/check-out",
  protect,
  checkOut
);


// ==========================================
// GET MY ATTENDANCE
// INTERN
// ==========================================

router.get(
  "/my",
  protect,
  getMyAttendance
);


// ==========================================
// GET ALL ATTENDANCE
// ADMIN ONLY
// ==========================================

router.get(
  "/all",
  protect,
  adminOnly,
  getAllAttendance
);


// ==========================================
// GET MY INTERNS' ATTENDANCE
// SUPERVISOR ONLY
// ==========================================

router.get(
  "/supervisor",
  protect,
  supervisorOnly,
  async (req, res) => {
    try {

      // Find internships assigned to this supervisor
      const internships = await Internship.find({
        supervisor: req.user.userId
      }).select("_id organization position");

      if (internships.length === 0) {
        return res.json({
          count: 0,
          attendance: []
        });
      }

      // Get internship IDs
      const internshipIds = internships.map(
        internship => internship._id
      );

      // Find attendance records for those internships
      const attendance = await Attendance.find({
        internship: { $in: internshipIds }
      })
        .populate(
          "intern",
          "name email university fieldOfStudy"
        )
        .populate(
          "internship",
          "organization position department startDate endDate"
        )
        .sort({
          date: -1,
          createdAt: -1
        });

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
        message:
          "Server error while getting supervisor attendance"
      });
    }
  }
);


export default router;
