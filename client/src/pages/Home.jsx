import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// New futuristic background image
import internshipBackground from "../assets/internship-background.png";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(2, 6, 23, 0.60),
            rgba(2, 6, 23, 0.72)
          ),
          url(${internshipBackground})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* =========================================
          NAVIGATION BAR
      ========================================= */}
      <nav className="navbar">
        <div className="logo">
          Internship<span>MS</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#features">Features</a>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </nav>

      {/* =========================================
          HERO SECTION
      ========================================= */}
      <section
        className="hero"
        id="home"
        style={{
          background: "transparent",
        }}
      >
        <div className="hero-content">

          <div className="hero-text">

            <p className="welcome-text">
              WELCOME TO INTERNSHIP MANAGEMENT SYSTEM
            </p>

            <h1>
              Connect. Learn.
              <br />
              <span>Grow Your Career.</span>
            </h1>

            <p className="hero-description">
              A smart platform that connects students, companies,
              supervisors, and administrators to make internship
              management simple, organized, and effective.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={handleLogin}
              >
                Login
              </button>

              <button
                className="secondary-btn"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Explore Features
              </button>

            </div>
          </div>

          {/* =========================================
              HERO CARD
          ========================================= */}
          <div className="hero-card">

            <div className="card-icon">
              🎓
            </div>

            <h2>
              Manage Internships Easily
            </h2>

            <p>
              Apply for internships, communicate with supervisors,
              track attendance, schedule interviews, and monitor
              your internship progress in one place.
            </p>

            <div className="stats">

              <div>
                <strong>Students</strong>
                <span>Connect</span>
              </div>

              <div>
                <strong>Companies</strong>
                <span>Hire</span>
              </div>

              <div>
                <strong>Supervisors</strong>
                <span>Guide</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          ABOUT SECTION
      ========================================= */}
      <section
        className="about-section"
        id="about"
        style={{
          background: "transparent",
        }}
      >
        <div className="section-title">

          <p>
            ABOUT THE SYSTEM
          </p>

          <h2>
            Everything You Need for Internship Management
          </h2>

        </div>

        <div className="about-content">

          <p>
            The Internship Management System provides a centralized
            platform for managing the complete internship process.
            Students can discover and apply for opportunities while
            companies can manage internship positions and applicants.
            Supervisors can monitor interns and administrators can
            manage the entire system.
          </p>

        </div>
      </section>

      {/* =========================================
          FEATURES SECTION
      ========================================= */}
      <section
        className="features-section"
        id="features"
        style={{
          background: "transparent",
        }}
      >
        <div className="section-title">

          <p>
            FEATURES
          </p>

          <h2>
            Powerful Features for Everyone
          </h2>

        </div>

        <div className="features-grid">

          {/* Student */}
          <div className="feature-card">

            <div className="feature-icon">
              🎓
            </div>

            <h3>
              Student Portal
            </h3>

            <p>
              Students can register, search for internships,
              submit applications, and track their progress.
            </p>

          </div>

          {/* Company */}
          <div className="feature-card">

            <div className="feature-icon">
              🏢
            </div>

            <h3>
              Company Management
            </h3>

            <p>
              Companies can register, create internship opportunities,
              and manage applications.
            </p>

          </div>

          {/* Supervisor */}
          <div className="feature-card">

            <div className="feature-icon">
              👨‍🏫
            </div>

            <h3>
              Supervisor Monitoring
            </h3>

            <p>
              Supervisors can monitor interns, provide guidance,
              and follow internship activities.
            </p>

          </div>

          {/* Attendance */}
          <div className="feature-card">

            <div className="feature-icon">
              📍
            </div>

            <h3>
              GPS Attendance
            </h3>

            <p>
              Track internship attendance using location-based
              check-in and geofencing.
            </p>

          </div>

          {/* Messaging */}
          <div className="feature-card">

            <div className="feature-icon">
              💬
            </div>

            <h3>
              In-App Messaging
            </h3>

            <p>
              Students, supervisors, companies, and administrators
              can communicate through the platform.
            </p>

          </div>

          {/* Interviews */}
          <div className="feature-card">

            <div className="feature-icon">
              🎥
            </div>

            <h3>
              Video Interviews
            </h3>

            <p>
              Schedule and manage internship interviews through
              the system.
            </p>

          </div>

        </div>
      </section>

      {/* =========================================
          FOOTER
      ========================================= */}
      <footer
        className="footer"
        style={{
          background: "transparent",
        }}
      >
        <div className="logo">
          Internship<span>MS</span>
        </div>

        <p>
          Internship Management System © 2026
        </p>
      </footer>

    </div>
  );
};

export default Home;