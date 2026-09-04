import React, { useState } from "react";

const Internships = () => {
  const [showForm, setShowForm] = useState(false);

  const [internships, setInternships] = useState([
    {
      id: 1,
      position: "Software Development Intern",
      fieldOfStudy: "Computer Science",
      department: "Information Technology",
      location: "Addis Ababa",
      startDate: "2026-09-01",
      endDate: "2026-12-01",
      applicants: 8,
      status: "Active",
    },
    {
      id: 2,
      position: "Frontend Development Intern",
      fieldOfStudy: "Software Engineering",
      department: "Software Development",
      location: "Addis Ababa",
      startDate: "2026-10-01",
      endDate: "2027-01-01",
      applicants: 5,
      status: "Active",
    },
  ]);

  const [formData, setFormData] = useState({
    position: "",
    fieldOfStudy: "",
    department: "",
    startDate: "",
    endDate: "",
    latitude: "",
    longitude: "",
    allowedRadius: 200,
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newInternship = {
      id: Date.now(),
      position: formData.position,
      fieldOfStudy: formData.fieldOfStudy,
      department: formData.department,
      location: "Addis Ababa",
      startDate: formData.startDate,
      endDate: formData.endDate,
      applicants: 0,
      status: "Upcoming",
    };

    setInternships([...internships, newInternship]);

    setFormData({
      position: "",
      fieldOfStudy: "",
      department: "",
      startDate: "",
      endDate: "",
      latitude: "",
      longitude: "",
      allowedRadius: 200,
      description: "",
    });

    setShowForm(false);
    alert("Internship created successfully!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      setInternships(internships.filter((internship) => internship.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            My Internships
          </h1>

          <p className="mt-2 text-gray-600">
            Create and manage your internship opportunities.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          {showForm ? "Close Form" : "+ Post Internship"}
        </button>
      </div>

      {/* Create Internship Form */}
      {showForm && (
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            Post New Internship
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Position */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Position
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

              {/* Field of Study */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Field of Study
                </label>

                <select
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select field</option>
                  <option value="Computer Science">
                    Computer Science
                  </option>
                  <option value="Software Engineering">
                    Software Engineering
                  </option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Information Systems">
                    Information Systems
                  </option>
                  <option value="Cybersecurity">
                    Cybersecurity
                  </option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. IT Department"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  End Date
                </label>

                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Latitude */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Latitude
                </label>

                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="e.g. 9.0320"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Longitude */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Longitude
                </label>

                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="e.g. 38.7469"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Allowed Radius */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Attendance Radius (meters)
                </label>

                <input
                  type="number"
                  name="allowedRadius"
                  value={formData.allowedRadius}
                  onChange={handleChange}
                  min="50"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the internship opportunity..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                Create Internship
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

      {/* Internship Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {internships.map((internship) => (
          <div
            key={internship.id}
            className="rounded-xl bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {internship.position}
                </h2>

                <p className="mt-1 text-gray-500">
                  {internship.department}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  internship.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {internship.status}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Field of Study</p>
                <p className="mt-1 font-medium text-gray-800">
                  {internship.fieldOfStudy}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="mt-1 font-medium text-gray-800">
                  {internship.location}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Start Date</p>
                <p className="mt-1 font-medium text-gray-800">
                  {internship.startDate}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">End Date</p>
                <p className="mt-1 font-medium text-gray-800">
                  {internship.endDate}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Applications</p>
                <p className="mt-1 font-medium text-gray-800">
                  {internship.applicants}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3 border-t pt-5">
              <button
                onClick={() =>
                  alert(`Viewing ${internship.position}`)
                }
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                View
              </button>

              <button
                onClick={() =>
                  alert("Edit functionality will be connected to the backend.")
                }
                className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(internship.id)}
                className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {internships.length === 0 && (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <div className="text-4xl">💼</div>

          <h2 className="mt-3 text-xl font-bold text-gray-800">
            No internships yet
          </h2>

          <p className="mt-2 text-gray-500">
            Create your first internship opportunity.
          </p>
        </div>
      )}
    </div>
  );
};

export default Internships;