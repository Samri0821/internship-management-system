import React, { useState } from "react";

const Applications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      intern: "Melkam",
      email: "melkam@example.com",
      university: "Addis Ababa University",
      fieldOfStudy: "Software Engineering",
      position: "Software Development Intern",
      appliedDate: "2026-08-28",
      status: "Pending",
    },
    {
      id: 2,
      intern: "Abebe Kebede",
      email: "abebe@example.com",
      university: "Bahir Dar University",
      fieldOfStudy: "Computer Science",
      position: "Frontend Development Intern",
      appliedDate: "2026-08-25",
      status: "Approved",
    },
    {
      id: 3,
      intern: "Sara Alemu",
      email: "sara@example.com",
      university: "Addis Ababa University",
      fieldOfStudy: "Information Technology",
      position: "Software Development Intern",
      appliedDate: "2026-08-23",
      status: "Pending",
    },
    {
      id: 4,
      intern: "Dawit Tesfaye",
      email: "dawit@example.com",
      university: "Bahir Dar University",
      fieldOfStudy: "Computer Science",
      position: "Backend Development Intern",
      appliedDate: "2026-08-20",
      status: "Rejected",
    },
  ]);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const updateStatus = (id, newStatus) => {
    setApplications((current) =>
      current.map((application) =>
        application.id === id
          ? { ...application, status: newStatus }
          : application
      )
    );

    setSelectedApplication((current) =>
      current && current.id === id
        ? { ...current, status: newStatus }
        : current
    );
  };

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.intern.toLowerCase().includes(search.toLowerCase()) ||
      application.position.toLowerCase().includes(search.toLowerCase()) ||
      application.fieldOfStudy
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || application.status === filter;

    return matchesSearch && matchesFilter;
  });

  const total = applications.length;
  const pending = applications.filter(
    (application) => application.status === "Pending"
  ).length;
  const approved = applications.filter(
    (application) => application.status === "Approved"
  ).length;
  const rejected = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  const statusStyle = (status) => {
    if (status === "Approved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Applications
        </h1>

        <p className="mt-2 text-gray-600">
          Review and manage applications submitted by interns.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Applications</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {total}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Pending</p>
          <h2 className="mt-2 text-3xl font-bold text-yellow-600">
            {pending}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Approved</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {approved}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Rejected</p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {rejected}
          </h2>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search by intern, position, or field..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Intern
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Position
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Field
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  University
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Applied Date
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((application) => (
                <tr
                  key={application.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800">
                      {application.intern}
                    </p>

                    <p className="text-xs text-gray-500">
                      {application.email}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {application.position}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {application.fieldOfStudy}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {application.university}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {application.appliedDate}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() =>
                        setSelectedApplication(application)
                      }
                      className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="p-10 text-center">
            <div className="text-4xl">📄</div>

            <h2 className="mt-3 font-semibold text-gray-800">
              No applications found
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b p-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Application Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Review the intern's application.
                </p>
              </div>

              <button
                onClick={() => setSelectedApplication(null)}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Intern Name</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {selectedApplication.intern}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {selectedApplication.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">University</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {selectedApplication.university}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Field of Study</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {selectedApplication.fieldOfStudy}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {selectedApplication.position}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Applied Date</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {selectedApplication.appliedDate}
                  </p>
                </div>
              </div>

              {/* Current Status */}
              <div className="mt-6 rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Current Status</p>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                    selectedApplication.status
                  )}`}
                >
                  {selectedApplication.status}
                </span>
              </div>

              {/* Actions */}
              {selectedApplication.status === "Pending" && (
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() =>
                      updateStatus(
                        selectedApplication.id,
                        "Approved"
                      )
                    }
                    className="flex-1 rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
                  >
                    ✓ Approve Application
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        selectedApplication.id,
                        "Rejected"
                      )
                    }
                    className="flex-1 rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
                  >
                    ✕ Reject Application
                  </button>
                </div>
              )}

              <button
                onClick={() => setSelectedApplication(null)}
                className="mt-4 w-full rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;