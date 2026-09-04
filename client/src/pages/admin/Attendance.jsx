import React, { useState } from "react";

const Attendance = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Temporary data for now.
  // We will connect this to MongoDB/backend later.
  const [attendanceRecords] = useState([
    {
      id: 1,
      intern: "Melkam Tesfaye",
      email: "melkam@gmail.com",
      organization: "ABC Technology Solutions",
      date: "2026-09-01",
      checkIn: "08:32 AM",
      checkOut: "05:04 PM",
      hours: "8h 32m",
      status: "Present",
      location: "Inside Office",
    },
    {
      id: 2,
      intern: "Abebe Kebede",
      email: "abebe@gmail.com",
      organization: "Tech Solutions PLC",
      date: "2026-09-01",
      checkIn: "09:15 AM",
      checkOut: "05:00 PM",
      hours: "7h 45m",
      status: "Late",
      location: "Inside Office",
    },
    {
      id: 3,
      intern: "Sara Mohammed",
      email: "sara@gmail.com",
      organization: "Digital Ethiopia",
      date: "2026-09-01",
      checkIn: "-",
      checkOut: "-",
      hours: "0h",
      status: "Absent",
      location: "Not Available",
    },
    {
      id: 4,
      intern: "Hana Alemu",
      email: "hana@gmail.com",
      organization: "Innovation Hub",
      date: "2026-09-01",
      checkIn: "08:20 AM",
      checkOut: "04:55 PM",
      hours: "8h 35m",
      status: "Present",
      location: "Inside Office",
    },
  ]);

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.intern.toLowerCase().includes(search.toLowerCase()) ||
      record.email.toLowerCase().includes(search.toLowerCase()) ||
      record.organization.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || record.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const total = attendanceRecords.length;
  const present = attendanceRecords.filter(
    (item) => item.status === "Present"
  ).length;
  const late = attendanceRecords.filter(
    (item) => item.status === "Late"
  ).length;
  const absent = attendanceRecords.filter(
    (item) => item.status === "Absent"
  ).length;

  const getStatusClass = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-700";

      case "Late":
        return "bg-yellow-100 text-yellow-700";

      case "Absent":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getLocationClass = (location) => {
    if (location === "Inside Office") {
      return "text-green-600";
    }

    return "text-gray-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Attendance Management
        </h1>

        <p className="mt-2 text-gray-600">
          Monitor intern attendance, check-in, check-out and location records.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-xl bg-white p-6 shadow-sm border">
          <p className="text-sm text-gray-500">Total Interns</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {total}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border">
          <p className="text-sm text-gray-500">Present</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {present}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border">
          <p className="text-sm text-gray-500">Late</p>
          <h2 className="mt-2 text-3xl font-bold text-yellow-600">
            {late}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border">
          <p className="text-sm text-gray-500">Absent</p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {absent}
          </h2>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl bg-white p-5 shadow-sm border mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search intern, email or organization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm border">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Intern
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Organization
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Check In
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Check Out
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Hours
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Location
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {record.intern}
                        </p>
                        <p className="text-sm text-gray-500">
                          {record.email}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {record.organization}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {record.date}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {record.checkIn}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {record.checkOut}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      {record.hours}
                    </td>

                    <td
                      className={`px-6 py-4 text-sm font-medium ${getLocationClass(
                        record.location
                      )}`}
                    >
                      {record.location}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          alert(
                            `Attendance details for ${record.intern}`
                          )
                        }
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No attendance records found.
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

export default Attendance;