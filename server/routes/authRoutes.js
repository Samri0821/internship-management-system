
import express from "express";

import {
  registerIntern,
  registerCompany,
  login,
  createAdmin,
  createSupervisor,
  resetAdminPassword,
  resetInternPassword,
  resetSupervisorPassword,
} from "../controllers/authController.js";

const router = express.Router();

// ==========================================
// REGISTRATION
// ==========================================

router.post("/register", registerIntern);

router.post("/register-company", registerCompany);

// ==========================================
// LOGIN
// ==========================================

router.post("/login", login);

// ==========================================
// DEVELOPMENT ACCOUNT CREATION
// ==========================================

router.post("/create-admin", createAdmin);

router.post("/create-supervisor", createSupervisor);

// ==========================================
// DEVELOPMENT PASSWORD RESET
// ==========================================

router.put(
  "/reset-admin-password",
  resetAdminPassword
);

router.put(
  "/reset-intern-password",
  resetInternPassword
);

router.put(
  "/reset-supervisor-password",
  resetSupervisorPassword
);

export default router;
