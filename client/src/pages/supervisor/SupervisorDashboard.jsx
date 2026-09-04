
import React from "react";
import { Link } from "react-router-dom";

const SupervisorDashboard = () => {
  const stats = [
    {
      title: "Assigned Interns",
      value: "12",
      icon: "👨‍🎓",
      link: "/supervisor/interns",
    },
    {
      title: "Pending Reports",
      value: "4",
      icon: "📋",
      link: "/supervisor/reports",
    },
    {
      title: "Today's Attendance",
      value: "10/12",
      icon: "📍",
      link: "/supervisor/attendance",
    },
    {
      title: "Upcoming Interviews",
      value: "3",
      icon: "📅",
      link: "/supervisor/interviews",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="mx-auto max-w-7xl">

        {/* =========================================
            HEADER
        ========================================= */}
        <div className="mb-8 rounded-2xl border border-white/20 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
          <h1 className="text-3xl font-bold text-white">
            Supervisor Dashboard
          </h1>

          <p className="mt-2 text-blue-100">
            Monitor your interns and manage their internship activities.
          </p>
        </div>

        {/* =========================================
            STATISTICS
        ========================================= */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link
              to={stat.link}
              key={stat.title}
              className="group rounded-2xl border border-white/20 bg-white/90 p-6 shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-800">
                    {stat.value}
                  </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl transition duration-300 group-hover:scale-110 group-hover:bg-blue-200">
                  {stat.icon}
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* =========================================
            QUICK ACTIONS
        ========================================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-white/20 bg-white/90 p-6 shadow-xl backdrop-blur-md">

            <h2 className="mb-5 text-xl font-bold text-gray-800">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <Link
                to="/supervisor/interns"
                className="group rounded-xl border border-gray-200 bg-gray-100/80 p-4 transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-md"
              >
                <div className="mb-2 text-2xl transition duration-300 group-hover:scale-110">
                  👨‍🎓
                </div>

                <p className="font-semibold text-gray-800">
                  View Interns
                </p>
              </Link>

              <Link
                to="/supervisor/reports"
                className="group rounded-xl border border-gray-200 bg-gray-100/80 p-4 transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-md"
              >
                <div className="mb-2 text-2xl transition duration-300 group-hover:scale-110">
                  📋
                </div>

                <p className="font-semibold text-gray-800">
                  Review Reports
                </p>
              </Link>

              <Link
                to="/supervisor/attendance"
                className="group rounded-xl border border-gray-200 bg-gray-100/80 p-4 transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-md"
              >
                <div className="mb-2 text-2xl transition duration-300 group-hover:scale-110">
                  📍
                </div>

                <p className="font-semibold text-gray-800">
                  Attendance
                </p>
              </Link>

              <Link
                to="/supervisor/evaluations"
                className="group rounded-xl border border-gray-200 bg-gray-100/80 p-4 transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-md"
              >
                <div className="mb-2 text-2xl transition duration-300 group-hover:scale-110">
                  ⭐
                </div>

                <p className="font-semibold text-gray-800">
                  Evaluations
                </p>
              </Link>

            </div>
          </div>

          {/* =========================================
              RECENT ACTIVITY
          ========================================= */}
          <div className="rounded-2xl border border-white/20 bg-white/90 p-6 shadow-xl backdrop-blur-md">

            <h2 className="mb-5 text-xl font-bold text-gray-800">
              Recent Activity
            </h2>

            <div className="space-y-5">

              <Activity
                icon="📋"
                title="Daily report submitted"
                description="An intern submitted today's report."
                time="10 minutes ago"
              />

              <Activity
                icon="📍"
                title="Attendance recorded"
                description="Attendance was recorded successfully."
                time="1 hour ago"
              />

              <Activity
                icon="💬"
                title="New message"
                description="You received a new message from an intern."
                time="2 hours ago"
              />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


/* =========================================
   ACTIVITY COMPONENT
========================================= */

const Activity = ({ icon, title, description, time }) => {
  return (
    <div className="flex gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
        {icon}
      </div>

      <div className="flex-1">

        <h3 className="font-semibold text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          {description}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {time}
        </p>

      </div>
    </div>
  );
};

export default SupervisorDashboard;
