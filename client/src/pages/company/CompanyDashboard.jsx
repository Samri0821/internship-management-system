
import React from "react";
import { Link } from "react-router-dom";

const CompanyDashboard = () => {
  // Temporary data — we will connect this to the backend later
  const stats = [
    {
      title: "Active Internships",
      value: "4",
      icon: "💼",
      link: "/company/internships",
    },
    {
      title: "Applications",
      value: "18",
      icon: "📄",
      link: "/company/applications",
    },
    {
      title: "Interviews",
      value: "6",
      icon: "🎥",
      link: "/company/interviews",
    },
    {
      title: "Selected Interns",
      value: "5",
      icon: "👨‍🎓",
      link: "/company/applications",
    },
  ];

  const recentApplications = [
    {
      name: "Melkam",
      position: "Software Development Intern",
      date: "Sep 1, 2026",
      status: "Pending",
    },
    {
      name: "Abebe Kebede",
      position: "Frontend Development Intern",
      date: "Aug 30, 2026",
      status: "Approved",
    },
    {
      name: "Sara Alemu",
      position: "UI/UX Design Intern",
      date: "Aug 28, 2026",
      status: "Pending",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Approved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="mx-auto max-w-7xl">

        {/* =========================================
            HEADER
        ========================================= */}
        <div className="mb-8 rounded-2xl border border-white/20 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
          <h1 className="text-3xl font-bold text-white">
            Company Dashboard
          </h1>

          <p className="mt-2 text-blue-100">
            Welcome back! Manage your internships, applications, and
            interviews.
          </p>
        </div>


        {/* =========================================
            STATISTICS
        ========================================= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link
              key={stat.title}
              to={stat.link}
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
        <div className="mt-8 rounded-2xl border border-white/20 bg-white/90 p-6 shadow-xl backdrop-blur-md">

          <h2 className="mb-5 text-xl font-bold text-gray-800">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <Link
              to="/company/internships"
              className="group rounded-xl border border-gray-200 bg-gray-100/80 p-5 transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-md"
            >
              <div className="mb-2 text-2xl transition duration-300 group-hover:scale-110">
                ➕
              </div>

              <h3 className="font-semibold text-gray-800">
                Post Internship
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Create a new internship opportunity.
              </p>
            </Link>


            <Link
              to="/company/applications"
              className="group rounded-xl border border-gray-200 bg-gray-100/80 p-5 transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-md"
            >
              <div className="mb-2 text-2xl transition duration-300 group-hover:scale-110">
                📋
              </div>

              <h3 className="font-semibold text-gray-800">
                Review Applications
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Review and manage intern applications.
              </p>
            </Link>


            <Link
              to="/company/interviews"
              className="group rounded-xl border border-gray-200 bg-gray-100/80 p-5 transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-md"
            >
              <div className="mb-2 text-2xl transition duration-300 group-hover:scale-110">
                🎥
              </div>

              <h3 className="font-semibold text-gray-800">
                Manage Interviews
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Schedule and manage video interviews.
              </p>
            </Link>

          </div>
        </div>


        {/* =========================================
            RECENT APPLICATIONS
        ========================================= */}
        <div className="mt-8 rounded-2xl border border-white/20 bg-white/90 p-6 shadow-xl backdrop-blur-md">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-bold text-gray-800">
              Recent Applications
            </h2>

            <Link
              to="/company/applications"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View All
            </Link>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px]">

              <thead>
                <tr className="border-b border-gray-200 text-left">

                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                    Intern
                  </th>

                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                    Position
                  </th>

                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                    Date
                  </th>

                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                </tr>
              </thead>


              <tbody>

                {recentApplications.map((application, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-blue-50/60"
                  >

                    <td className="px-4 py-4 font-medium text-gray-800">
                      {application.name}
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {application.position}
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {application.date}
                    </td>

                    <td className="px-4 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        </div>


        {/* =========================================
            BOTTOM INFORMATION
        ========================================= */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Company Profile */}
          <div className="rounded-2xl border border-white/20 bg-white/90 p-6 shadow-xl backdrop-blur-md">

            <h2 className="text-lg font-bold text-gray-800">
              Company Profile
            </h2>

            <p className="mt-2 text-gray-600">
              Keep your company information updated so interns can learn more
              about your organization.
            </p>

            <Link
              to="/company/profile"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              View Profile
            </Link>

          </div>


          {/* Messages */}
          <div className="rounded-2xl border border-white/20 bg-white/90 p-6 shadow-xl backdrop-blur-md">

            <h2 className="text-lg font-bold text-gray-800">
              Messages
            </h2>

            <p className="mt-2 text-gray-600">
              Communicate with interns and manage your conversations.
            </p>

            <Link
              to="/company/messages"
              className="mt-4 inline-block rounded-lg bg-gray-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-900"
            >
              Open Messages
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CompanyDashboard;
