import React, { useEffect, useState } from "react";
import api from "../../services/api";

const ManageSupervisors = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingSupervisor, setEditingSupervisor] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
    department: "",
  });

  // ==========================================
  // FETCH SUPERVISORS
  // ==========================================
  const fetchSupervisors = async () => {
    try {
      setLoading(true);

      const response = await api.get("/users/supervisors");

      setSupervisors(response.data.supervisors || []);
    } catch (error) {
      console.error("Fetch supervisors error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load supervisors."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupervisors();
  }, []);

  // ==========================================
  // FORM CHANGE
  // ==========================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // ADD SUPERVISOR
  // ==========================================
  const handleAddSupervisor = () => {
    setEditingSupervisor(null);

    setFormData({
      name: "",
      email: "",
      password: "",
      organization: "",
      department: "",
    });

    setShowModal(true);
  };

  // ==========================================
  // EDIT SUPERVISOR
  // ==========================================
  const handleEdit = (supervisor) => {
    setEditingSupervisor(supervisor);

    setFormData({
      name: supervisor.name || "",
      email: supervisor.email || "",
      password: "",
      organization: supervisor.organization || "",
      department: supervisor.department || "",
    });

    setShowModal(true);
  };

  // ==========================================
  // CLOSE MODAL
  // ==========================================
  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingSupervisor(null);
  };

  // ==========================================
  // CREATE / UPDATE
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.organization.trim() ||
      !formData.department.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!editingSupervisor && formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (
      editingSupervisor &&
      formData.password &&
      formData.password.length < 6
    ) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setSaving(true);

      if (editingSupervisor) {
        const response = await api.put(
          `/users/supervisors/${editingSupervisor._id}`,
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            organization: formData.organization.trim(),
            department: formData.department.trim(),
            password: formData.password,
          }
        );

        setSupervisors((current) =>
          current.map((supervisor) =>
            supervisor._id === editingSupervisor._id
              ? response.data.supervisor
              : supervisor
          )
        );

        alert("Supervisor updated successfully.");
      } else {
        const response = await api.post(
          "/users/supervisors",
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            organization: formData.organization.trim(),
            department: formData.department.trim(),
          }
        );

        setSupervisors((current) => [
          response.data.supervisor,
          ...current,
        ]);

        alert("Supervisor created successfully.");
      }

      setShowModal(false);
      setEditingSupervisor(null);

      setFormData({
        name: "",
        email: "",
        password: "",
        organization: "",
        department: "",
      });
    } catch (error) {
      console.error("Save supervisor error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to save supervisor."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE
  // ==========================================
  const handleDelete = async (supervisor) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${supervisor.name}?`
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/users/supervisors/${supervisor._id}`
      );

      setSupervisors((current) =>
        current.filter(
          (item) => item._id !== supervisor._id
        )
      );

      alert("Supervisor deleted successfully.");
    } catch (error) {
      console.error("Delete supervisor error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete supervisor."
      );
    }
  };

  // ==========================================
  // VIEW
  // ==========================================
  const handleView = (supervisor) => {
    alert(
      `Supervisor Details\n\n` +
        `Name: ${supervisor.name}\n` +
        `Email: ${supervisor.email}\n` +
        `Organization: ${
          supervisor.organization || "Not provided"
        }\n` +
        `Department: ${
          supervisor.department || "Not provided"
        }\n` +
        `Role: ${supervisor.role}`
    );
  };

  // ==========================================
  // SEARCH
  // ==========================================
  const filteredSupervisors = supervisors.filter(
    (supervisor) => {
      const searchText = search.toLowerCase();

      return (
        supervisor.name
          ?.toLowerCase()
          .includes(searchText) ||
        supervisor.email
          ?.toLowerCase()
          .includes(searchText) ||
        supervisor.organization
          ?.toLowerCase()
          .includes(searchText) ||
        supervisor.department
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Supervisors
            </h1>

            <p className="text-gray-500 mt-2">
              Create and manage internship supervisors.
            </p>
          </div>

          <button
            onClick={handleAddSupervisor}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            + Add Supervisor
          </button>

        </div>

        {/* SEARCH */}
        <div className="bg-white border rounded-2xl shadow-sm p-5 mb-6">

          <input
            type="text"
            placeholder="Search supervisors by name, email, organization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* TABLE */}
        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Supervisor
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Organization
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Department
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

                {loading ? (

                  <tr>
                    <td
                      colSpan="5"
                      className="p-8 text-center text-gray-500"
                    >
                      Loading supervisors...
                    </td>
                  </tr>

                ) : filteredSupervisors.length === 0 ? (

                  <tr>
                    <td
                      colSpan="5"
                      className="p-8 text-center text-gray-500"
                    >
                      {search
                        ? "No supervisors found matching your search."
                        : "No supervisors registered yet."}
                    </td>
                  </tr>

                ) : (

                  filteredSupervisors.map((supervisor) => (

                    <tr
                      key={supervisor._id}
                      className="border-t hover:bg-gray-50"
                    >

                      <td className="p-4">

                        <p className="font-semibold text-gray-800">
                          {supervisor.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {supervisor.email}
                        </p>

                      </td>

                      <td className="p-4 text-gray-600">
                        {supervisor.organization || "—"}
                      </td>

                      <td className="p-4 text-gray-600">
                        {supervisor.department || "—"}
                      </td>

                      <td className="p-4">

                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                          Active
                        </span>

                      </td>

                      <td className="p-4">

                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              handleView(supervisor)
                            }
                            className="text-blue-600 font-medium hover:underline"
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              handleEdit(supervisor)
                            }
                            className="text-gray-600 font-medium hover:underline"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(supervisor)
                            }
                            className="text-red-600 font-medium hover:underline"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* ADD / EDIT MODAL */}
        {showModal && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingSupervisor
                      ? "Edit Supervisor"
                      : "Add New Supervisor"}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {editingSupervisor
                      ? "Update supervisor information."
                      : "Create a supervisor account."}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* NAME */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="supervisor@example.com"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* ORGANIZATION */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Organization
                    </label>

                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Enter organization"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* DEPARTMENT */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Department
                    </label>

                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Enter department"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="md:col-span-2">

                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      {editingSupervisor
                        ? "New Password (optional)"
                        : "Password"}
                    </label>

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={
                        editingSupervisor
                          ? "Leave blank to keep current password"
                          : "Create password"
                      }
                      required={!editingSupervisor}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <p className="text-xs text-gray-500 mt-1">
                      Password must contain at least 6 characters.
                    </p>

                  </div>

                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-3 mt-7">

                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="px-5 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60"
                  >
                    {saving
                      ? "Saving..."
                      : editingSupervisor
                      ? "Update Supervisor"
                      : "Create Supervisor"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </div>
    </div>
  );
};

export default ManageSupervisors;