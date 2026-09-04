import React, { useState } from "react";

const ManageInternships = () => {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    organization: "",
    fieldOfStudy: "",
    department: "",
    position: "",
    supervisor: "",
    startDate: "",
    endDate: "",
    description: "",
    latitude: "",
    longitude: "",
    allowedRadius: "200"
  });

  // Temporary data for UI
  // We will connect this to MongoDB later.
  const [internships, setInternships] = useState([
    {
      id: 1,
      organization: "ABC Technology Solutions",
      fieldOfStudy: "Software Engineering",
      department: "Information Technology",
      position: "Software Development Intern",
      supervisor: "John Supervisor",
      startDate: "2026-09-01",
      endDate: "2026-12-01",
      status: "Upcoming",
      applicants: 12
    },
    {
      id: 2,
      organization: "Tech Solutions PLC",
      fieldOfStudy: "Computer Science",
      department: "Software Development",
      position: "Frontend Developer Intern",
      supervisor: "Sarah Supervisor",
      startDate: "2026-10-01",
      endDate: "2027-01-01",
      status: "Upcoming",
      applicants: 8
    }
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newInternship = {
      id: Date.now(),
      organization: formData.organization,
      fieldOfStudy: formData.fieldOfStudy,
      department: formData.department,
      position: formData.position,
      supervisor: formData.supervisor,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: "Upcoming",
      applicants: 0
    };

    setInternships([newInternship, ...internships]);

    alert("Internship added successfully!");

    setFormData({
      organization: "",
      fieldOfStudy: "",
      department: "",
      position: "",
      supervisor: "",
      startDate: "",
      endDate: "",
      description: "",
      latitude: "",
      longitude: "",
      allowedRadius: "200"
    });

    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* ==========================================
            HEADER
        ========================================== */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Internships
            </h1>

            <p className="text-gray-500 mt-2">
              Create and manage internship opportunities.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            {showForm ? "Close Form" : "+ Create Internship"}
          </button>

        </div>


        {/* ==========================================
            CREATE INTERNSHIP FORM
        ========================================== */}
        {showForm && (
          <div className="bg-white border rounded-2xl shadow-sm p-6 mb-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Create Internship Opportunity
            </h2>

            <form onSubmit={handleSubmit}>

              {/* BASIC INFORMATION */}
              <div className="mb-8">

                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Organization */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization *
                    </label>

                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="ABC Technology Solutions"
                      required
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position *
                    </label>

                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="Software Development Intern"
                      required
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Field of Study */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Field of Study *
                    </label>

                    <select
                      name="fieldOfStudy"
                      value={formData.fieldOfStudy}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">
                        Select field of study
                      </option>

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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department *
                    </label>

                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Information Technology"
                      required
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Supervisor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supervisor *
                    </label>

                    <input
                      type="text"
                      name="supervisor"
                      value={formData.supervisor}
                      onChange={handleChange}
                      placeholder="Supervisor ID"
                      required
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <p className="text-xs text-gray-400 mt-1">
                      Later we will replace this with a supervisor dropdown from MongoDB.
                    </p>
                  </div>

                </div>

              </div>


              {/* DATES */}
              <div className="mb-8">

                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Internship Period
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>

                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>

                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                </div>

              </div>


              {/* GPS */}
              <div className="mb-8">

                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  📍 Internship GPS Location
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  These coordinates will be used for GPS-based attendance.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Latitude *
                    </label>

                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      placeholder="9.0320"
                      required
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Longitude *
                    </label>

                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      placeholder="38.7469"
                      required
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Allowed Radius (meters)
                    </label>

                    <input
                      type="number"
                      name="allowedRadius"
                      value={formData.allowedRadius}
                      onChange={handleChange}
                      min="1"
                      placeholder="200"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                </div>

              </div>


              {/* DESCRIPTION */}
              <div className="mb-8">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe the internship opportunity..."
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* BUTTONS */}
              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-3 border rounded-lg font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                  Create Internship
                </button>

              </div>

            </form>

          </div>
        )}


        {/* ==========================================
            INTERNSHIP LIST
        ========================================== */}
        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-xl font-bold text-gray-800">
              Internship Opportunities
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {internships.length} opportunities available
            </p>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Organization
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Position
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Field
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Supervisor
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Period
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Applicants
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Status
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {internships.map((internship) => (

                  <tr
                    key={internship.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4">

                      <p className="font-semibold text-gray-800">
                        {internship.organization}
                      </p>

                      <p className="text-xs text-gray-400">
                        ID: {internship.id}
                      </p>

                    </td>


                    <td className="p-4 text-gray-600">
                      {internship.position}
                    </td>


                    <td className="p-4">

                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                        {internship.fieldOfStudy}
                      </span>

                    </td>


                    <td className="p-4 text-gray-600">
                      {internship.supervisor}
                    </td>


                    <td className="p-4 text-sm text-gray-600">

                      <div>
                        {internship.startDate}
                      </div>

                      <div className="text-gray-400">
                        to
                      </div>

                      <div>
                        {internship.endDate}
                      </div>

                    </td>


                    <td className="p-4">

                      <span className="font-semibold text-gray-800">
                        {internship.applicants}
                      </span>

                    </td>


                    <td className="p-4">

                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                        {internship.status}
                      </span>

                    </td>


                    <td className="p-4">

                      <div className="flex gap-3">

                        <button
                          onClick={() =>
                            alert("View internship functionality will be connected later.")
                          }
                          className="text-blue-600 font-medium"
                        >
                          View
                        </button>

                        <button
                          onClick={() =>
                            alert("Edit functionality will be connected later.")
                          }
                          className="text-gray-600 font-medium"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            alert("Delete functionality will be connected later.")
                          }
                          className="text-red-600 font-medium"
                        >
                          Delete
                        </button>

                      </div>

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

export default ManageInternships;