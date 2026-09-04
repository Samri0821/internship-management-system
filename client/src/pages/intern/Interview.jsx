const Interview = () => {
  const interviews = [
    {
      id: 1,
      organization: "ABC Technology Solutions",
      position: "Software Development Intern",
      date: "August 28, 2026",
      time: "10:00 AM",
      type: "Video Interview",
      status: "Scheduled",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Interviews
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage your internship interviews.
          </p>
        </div>

        {interviews.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

            <div className="text-5xl mb-4">
              📅
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              No interviews scheduled
            </h2>

            <p className="text-gray-500 mt-2">
              Your scheduled interviews will appear here.
            </p>

          </div>
        ) : (
          <div className="space-y-5">

            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-white rounded-2xl shadow-sm border p-6"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  <div>

                    <h2 className="text-xl font-bold text-gray-800">
                      {interview.position}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {interview.organization}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                      <span>
                        📅 {interview.date}
                      </span>

                      <span>
                        🕐 {interview.time}
                      </span>

                      <span>
                        🎥 {interview.type}
                      </span>
                    </div>

                  </div>

                  <div>
                    <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                      {interview.status}
                    </span>
                  </div>

                </div>

                <div className="mt-6 pt-5 border-t">

                  <button
                    onClick={() =>
                      alert(
                        "Video interview functionality will be connected later."
                      )
                    }
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Join Interview
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Interview;