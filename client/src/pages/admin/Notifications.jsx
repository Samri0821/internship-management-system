import React, { useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Internship Application",
      message:
        "Melkam Tesfaye submitted an application for Software Development Intern.",
      type: "Application",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Interview Scheduled",
      message:
        "An interview has been scheduled between Abebe Kebede and Tech Solutions PLC.",
      type: "Interview",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Attendance Alert",
      message:
        "Sara Mohammed has been marked absent today.",
      type: "Attendance",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      title: "New Supervisor Registered",
      message:
        "John Supervisor has successfully registered in the system.",
      type: "System",
      time: "Yesterday",
      read: true,
    },
    {
      id: 5,
      title: "Internship Created",
      message:
        "ABC Technology Solutions created a new internship opportunity.",
      type: "Internship",
      time: "Yesterday",
      read: false,
    },
  ]);

  const [filter, setFilter] = useState("All");

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "Unread") {
      return !notification.read;
    }

    if (filter === "Read") {
      return notification.read;
    }

    return true;
  });

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((previous) =>
      previous.filter((notification) => notification.id !== id)
    );
  };

  const getTypeClass = (type) => {
    switch (type) {
      case "Application":
        return "bg-blue-100 text-blue-700";

      case "Interview":
        return "bg-purple-100 text-purple-700";

      case "Attendance":
        return "bg-red-100 text-red-700";

      case "Internship":
        return "bg-green-100 text-green-700";

      case "System":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Notifications
          </h1>

          <p className="mt-2 text-gray-600">
            View important system updates and notifications.
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          Mark All as Read
        </button>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Notifications
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {notifications.length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Unread Notifications
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {unreadCount}
          </h2>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter("All")}
            className={`rounded-lg px-5 py-2 font-medium ${
              filter === "All"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("Unread")}
            className={`rounded-lg px-5 py-2 font-medium ${
              filter === "Unread"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Unread
          </button>

          <button
            onClick={() => setFilter("Read")}
            className={`rounded-lg px-5 py-2 font-medium ${
              filter === "Read"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Read
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md ${
                !notification.read
                  ? "border-l-4 border-l-blue-600"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                {/* Notification Content */}
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-bold text-gray-800">
                      {notification.title}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getTypeClass(
                        notification.type
                      )}`}
                    >
                      {notification.type}
                    </span>

                    {!notification.read && (
                      <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                        New
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600">
                    {notification.message}
                  </p>

                  <p className="mt-3 text-sm text-gray-400">
                    {notification.time}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {!notification.read && (
                    <button
                      onClick={() =>
                        markAsRead(notification.id)
                      }
                      className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                      Mark Read
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deleteNotification(notification.id)
                    }
                    className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700">
              No notifications
            </h2>

            <p className="mt-2 text-gray-500">
              There are no notifications in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;