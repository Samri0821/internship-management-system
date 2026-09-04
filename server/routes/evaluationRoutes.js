import express from "express";

import {
  createEvaluation,
  getSupervisorInternsForEvaluation,
  getSupervisorEvaluations,
  getMyEvaluations
} from "../controllers/evaluationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// SUPERVISOR EVALUATION ROUTES
// ==========================================

// Get interns assigned to supervisor
router.get(
  "/supervisor-interns",
  authMiddleware,
  getSupervisorInternsForEvaluation
);

// Get supervisor's submitted evaluations
router.get(
  "/supervisor-evaluations",
  authMiddleware,
  getSupervisorEvaluations
);

// Submit evaluation
router.post(
  "/",
  authMiddleware,
  createEvaluation
);

// Get logged-in intern's evaluations
router.get(
  "/my-evaluations",
  authMiddleware,
  getMyEvaluations
);

export default router;