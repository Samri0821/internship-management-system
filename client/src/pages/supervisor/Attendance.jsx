import React from "react";

const Attendance = () => {
  const attendance = [
    {
      name: "Melkam",
      date: "August 31, 2026",
      checkIn: "08:45 AM",
      checkOut: "05:00 PM",
      status: "Present"
    },
    {
      name: "Test Intern",
      date: "August 31, 2026",
      checkIn: "09:10 AM",
      checkOut: "-",
      status: "Present"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Attendance Monitoring
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor attendance and GPS check-in records.
          </p>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">Intern</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Check In</th>
                  <th className="text-left p-4">Check Out</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {attendance.map((item, index) => (
                  <tr key={index} className="border-t">

                    <td className="p-4 font-semibold">
                      {item.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {item.date}
                    </td>

                    <td className="p-4 text-gray-600">
                      {item.checkIn}
                    </td>

                    <td className="p-4 text-gray-600">
                      {item.checkOut}
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        {item.status}
                      </span>
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

export default Attendance;