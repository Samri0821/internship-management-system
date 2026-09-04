import React from "react";
import { Link } from "react-router-dom";

const AssignedInterns = () => {
  const interns = [
    {
      id: "1",
      name: "Melkam",
      email: "shomronityirga@gmail.com",
      university: "Addis Ababa University",
      field: "Software Engineering",
      status: "Active"
    },
    {
      id: "2",
      name: "Test Intern",
      email: "testintern@gmail.com",
      university: "Bahir Dar University",
      field: "Computer Science",
      status: "Active"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Assigned Interns
          </h1>

          <p className="text-gray-500 mt-2">
            View and monitor interns assigned to you.
          </p>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

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
                    Field
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
                {interns.map((intern) => (
                  <tr
                    key={intern.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {intern.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {intern.email}
                        </p>
                      </div>
                    </td>

                    <td className="p-4 text-gray-600">
                      {intern.university}
                    </td>

                    <td className="p-4 text-gray-600">
                      {intern.field}
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        {intern.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <Link
                        to={`/supervisor/interns/${intern.id}`}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        View Details
                      </Link>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AssignedInterns;