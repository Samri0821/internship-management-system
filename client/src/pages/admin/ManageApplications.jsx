import React, { useState } from "react";

const ManageApplications = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Temporary data
  // We will connect this to the backend later.
  const [applications, setApplications] = useState([
    {
      id: 1,
      internName: "Melkam",
      internEmail: "shomronityirga@gmail.com",
      university: "Addis Ababa University",
      fieldOfStudy: "Software Engineering",
      organization: "ABC Technology Solutions",
      position: "Software Development Intern",
      supervisor: "John Supervisor",
      appliedDate: "2026-08-28",
      status: "Pending"
    },
    {
      id: 2,
      internName: "Test Intern",
      internEmail: "testintern@gmail.com",
      university: "Bahir Dar University",
      fieldOfStudy: "Computer Science",
      organization: "Tech Solutions PLC",
      position: "Frontend Developer Intern",
      supervisor: "Sarah Supervisor",
      appliedDate: "2026-08-27",
      status: "Approved"
    },
    {
      id: 3,
      internName: "Abebe Kebede",
      internEmail: "abebe@gmail.com",
      university: "Bahir Dar University",
      fieldOfStudy: "Information Technology",
      organization: "Digital Ethiopia",
      position: "IT Support Intern",
      supervisor: "Michael Supervisor",
      appliedDate: "2026-08-26",
      status: "Rejected"
    }
  ]);

  // ==========================================
  // UPDATE APPLICATION STATUS
  // ==========================================
  const updateStatus = (id, newStatus) => {
    setApplications(
      applications.map((application) =>
        application.id === id
          ? {
              ...application,
              status: newStatus
            }
          : application
      )
    );

    setSelectedApplication(null);

    alert(`Application ${newStatus.toLowerCase()} successfully.`);
  };

  // ==========================================
  // STATUS STYLE
  // ==========================================
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
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* ==========================================
            HEADER
        ========================================== */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Manage Applications
          </h1>

          <p className="text-gray-500 mt-2">
            Review and manage internship applications.
          </p>

        </div>


        {/* ==========================================
            STATISTICS
        ========================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-white border rounded-2xl p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Applications
            </p>

            <p className="text-3xl font-bold text-gray-800 mt-2">
              {applications.length}
            </p>

          </div>


          <div className="bg-white border rounded-2xl p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Pending
            </p>

            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {
                applications.filter(
                  (application) =>
                    application.status === "Pending"
                ).length
              }
            </p>

          </div>


          <div className="bg-white border rounded-2xl p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Approved
            </p>

            <p className="text-3xl font-bold text-green-600 mt-2">
              {
                applications.filter(
                  (application) =>
                    application.status === "Approved"
                ).length
              }
            </p>

          </div>


          <div className="bg-white border rounded-2xl p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Rejected
            </p>

            <p className="text-3xl font-bold text-red-600 mt-2">
              {
                applications.filter(
                  (application) =>
                    application.status === "Rejected"
                ).length
              }
            </p>

          </div>

        </div>


        {/* ==========================================
            SEARCH / FILTER
        ========================================== */}
        <div className="bg-white border rounded-2xl shadow-sm p-5 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Search by intern, email or organization..."
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              className="w-full border rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                All Statuses
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>

          </div>

        </div>


        {/* ==========================================
            APPLICATION TABLE
        ========================================== */}
        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-xl font-bold text-gray-800">
              Applications
            </h2>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Intern
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    University
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Internship
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Field
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Applied
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Status
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {applications.map((application) => (

                  <tr
                    key={application.id}
                    className="border-t hover:bg-gray-50"
                  >

                    {/* Intern */}
                    <td className="p-4">

                      <p className="font-semibold text-gray-800">
                        {application.internName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {application.internEmail}
                      </p>

                    </td>


                    {/* University */}
                    <td className="p-4 text-gray-600">
                      {application.university}
                    </td>


                    {/* Internship */}
                    <td className="p-4">

                      <p className="font-medium text-gray-800">
                        {application.position}
                      </p>

                      <p className="text-sm text-gray-500">
                        {application.organization}
                      </p>

                    </td>


                    {/* Field */}
                    <td className="p-4">

                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                        {application.fieldOfStudy}
                      </span>

                    </td>


                    {/* Date */}
                    <td className="p-4 text-gray-600">
                      {application.appliedDate}
                    </td>


                    {/* Status */}
                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>

                    </td>


                    {/* Actions */}
                    <td className="p-4">

                      <button
                        onClick={() =>
                          setSelectedApplication(application)
                        }
                        className="text-blue-600 font-medium hover:underline"
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>


      {/* ==========================================
          APPLICATION DETAILS MODAL
      ========================================== */}
      {selectedApplication && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Application Details
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Application #{selectedApplication.id}
                </p>

              </div>

              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                ×
              </button>

            </div>


            {/* Modal Content */}
            <div className="p-6 space-y-6">

              {/* Intern Information */}
              <div>

                <h3 className="font-bold text-gray-800 mb-3">
                  Intern Information
                </h3>

                <div className="bg-gray-50 rounded-xl p-4 space-y-2">

                  <p>
                    <strong>Name:</strong>{" "}
                    {selectedApplication.internName}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {selectedApplication.internEmail}
                  </p>

                  <p>
                    <strong>University:</strong>{" "}
                    {selectedApplication.university}
                  </p>

                  <p>
                    <strong>Field of Study:</strong>{" "}
                    {selectedApplication.fieldOfStudy}
                  </p>

                </div>

              </div>


              {/* Internship Information */}
              <div>

                <h3 className="font-bold text-gray-800 mb-3">
                  Internship Information
                </h3>

                <div className="bg-gray-50 rounded-xl p-4 space-y-2">

                  <p>
                    <strong>Organization:</strong>{" "}
                    {selectedApplication.organization}
                  </p>

                  <p>
                    <strong>Position:</strong>{" "}
                    {selectedApplication.position}
                  </p>

                  <p>
                    <strong>Supervisor:</strong>{" "}
                    {selectedApplication.supervisor}
                  </p>

                  <p>
                    <strong>Applied Date:</strong>{" "}
                    {selectedApplication.appliedDate}
                  </p>

                </div>

              </div>


              {/* Current Status */}
              <div>

                <h3 className="font-bold text-gray-800 mb-3">
                  Application Status
                </h3>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(
                    selectedApplication.status
                  )}`}
                >
                  {selectedApplication.status}
                </span>

              </div>


              {/* Actions */}
              {selectedApplication.status === "Pending" && (

                <div className="flex gap-3 pt-4 border-t">

                  <button
                    onClick={() =>
                      updateStatus(
                        selectedApplication.id,
                        "Approved"
                      )
                    }
                    className="flex-1 px-5 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
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
                    className="flex-1 px-5 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                  >
                    ✕ Reject Application
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default ManageApplications;