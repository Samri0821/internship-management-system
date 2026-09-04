import React, { useState } from "react";

const Interviews = () => {
  const [showForm, setShowForm] = useState(false);

  const [interviews, setInterviews] = useState([
    {
      id: 1,
      intern: "Melkam",
      email: "melkam@example.com",
      position: "Software Development Intern",
      date: "2026-09-05",
      time: "10:00 AM",
      type: "Video",
      interviewer: "HR Manager",
      meetingLink: "https://meet.google.com/example",
      status: "Scheduled",
    },
    {
      id: 2,
      intern: "Abebe Kebede",
      email: "abebe@example.com",
      position: "Frontend Development Intern",
      date: "2026-09-03",
      time: "2:00 PM",
      type: "Video",
      interviewer: "Technical Lead",
      meetingLink: "https://meet.google.com/example2",
      status: "Completed",
    },
    {
      id: 3,
      intern: "Sara Alemu",
      email: "sara@example.com",
      position: "Software Development Intern",
      date: "2026-09-08",
      time: "11:00 AM",
      type: "Video",
      interviewer: "HR Manager",
      meetingLink: "https://meet.google.com/example3",
      status: "Scheduled",
    },
  ]);

  const [formData, setFormData] = useState({
    intern: "",
    position: "",
    date: "",
    time: "",
    type: "Video",
    interviewer: "",
    meetingLink: "",
  });

  const [selectedInterview, setSelectedInterview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newInterview = {
      id: Date.now(),
      ...formData,
      email: "intern@example.com",
      status: "Scheduled",
    };

    setInterviews([...interviews, newInterview]);

    setFormData({
      intern: "",
      position: "",
      date: "",
      time: "",
      type: "Video",
      interviewer: "",
      meetingLink: "",
    });

    setShowForm(false);

    alert("Interview scheduled successfully!");
  };

  const updateStatus = (id, status) => {
    setInterviews((current) =>
      current.map((interview) =>
        interview.id === id
          ? { ...interview, status }
          : interview
      )
    );

    setSelectedInterview((current) =>
      current && current.id === id
        ? { ...current, status }
        : current
    );
  };

  const getStatusStyle = (status) => {
    if (status === "Completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Cancelled") {
      return "bg-red-100 text-red-700";
    }

    return "bg-blue-100 text-blue-700";
  };

  const total = interviews.length;

  const scheduled = interviews.filter(
    (interview) => interview.status === "Scheduled"
  ).length;

  const completed = interviews.filter(
    (interview) => interview.status === "Completed"
  ).length;

  const cancelled = interviews.filter(
    (interview) => interview.status === "Cancelled"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Interviews
          </h1>

          <p className="mt-2 text-gray-600">
            Schedule and manage intern interviews.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          {showForm ? "Close Form" : "+ Schedule Interview"}
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Interviews</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {total}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Scheduled</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {scheduled}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Completed</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {completed}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Cancelled</p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {cancelled}
          </h2>
        </div>
      </div>

      {/* Schedule Interview Form */}
      {showForm && (
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            Schedule New Interview
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Intern */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Intern Name
                </label>

                <input
                  type="text"
                  name="intern"
                  value={formData.intern}
                  onChange={handleChange}
                  placeholder="Enter intern name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Position */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Internship Position
                </label>

                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g. Software Development Intern"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Interview Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Time */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Interview Time
                </label>

                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Interview Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Interview Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="Video">Video Interview</option>
                  <option value="In Person">In Person</option>
                  <option value="Phone">Phone Interview</option>
                </select>
              </div>

              {/* Interviewer */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Interviewer
                </label>

                <input
                  type="text"
                  name="interviewer"
                  value={formData.interviewer}
                  onChange={handleChange}
                  placeholder="e.g. HR Manager"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Meeting Link */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Meeting Link
                </label>

                <input
                  type="url"
                  name="meetingLink"
                  value={formData.meetingLink}
                  onChange={handleChange}
                  placeholder="https://meet.google.com/..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                Schedule Interview
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Interviews Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Intern
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Position
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Time
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Type
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Interviewer
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
              {interviews.map((interview) => (
                <tr
                  key={interview.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800">
                      {interview.intern}
                    </p>

                    <p className="text-xs text-gray-500">
                      {interview.email}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {interview.position}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {interview.date}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {interview.time}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {interview.type}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {interview.interviewer}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        interview.status
                      )}`}
                    >
                      {interview.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() =>
                        setSelectedInterview(interview)
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

        {interviews.length === 0 && (
          <div className="p-10 text-center">
            <div className="text-4xl">🎥</div>

            <h2 className="mt-3 font-semibold text-gray-800">
              No interviews scheduled
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Schedule an interview when you are ready.
            </p>
          </div>
        )}
      </div>

      {/* Interview Details Modal */}
      {selectedInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Interview Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage this interview.
                </p>
              </div>

              <button
                onClick={() => setSelectedInterview(null)}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <p className="text-sm text-gray-500">Intern</p>
                <p className="font-semibold text-gray-800">
                  {selectedInterview.intern}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Position</p>
                <p className="font-semibold text-gray-800">
                  {selectedInterview.position}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold text-gray-800">
                    {selectedInterview.date}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-semibold text-gray-800">
                    {selectedInterview.time}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Interviewer</p>
                <p className="font-semibold text-gray-800">
                  {selectedInterview.interviewer}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Status</p>

                <span
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    selectedInterview.status
                  )}`}
                >
                  {selectedInterview.status}
                </span>
              </div>

              {selectedInterview.meetingLink && (
                <div>
                  <p className="text-sm text-gray-500">
                    Meeting Link
                  </p>

                  <a
                    href={selectedInterview.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block break-all text-blue-600 hover:underline"
                  >
                    {selectedInterview.meetingLink}
                  </a>
                </div>
              )}

              {/* Actions */}
              {selectedInterview.status === "Scheduled" && (
                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() =>
                      updateStatus(
                        selectedInterview.id,
                        "Completed"
                      )
                    }
                    className="flex-1 rounded-lg bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700"
                  >
                    Mark Completed
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        selectedInterview.id,
                        "Cancelled"
                      )
                    }
                    className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-medium text-white hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <button
                onClick={() => setSelectedInterview(null)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
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

export default Interviews;