import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const statistics = [
    {
      title: "Total Interns",
      value: "128",
      icon: "👨‍🎓",
      link: "/admin/interns",
    },
    {
      title: "Supervisors",
      value: "24",
      icon: "👨‍💼",
      link: "/admin/supervisors",
    },
    {
      title: "Companies",
      value: "36",
      icon: "🏢",
      link: "/admin/companies",
    },
    {
      title: "Internships",
      value: "52",
      icon: "💼",
      link: "/admin/internships",
    },
    {
      title: "Applications",
      value: "214",
      icon: "📄",
      link: "/admin/applications",
    },
    {
      title: "Pending Applications",
      value: "38",
      icon: "⏳",
      link: "/admin/applications",
    },
    {
      title: "Today's Attendance",
      value: "106",
      icon: "📍",
      link: "/admin/attendance",
    },
    {
      title: "Interviews",
      value: "15",
      icon: "🎥",
      link: "/admin/interviews",
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
            Admin Dashboard
          </h1>

          <p className="mt-2 text-blue-100">
            Manage the Internship Management System.
          </p>
        </div>

        {/* =========================================
            STATISTICS
        ========================================= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat) => (
            <Link
              key={stat.title}
              to={stat.link}
              className="group rounded-2xl border border-white/20 bg-white/90 p-5 shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-gray-800">
                    {stat.value}
                  </p>
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
        <div className="mt-8 rounded-2xl border border-white/20 bg-white/90 p-6 shadow-xl backdrop-blur-md">

          <h2 className="mb-5 text-xl font-bold text-gray-800">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            <QuickAction
              icon="👨‍🎓"
              title="Manage Interns"
              link="/admin/interns"
            />

            <QuickAction
              icon="👨‍💼"
              title="Manage Supervisors"
              link="/admin/supervisors"
            />

            <QuickAction
              icon="🏢"
              title="Manage Companies"
              link="/admin/companies"
            />

            <QuickAction
              icon="💼"
              title="Create Internship"
              link="/admin/internships"
            />

          </div>
        </div>

        {/* =========================================
            RECENT ACTIVITY
        ========================================= */}
        <div className="mt-6 rounded-2xl border border-white/20 bg-white/90 p-6 shadow-xl backdrop-blur-md">

          <h2 className="mb-5 text-xl font-bold text-gray-800">
            Recent Activity
          </h2>

          <div className="space-y-5">

            <Activity
              icon="👨‍🎓"
              title="New intern registered"
              description="A new intern joined the system."
              time="15 minutes ago"
            />

            <Activity
              icon="📄"
              title="New application submitted"
              description="An intern submitted an internship application."
              time="1 hour ago"
            />

            <Activity
              icon="🏢"
              title="Company registered"
              description="A new company registration is waiting for review."
              time="3 hours ago"
            />

            <Activity
              icon="📍"
              title="Attendance recorded"
              description="Today's attendance records have been updated."
              time="5 hours ago"
            />

          </div>
        </div>

      </div>
    </div>
  );
};


/* =========================================
   QUICK ACTION COMPONENT
========================================= */

const QuickAction = ({ icon, title, link }) => (
  <Link
    to={link}
    className="group rounded-xl bg-gray-100/80 p-5 transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-md"
  >
    <div className="mb-3 text-2xl transition duration-300 group-hover:scale-110">
      {icon}
    </div>

    <p className="font-semibold text-gray-800">
      {title}
    </p>
  </Link>
);


/* =========================================
   ACTIVITY COMPONENT
========================================= */

const Activity = ({ icon, title, description, time }) => (
  <div className="flex gap-4">

    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
      {icon}
    </div>

    <div>
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

export default AdminDashboard;