import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [applications, setApplications] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD INTERN DASHBOARD DATA
  // ==========================================
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [applicationsResponse, attendanceResponse] =
          await Promise.all([
            api.get("/applications/my"),
            api.get("/attendance/my"),
          ]);

        setApplications(
          applicationsResponse.data.applications || []
        );

        setAttendance(
          attendanceResponse.data.attendance || []
        );
      } catch (error) {
        console.error("Dashboard Error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // ==========================================
  // APPLICATION STATISTICS
  // ==========================================
  const pendingApplications = applications.filter(
    (application) => application.status === "pending"
  ).length;

  const approvedApplications = applications.filter(
    (application) => application.status === "approved"
  ).length;

  const rejectedApplications = applications.filter(
    (application) => application.status === "rejected"
  ).length;

  // ==========================================
  // CURRENT / APPROVED INTERNSHIP
  // ==========================================
  const approvedApplication = applications.find(
    (application) => application.status === "approved"
  );

  const currentInternship = approvedApplication?.internship;

  // ==========================================
  // LOGOUT
  // ==========================================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="dashboard">

      {/* ==========================================
          HEADER
      ========================================== */}
      <header className="dashboard-header">
        <div className="header-container">

          <div className="logo">
            Internship Management System
          </div>

          <div className="user-section">
            <span>
              {user?.name || "Intern"}
            </span>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

        </div>
      </header>

      {/* ==========================================
          NAVIGATION
      ========================================== */}
      <nav className="dashboard-nav">

        <Link
          to="/intern/dashboard"
          className="nav-link active"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/intern/internships"
          className="nav-link"
        >
          💼 Internships
        </Link>

        <Link
          to="/intern/applications"
          className="nav-link"
        >
          📋 My Applications
        </Link>

        <Link
          to="/intern/attendance"
          className="nav-link"
        >
          📍 Attendance
        </Link>

        <Link
          to="/intern/reports"
          className="nav-link"
        >
          📝 Daily Reports
        </Link>

        <Link
          to="/intern/messages"
          className="nav-link"
        >
          💬 Messages
        </Link>

        <Link
          to="/intern/github"
          className="nav-link"
        >
          🐙 GitHub
        </Link>

        <Link
          to="/intern/profile"
          className="nav-link"
        >
          👤 Profile
        </Link>

      </nav>

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}
      <main className="dashboard-main">

        <div className="welcome-section">
          <h1>
            Welcome, {user?.name || "Intern"} 👋
          </h1>

          <p>
            Here's an overview of your internship.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="loading">
            Loading dashboard...
          </div>
        ) : (
          <>
            {/* ==========================================
                STATISTICS
            ========================================== */}
            <div className="dashboard-grid">

              {/* Applications */}
              <div className="dashboard-card">
                <div className="card-icon">
                  📋
                </div>

                <div className="card-content">
                  <h2>Applications</h2>

                  <p>Total applications</p>

                  <h3>
                    {applications.length}
                  </h3>

                  <Link
                    to="/intern/applications"
                    className="card-button"
                  >
                    View Applications
                  </Link>
                </div>
              </div>

              {/* Pending */}
              <div className="dashboard-card">
                <div className="card-icon">
                  ⏳
                </div>

                <div className="card-content">
                  <h2>Pending</h2>

                  <p>
                    Applications waiting for review
                  </p>

                  <h3>
                    {pendingApplications}
                  </h3>
                </div>
              </div>

              {/* Approved */}
              <div className="dashboard-card">
                <div className="card-icon">
                  ✅
                </div>

                <div className="card-content">
                  <h2>Approved</h2>

                  <p>
                    Approved applications
                  </p>

                  <h3>
                    {approvedApplications}
                  </h3>
                </div>
              </div>

              {/* Attendance */}
              <div className="dashboard-card">
                <div className="card-icon">
                  📍
                </div>

                <div className="card-content">
                  <h2>Attendance</h2>

                  <p>
                    Attendance records
                  </p>

                  <h3>
                    {attendance.length}
                  </h3>

                  <Link
                    to="/intern/attendance"
                    className="card-button"
                  >
                    View Attendance
                  </Link>
                </div>
              </div>

            </div>

            {/* ==========================================
                CURRENT INTERNSHIP
            ========================================== */}
            <div className="dashboard-section">

              <h2>
                My Current Internship
              </h2>

              {currentInternship ? (
                <div className="internship-info">

                  <h3>
                    {currentInternship.position}
                  </h3>

                  <p>
                    <strong>Organization:</strong>{" "}
                    {currentInternship.organization}
                  </p>

                  <p>
                    <strong>Department:</strong>{" "}
                    {currentInternship.department}
                  </p>

                  <p>
                    <strong>Start Date:</strong>{" "}
                    {currentInternship.startDate
                      ? new Date(
                          currentInternship.startDate
                        ).toLocaleDateString()
                      : "Not specified"}
                  </p>

                  <p>
                    <strong>End Date:</strong>{" "}
                    {currentInternship.endDate
                      ? new Date(
                          currentInternship.endDate
                        ).toLocaleDateString()
                      : "Not specified"}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {currentInternship.status}
                  </p>

                </div>
              ) : (
                <div className="empty-state">

                  <p>
                    You don't have an approved internship yet.
                  </p>

                  <Link
                    to="/intern/internships"
                    className="card-button"
                  >
                    Browse Internships
                  </Link>

                </div>
              )}

            </div>

            {/* ==========================================
                APPLICATION SUMMARY
            ========================================== */}
            <div className="dashboard-section">

              <h2>
                Application Summary
              </h2>

              <div className="summary-row">

                <div>
                  <strong>Total</strong>
                  <span>
                    {applications.length}
                  </span>
                </div>

                <div>
                  <strong>Pending</strong>
                  <span>
                    {pendingApplications}
                  </span>
                </div>

                <div>
                  <strong>Approved</strong>
                  <span>
                    {approvedApplications}
                  </span>
                </div>

                <div>
                  <strong>Rejected</strong>
                  <span>
                    {rejectedApplications}
                  </span>
                </div>

              </div>

            </div>

          </>
        )}

      </main>

    </div>
  );
}

export default Dashboard;