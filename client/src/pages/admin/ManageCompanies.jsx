import React from "react";

const ManageCompanies = () => {
  const companies = [
    {
      id: 1,
      name: "ABC Technology Solutions",
      email: "info@abc.com",
      location: "Addis Ababa",
      internships: 5,
      status: "Approved"
    },
    {
      id: 2,
      name: "Tech Solutions PLC",
      email: "info@techsolutions.com",
      location: "Addis Ababa",
      internships: 3,
      status: "Pending"
    },
    {
      id: 3,
      name: "Digital Ethiopia",
      email: "info@digitalethiopia.com",
      location: "Bahir Dar",
      internships: 4,
      status: "Approved"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Companies
          </h1>

          <p className="text-gray-500 mt-2">
            Review and manage companies participating in the internship program.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white border rounded-2xl shadow-sm p-5 mb-6">

          <input
            type="text"
            placeholder="Search companies..."
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Company cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white border rounded-2xl shadow-sm p-6"
            >

              <div className="flex items-start justify-between gap-4">

                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                  🏢
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    company.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {company.status}
                </span>

              </div>

              <h2 className="text-xl font-bold text-gray-800 mt-5">
                {company.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {company.email}
              </p>

              <p className="text-gray-500 mt-1">
                📍 {company.location}
              </p>

              <div className="mt-5 pt-5 border-t">

                <p className="text-sm text-gray-500">
                  Internship Opportunities
                </p>

                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {company.internships}
                </p>

              </div>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    alert("Company details will be connected later.")
                  }
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                  View
                </button>

                {company.status === "Pending" && (
                  <button
                    onClick={() =>
                      alert("Company approval will be connected later.")
                    }
                    className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                  >
                    Approve
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ManageCompanies;