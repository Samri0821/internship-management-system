import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dns from "dns";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

// Fix MongoDB Atlas DNS resolution
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/attendance", attendanceRoutes);
// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Internship Management System Backend is Running!"
  });
});

// Server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});