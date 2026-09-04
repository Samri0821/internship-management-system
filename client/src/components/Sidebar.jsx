import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <h2>Intern Portal</h2>

      <nav>

        <NavLink to="/dashboard">
          🏠 Dashboard
        </NavLink>

        <NavLink to="/applications">
          📋 My Applications
        </NavLink>

        <NavLink to="/attendance">
          📍 Attendance
        </NavLink>

        <NavLink to="/daily-reports">
          📝 Daily Reports
        </NavLink>

        <NavLink to="/messages">
          💬 Chat
        </NavLink>

        <NavLink to="/github">
          🐙 GitHub
        </NavLink>

        <NavLink to="/profile">
          👤 Profile
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;