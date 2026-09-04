import React from "react";
import { useParams, Link } from "react-router-dom";

const InternDetails = () => {
  const { id } = useParams();

  const intern = {
    name: "Melkam",
    email: "shomronityirga@gmail.com",
    university: "Addis Ababa University",
    field: "Software Engineering",
    internship: "Software Development Intern",
    organization: "ABC Technology Solutions",
    startDate: "September 1, 2026",
    endDate: "December 1, 2026",
    attendance: "92%",
    reports: "18",
    status: "Active"
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        <Link
          to="/supervisor/interns"
          className="text-blue-600 font-medium"
        >
          ← Back to Interns
        </Link>

        <div className="bg-white rounded-2xl border shadow-sm p-8 mt-6">

          <div className="flex flex-col md:flex-row md:items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl">
              👨‍🎓
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">
                {intern.name}
              </h1>

              <p className="text-gray-500 mt-1">
                {intern.email}
              </p>

              <span className="inline-block mt-3 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                {intern.status}
              </span>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

            <Info title="University" value={intern.university} />
            <Info title="Field of Study" value={intern.field} />
            <Info title="Internship" value={intern.internship} />
            <Info title="Organization" value={intern.organization} />
            <Info title="Start Date" value={intern.startDate} />
            <Info title="End Date" value={intern.endDate} />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

            <Stat
              title="Attendance"
              value={intern.attendance}
              icon="📍"
            />

            <Stat
              title="Reports Submitted"
              value={intern.reports}
              icon="📋"
            />

            <Stat
              title="Status"
              value={intern.status}
              icon="✅"
            />

          </div>

        </div>
      </div>
    </div>
  );
};

const Info = ({ title, value }) => (
  <div className="bg-gray-50 rounded-xl p-4">
    <p className="text-sm text-gray-500">
      {title}
    </p>
    <p className="font-semibold text-gray-800 mt-1">
      {value}
    </p>
  </div>
);

const Stat = ({ title, value, icon }) => (
  <div className="bg-gray-50 rounded-xl p-5">
    <div className="text-2xl">
      {icon}
    </div>

    <p className="text-sm text-gray-500 mt-3">
      {title}
    </p>

    <p className="text-2xl font-bold text-gray-800 mt-1">
      {value}
    </p>
  </div>
);

export default InternDetails;