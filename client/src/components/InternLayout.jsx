import { NavLink, Outlet, useNavigate } from "react-router-dom";

function InternLayout() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-logo">
          <h2>IMS</h2>
          <p>Intern Portal</p>
        </div>

        <nav className="sidebar-nav">

          <NavLink to="/intern-dashboard">
            🏠 Dashboard
          </NavLink>

          <NavLink to="/internships">
            🔍 Internships
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
            💬 Messages
          </NavLink>

          <NavLink to="/github">
            🐙 GitHub
          </NavLink>

          <NavLink to="/profile">
            👤 Profile
          </NavLink>

        </nav>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </aside>


      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* TOP BAR */}
        <header className="topbar">

          <div>
            <h3>Internship Management System</h3>
          </div>

          <div className="user-info">
            <span>{user?.name}</span>
            <span className="role-badge">
              Intern
            </span>
          </div>

        </header>

        {/* PAGE CONTENT */}
        <section className="page-content">
          <Outlet />
        </section>

      </main>

    </div>
  );
}

export default InternLayout;