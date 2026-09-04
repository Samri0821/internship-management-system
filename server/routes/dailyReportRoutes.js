import express from "express";

import {
  createDailyReport,
  getMyDailyReports,
  getSupervisorDailyReports,
  getDailyReportById,
  updateDailyReport,
  deleteDailyReport,
  reviewDailyReport
} from "../controllers/dailyReportController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// DAILY REPORT ROUTES
// ==========================================


// ==========================================
// SUBMIT DAILY REPORT
// ==========================================
router.post(
  "/",
  authMiddleware,
  createDailyReport
);


// ==========================================
// GET MY DAILY REPORTS
// ==========================================
router.get(
  "/my-reports",
  authMiddleware,
  getMyDailyReports
);


// ==========================================
// GET SUPERVISOR DAILY REPORTS
// ==========================================
router.get(
  "/supervisor-reports",
  authMiddleware,
  getSupervisorDailyReports
);


// ==========================================
// GET SINGLE DAILY REPORT
// ==========================================
router.get(
  "/:id",
  authMiddleware,
  getDailyReportById
);


// ==========================================
// UPDATE DAILY REPORT
// ==========================================
router.put(
  "/:id",
  authMiddleware,
  updateDailyReport
);


// ==========================================
// DELETE DAILY REPORT
// ==========================================
router.delete(
  "/:id",
  authMiddleware,
  deleteDailyReport
);


// ==========================================
// REVIEW DAILY REPORT
// ==========================================
router.put(
  "/:id/review",
  authMiddleware,
  reviewDailyReport
);


export default router;