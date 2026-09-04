const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New Internship Opportunity",
      message:
        "A new Software Development internship opportunity is available.",
      time: "2 hours ago",
      type: "internship",
    },
    {
      id: 2,
      title: "Interview Scheduled",
      message:
        "Your internship interview has been scheduled.",
      time: "Yesterday",
      type: "interview",
    },
    {
      id: 3,
      title: "Application Update",
      message:
        "Your internship application has been received successfully.",
      time: "2 days ago",
      type: "application",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Notifications
          </h1>

          <p className="text-gray-500 mt-2">
            Stay updated with your internship activities.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-6 border-b last:border-b-0 hover:bg-gray-50 transition"
            >

              <div className="flex gap-4">

                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                  🔔
                </div>

                <div className="flex-1">

                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2">

                    <h2 className="font-semibold text-gray-800">
                      {notification.title}
                    </h2>

                    <span className="text-sm text-gray-400">
                      {notification.time}
                    </span>

                  </div>

                  <p className="text-gray-500 mt-2">
                    {notification.message}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Notifications;