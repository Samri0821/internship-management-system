import React, { useState } from "react";

const Interviews = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Temporary data.
  // We will connect this to the backend later.
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      intern: "Melkam Tesfaye",
      company: "ABC Technology Solutions",
      interviewer: "John Supervisor",
      date: "2026-09-05",
      time: "10:00 AM",
      type: "Video Interview",
      status: "Scheduled",
    },
    {
      id: 2,
      intern: "Abebe Kebede",
      company: "Tech Solutions PLC",
      interviewer: "Sarah Manager",
      date: "2026-09-06",
      time: "02:00 PM",
      type: "Video Interview",
      status: "Scheduled",
    },
    {
      id: 3,
      intern: "Sara Mohammed",
      company: "Digital Ethiopia",
      interviewer: "Michael Bekele",
      date: "2026-08-28",
      time: "11:00 AM",
      type: "In Person",
      status: "Completed",
    },
    {
      id: 4,
      intern: "Hana Alemu",
      company: "Innovation Hub",
      interviewer: "John Supervisor",
      date: "2026-08-25",
      time: "09:00 AM",
      type: "Video Interview",
      status: "Cancelled",
    },
  ]);

  const filteredInterviews = interviews.filter((interview) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      interview.intern.toLowerCase().includes(searchText) ||
      interview.company.toLowerCase().includes(searchText) ||
      interview.interviewer.toLowerCase().includes(searchText);

    const matchesStatus =
      filterStatus === "All" || interview.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const total = interviews.length;

  const scheduled = interviews.filter(
    (item) => item.status === "Scheduled"
  ).length;

  const completed = interviews.filter(
    (item) => item.status === "Completed"
  ).length;

  const cancelled = interviews.filter(
    (item) => item.status === "Cancelled"
  ).length;

  const getStatusClass = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setInterviews((previous) =>
      previous.map((interview) =>
        interview.id === id
          ? { ...interview, status: newStatus }
          : interview
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Interview Management
        </h1>

        <p className="mt-2 text-gray-600">
          Schedule and manage internship interviews between interns,
          supervisors, and companies.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Interviews</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {total}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Scheduled</p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {scheduled}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Completed</p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {completed}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Cancelled</p>

          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {cancelled}
          </h2>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search intern, company or interviewer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Schedule button */}
          <button
            onClick={() =>
              alert("Interview scheduling form will be connected later.")
            }
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            + Schedule Interview
          </button>
        </div>
      </div>

      {/* Interview Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Intern
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Company
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Interviewer
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Time
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredInterviews.length > 0 ? (
                filteredInterviews.map((interview) => (
                  <tr
                    key={interview.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">
                        {interview.intern}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {interview.company}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {interview.interviewer}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {interview.date}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {interview.time}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {interview.type}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          interview.status
                        )}`}
                      >
                        {interview.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            alert(
                              `Interview details for ${interview.intern}`
                            )
                          }
                          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
                        >
                          View
                        </button>

                        {interview.status === "Scheduled" && (
                          <button
                            onClick={() =>
                              handleStatusChange(
                                interview.id,
                                "Completed"
                              )
                            }
                            className="rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700"
                          >
                            Complete
                          </button>
                        )}

                        {interview.status === "Scheduled" && (
                          <button
                            onClick={() =>
                              handleStatusChange(
                                interview.id,
                                "Cancelled"
                              )
                            }
                            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No interviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Interviews;