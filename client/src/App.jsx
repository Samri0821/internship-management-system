
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ===============================
// HOME PAGE
// ===============================
import Home from "./pages/Home";

// ===============================
// AUTH PAGES
// ===============================
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// ===============================
// ADMIN PAGES
// ===============================
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageInterns from "./pages/admin/ManageInterns";
import ManageSupervisors from "./pages/admin/ManageSupervisors";
import ManageCompanies from "./pages/admin/ManageCompanies";
import ManageInternships from "./pages/admin/ManageInternships";
import ManageApplications from "./pages/admin/ManageApplications";
import Attendance from "./pages/admin/Attendance";
import Interviews from "./pages/admin/Interviews";
import Reports from "./pages/admin/Reports";
import Notifications from "./pages/admin/Notifications";

// ===============================
// SUPERVISOR PAGES
// ===============================
import SupervisorDashboard from "./pages/supervisor/SupervisorDashboard";
import AssignedInterns from "./pages/supervisor/AssignedInterns";
import SupervisorAttendance from "./pages/supervisor/Attendance";
import SupervisorDailyReports from "./pages/supervisor/DailyReports";
import Evaluations from "./pages/supervisor/Evaluations";
import InternDetails from "./pages/supervisor/InternDetails";
import SupervisorInterviews from "./pages/supervisor/Interviews";
import SupervisorMessages from "./pages/supervisor/Messages";
import SupervisorProfile from "./pages/supervisor/SupervisorProfile";

// ===============================
// INTERN PAGES
// ===============================
import InternDashboard from "./pages/intern/Dashboard";
import Internships from "./pages/intern/Internships";
import InternApplications from "./pages/intern/Applications";
import InternAttendance from "./pages/intern/Attendance";
import InternDailyReports from "./pages/intern/DailyReports";
import InternMessages from "./pages/intern/Messages";
import InternGitHub from "./pages/intern/GitHub";
import InternProfile from "./pages/intern/Profile";

// ===============================
// COMPANY PAGES
// ===============================
import CompanyDashboard from "./pages/company/CompanyDashboard";
import CompanyInternships from "./pages/company/Internships";
import CompanyApplications from "./pages/company/Applications";
import CompanyInterviews from "./pages/company/Interviews";
import CompanyMessages from "./pages/company/Messages";
import CompanyProfile from "./pages/company/CompanyProfile";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================
            HOME ROUTE
        ===================================== */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* =====================================
            AUTH ROUTES
        ===================================== */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =====================================
            ADMIN ROUTES
        ===================================== */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/interns"
          element={<ManageInterns />}
        />

        <Route
          path="/admin/supervisors"
          element={<ManageSupervisors />}
        />

        <Route
          path="/admin/companies"
          element={<ManageCompanies />}
        />

        <Route
          path="/admin/internships"
          element={<ManageInternships />}
        />

        <Route
          path="/admin/applications"
          element={<ManageApplications />}
        />

        <Route
          path="/admin/attendance"
          element={<Attendance />}
        />

        <Route
          path="/admin/interviews"
          element={<Interviews />}
        />

        <Route
          path="/admin/reports"
          element={<Reports />}
        />

        <Route
          path="/admin/notifications"
          element={<Notifications />}
        />


        {/* =====================================
            SUPERVISOR ROUTES
        ===================================== */}
        <Route
          path="/supervisor/dashboard"
          element={<SupervisorDashboard />}
        />

        <Route
          path="/supervisor/interns"
          element={<AssignedInterns />}
        />

        <Route
          path="/supervisor/attendance"
          element={<SupervisorAttendance />}
        />

        <Route
          path="/supervisor/reports"
          element={<SupervisorDailyReports />}
        />

        <Route
          path="/supervisor/evaluations"
          element={<Evaluations />}
        />

        <Route
          path="/supervisor/intern-details"
          element={<InternDetails />}
        />

        <Route
          path="/supervisor/interviews"
          element={<SupervisorInterviews />}
        />

        <Route
          path="/supervisor/messages"
          element={<SupervisorMessages />}
        />

        <Route
          path="/supervisor/profile"
          element={<SupervisorProfile />}
        />


        {/* =====================================
            INTERN ROUTES
        ===================================== */}
        <Route
          path="/intern/dashboard"
          element={<InternDashboard />}
        />

        <Route
          path="/intern/internships"
          element={<Internships />}
        />

        <Route
          path="/intern/applications"
          element={<InternApplications />}
        />

        <Route
          path="/intern/attendance"
          element={<InternAttendance />}
        />

        <Route
          path="/intern/reports"
          element={<InternDailyReports />}
        />

        <Route
          path="/intern/messages"
          element={<InternMessages />}
        />

        <Route
          path="/intern/github"
          element={<InternGitHub />}
        />

        <Route
          path="/intern/profile"
          element={<InternProfile />}
        />


        {/* =====================================
            COMPANY ROUTES
        ===================================== */}
        <Route
          path="/company/dashboard"
          element={<CompanyDashboard />}
        />

        <Route
          path="/company/internships"
          element={<CompanyInternships />}
        />

        <Route
          path="/company/applications"
          element={<CompanyApplications />}
        />

        <Route
          path="/company/interviews"
          element={<CompanyInterviews />}
        />

        <Route
          path="/company/messages"
          element={<CompanyMessages />}
        />

        <Route
          path="/company/profile"
          element={<CompanyProfile />}
        />


        {/* =====================================
            404 ROUTE
        ===================================== */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
