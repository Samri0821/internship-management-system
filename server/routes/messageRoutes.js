import express from "express";

import {
  sendMessage,
  getChatHistory,
  markMessageAsRead
} from "../controllers/messageController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// SEND MESSAGE
// ==========================================
router.post(
  "/",
  authMiddleware,
  sendMessage
);

// ==========================================
// GET CHAT HISTORY
// ==========================================
router.get(
  "/:internship",
  authMiddleware,
  getChatHistory
);

// ==========================================
// MARK MESSAGE AS READ
// ==========================================
router.put(
  "/:id/read",
  authMiddleware,
  markMessageAsRead
);

export default router;