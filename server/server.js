import "dotenv/config";
import passport from "passport";
import express from "express";
import cors from "cors";
import dns from "dns";
import "./config/passport.js";
import connectDB from "./config/db.js";

// ========================================
// ROUTES
// ========================================
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import dailyReportRoutes from "./routes/dailyReportRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import githubRoutes from "./routes/githubRoutes.js";
import supervisorRoutes from "./routes/supervisorRoutes.js";
import evaluationRoutes from "./routes/evaluationRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";

// ========================================
// FIX MONGODB ATLAS DNS RESOLUTION
// ========================================
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// ========================================
// CREATE EXPRESS APP
// ========================================
const app = express();

// ========================================
// MIDDLEWARE
// ========================================
app.use(cors());

app.use(express.json());

app.use(passport.initialize());

app.use(express.urlencoded({ extended: true }));

// ========================================
// CONNECT TO MONGODB
// ========================================
connectDB();

// ========================================
// API ROUTES
// ========================================
app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/internships", internshipRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/daily-reports", dailyReportRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/github", githubRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use("/api/company", companyRoutes);
// ========================================
// SUPERVISOR ROUTES
// ========================================
app.use("/api/supervisor", supervisorRoutes);

// ========================================
// TEST ROUTE
// ========================================
app.get("/", (req, res) => {
  res.json({
    message: "Internship Management System Backend is Running!"
  });
});

// ========================================
// SERVER PORT
// ========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});