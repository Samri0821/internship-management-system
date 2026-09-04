import React from "react";

const Interviews = () => {
  const interviews = [
    {
      id: 1,
      intern: "Melkam",
      position: "Software Development Intern",
      date: "September 1, 2026",
      time: "10:00 AM",
      type: "Video Interview",
      status: "Scheduled"
    },
    {
      id: 2,
      intern: "Test Intern",
      position: "Software Development Intern",
      date: "September 3, 2026",
      time: "2:00 PM",
      type: "Video Interview",
      status: "Scheduled"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Interviews
          </h1>

          <p className="text-gray-500 mt-2">
            Manage internship interviews with your interns.
          </p>
        </div>

        <div className="mb-6">
          <button
            onClick={() =>
              alert("Interview scheduling will be connected to the backend.")
            }
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            + Schedule Interview
          </button>
        </div>

        <div className="space-y-5">

          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="bg-white rounded-2xl border shadow-sm p-6"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {interview.intern}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {interview.position}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                    <span>📅 {interview.date}</span>
                    <span>🕐 {interview.time}</span>
                    <span>🎥 {interview.type}</span>
                  </div>
                </div>

                <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                  {interview.status}
                </span>

              </div>

              <div className="mt-6 pt-5 border-t flex flex-wrap gap-3">

                <button
                  onClick={() =>
                    alert("Interview link functionality will be connected later.")
                  }
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                  Start Interview
                </button>

                <button
                  onClick={() =>
                    alert("Reschedule functionality will be connected later.")
                  }
                  className="px-5 py-2.5 border rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Reschedule
                </button>

                <button
                  onClick={() =>
                    alert("Interview cancellation functionality will be connected later.")
                  }
                  className="px-5 py-2.5 border border-red-200 text-red-600 rounded-lg font-semibold hover:bg-red-50"
                >
                  Cancel
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Interviews;