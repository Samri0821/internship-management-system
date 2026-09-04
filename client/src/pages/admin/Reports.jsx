import React from "react";

const Reports = () => {
  const statistics = [
    {
      title: "Total Interns",
      value: "124",
      description: "Registered interns",
    },
    {
      title: "Active Internships",
      value: "18",
      description: "Currently available",
    },
    {
      title: "Applications",
      value: "87",
      description: "Total applications",
    },
    {
      title: "Completed Internships",
      value: "42",
      description: "Successfully completed",
    },
  ];

  const attendanceData = [
    { label: "Present", value: 82 },
    { label: "Late", value: 11 },
    { label: "Absent", value: 7 },
  ];

  const applicationData = [
    { label: "Pending", value: 25 },
    { label: "Approved", value: 48 },
    { label: "Rejected", value: 14 },
  ];

  const handleGenerateReport = (reportName) => {
    alert(`${reportName} report will be generated later.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Reports & Analytics
        </h1>

        <p className="mt-2 text-gray-600">
          View internship management statistics and generate system reports.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statistics.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.title}</p>

            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              {stat.value}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Report Generation */}
      <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-bold text-gray-800">
          Generate Reports
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          Generate reports for different parts of the internship management
          system.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={() =>
              handleGenerateReport("Interns")
            }
            className="rounded-lg border border-gray-300 px-5 py-4 text-left hover:bg-gray-50"
          >
            <p className="font-semibold text-gray-800">
              Intern Report
            </p>

            <p className="mt-1 text-sm text-gray-500">
              View registered intern information.
            </p>
          </button>

          <button
            onClick={() =>
              handleGenerateReport("Applications")
            }
            className="rounded-lg border border-gray-300 px-5 py-4 text-left hover:bg-gray-50"
          >
            <p className="font-semibold text-gray-800">
              Application Report
            </p>

            <p className="mt-1 text-sm text-gray-500">
              View internship application statistics.
            </p>
          </button>

          <button
            onClick={() =>
              handleGenerateReport("Attendance")
            }
            className="rounded-lg border border-gray-300 px-5 py-4 text-left hover:bg-gray-50"
          >
            <p className="font-semibold text-gray-800">
              Attendance Report
            </p>

            <p className="mt-1 text-sm text-gray-500">
              View intern attendance records.
            </p>
          </button>

          <button
            onClick={() =>
              handleGenerateReport("Internship")
            }
            className="rounded-lg border border-gray-300 px-5 py-4 text-left hover:bg-gray-50"
          >
            <p className="font-semibold text-gray-800">
              Internship Report
            </p>

            <p className="mt-1 text-sm text-gray-500">
              View internship placement statistics.
            </p>
          </button>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Attendance */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">
            Attendance Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Overall intern attendance statistics.
          </p>

          <div className="mt-6 space-y-5">
            {attendanceData.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>

                  <span className="text-sm font-semibold text-gray-800">
                    {item.value}%
                  </span>
                </div>

                <div className="h-3 w-full rounded-full bg-gray-200">
                  <div
                    className="h-3 rounded-full bg-blue-600"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">
            Application Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Current application status statistics.
          </p>

          <div className="mt-6 space-y-5">
            {applicationData.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>

                  <span className="text-sm font-semibold text-gray-800">
                    {item.value}
                  </span>
                </div>

                <div className="h-3 w-full rounded-full bg-gray-200">
                  <div
                    className="h-3 rounded-full bg-green-600"
                    style={{
                      width: `${(item.value / 87) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">
          System Summary
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Placement Rate
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-800">
              76%
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Average Attendance
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-800">
              82%
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Completion Rate
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-800">
              68%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;