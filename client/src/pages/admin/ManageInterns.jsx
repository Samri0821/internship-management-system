
import React, { useEffect, useState } from "react";
import api from "../../services/api";

const ManageInterns = () => {
  const [interns, setInterns] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingIntern, setEditingIntern] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    university: "",
    fieldOfStudy: "",
  });

  // ==========================================
  // FETCH INTERNS
  // ==========================================
  const fetchInterns = async () => {
    try {
      setLoading(true);

      const response = await api.get("/users/interns");

      setInterns(response.data.interns || []);
    } catch (error) {
      console.error("Fetch interns error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load interns."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterns();
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
  // OPEN ADD MODAL
  // ==========================================
  const handleAddIntern = () => {
    setEditingIntern(null);

    setFormData({
      name: "",
      email: "",
      password: "",
      university: "",
      fieldOfStudy: "",
    });

    setShowModal(true);
  };

  // ==========================================
  // OPEN EDIT MODAL
  // ==========================================
  const handleEdit = (intern) => {
    setEditingIntern(intern);

    setFormData({
      name: intern.name || "",
      email: intern.email || "",
      password: "",
      university: intern.university || "",
      fieldOfStudy: intern.fieldOfStudy || "",
    });

    setShowModal(true);
  };

  // ==========================================
  // CLOSE MODAL
  // ==========================================
  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingIntern(null);
  };

  // ==========================================
  // CREATE / UPDATE INTERN
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.university.trim() ||
      !formData.fieldOfStudy
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!editingIntern && formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (
      editingIntern &&
      formData.password &&
      formData.password.length < 6
    ) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setSaving(true);

      if (editingIntern) {
        const response = await api.put(
          `/users/interns/${editingIntern._id}`,
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            university: formData.university.trim(),
            fieldOfStudy: formData.fieldOfStudy,
            password: formData.password,
          }
        );

        setInterns((currentInterns) =>
          currentInterns.map((intern) =>
            intern._id === editingIntern._id
              ? response.data.intern
              : intern
          )
        );

        alert("Intern updated successfully.");
      } else {
        const response = await api.post(
          "/users/interns",
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            university: formData.university.trim(),
            fieldOfStudy: formData.fieldOfStudy,
          }
        );

        setInterns((currentInterns) => [
          response.data.intern,
          ...currentInterns,
        ]);

        alert("Intern created successfully.");
      }

      setShowModal(false);
      setEditingIntern(null);

      setFormData({
        name: "",
        email: "",
        password: "",
        university: "",
        fieldOfStudy: "",
      });
    } catch (error) {
      console.error("Save intern error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to save intern."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE INTERN
  // ==========================================
  const handleDelete = async (intern) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${intern.name}?`
    );

    if (!confirmed) return;

    try {
      await api.delete(`/users/interns/${intern._id}`);

      setInterns((currentInterns) =>
        currentInterns.filter(
          (item) => item._id !== intern._id
        )
      );

      alert("Intern deleted successfully.");
    } catch (error) {
      console.error("Delete intern error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete intern."
      );
    }
  };

  // ==========================================
  // VIEW INTERN
  // ==========================================
  const handleView = (intern) => {
    alert(
      `Intern Details\n\n` +
        `Name: ${intern.name}\n` +
        `Email: ${intern.email}\n` +
        `University: ${intern.university}\n` +
        `Field of Study: ${intern.fieldOfStudy}\n` +
        `Role: ${intern.role}`
    );
  };

  // ==========================================
  // SEARCH
  // ==========================================
  const filteredInterns = interns.filter((intern) => {
    const searchText = search.toLowerCase();

    return (
      intern.name?.toLowerCase().includes(searchText) ||
      intern.email?.toLowerCase().includes(searchText) ||
      intern.university?.toLowerCase().includes(searchText) ||
      intern.fieldOfStudy?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Interns
            </h1>

            <p className="text-gray-500 mt-2">
              View and manage registered interns.
            </p>
          </div>

          <button
            onClick={handleAddIntern}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            + Add Intern
          </button>

        </div>

        {/* SEARCH */}
        <div className="bg-white border rounded-2xl shadow-sm p-5 mb-6">

          <input
            type="text"
            placeholder="Search interns by name, email, university..."
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
                    Intern
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    University
                  </th>

                  <th className="text-left p-4 text-sm text-gray-500">
                    Field of Study
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
                      Loading interns...
                    </td>
                  </tr>

                ) : filteredInterns.length === 0 ? (

                  <tr>
                    <td
                      colSpan="5"
                      className="p-8 text-center text-gray-500"
                    >
                      {search
                        ? "No interns found matching your search."
                        : "No interns registered yet."}
                    </td>
                  </tr>

                ) : (

                  filteredInterns.map((intern) => (

                    <tr
                      key={intern._id}
                      className="border-t hover:bg-gray-50"
                    >

                      <td className="p-4">

                        <p className="font-semibold text-gray-800">
                          {intern.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {intern.email}
                        </p>

                      </td>

                      <td className="p-4 text-gray-600">
                        {intern.university}
                      </td>

                      <td className="p-4 text-gray-600">
                        {intern.fieldOfStudy}
                      </td>

                      <td className="p-4">

                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                          Active
                        </span>

                      </td>

                      <td className="p-4">

                        <div className="flex gap-3">

                          <button
                            onClick={() => handleView(intern)}
                            className="text-blue-600 font-medium hover:underline"
                          >
                            View
                          </button>

                          <button
                            onClick={() => handleEdit(intern)}
                            className="text-gray-600 font-medium hover:underline"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(intern)}
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
                    {editingIntern
                      ? "Edit Intern"
                      : "Add New Intern"}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {editingIntern
                      ? "Update intern information."
                      : "Create an intern account."}
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
                      placeholder="example@gmail.com"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* UNIVERSITY */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      University
                    </label>

                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      placeholder="Enter university"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* FIELD */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Field of Study
                    </label>

                    <select
                      name="fieldOfStudy"
                      value={formData.fieldOfStudy}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >

                      <option value="">
                        Select field
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

                  {/* PASSWORD */}
                  <div className="md:col-span-2">

                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      {editingIntern
                        ? "New Password (optional)"
                        : "Password"}
                    </label>

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={
                        editingIntern
                          ? "Leave blank to keep current password"
                          : "Create password"
                      }
                      required={!editingIntern}
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
                      : editingIntern
                      ? "Update Intern"
                      : "Create Intern"}
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

export default ManageInterns;
