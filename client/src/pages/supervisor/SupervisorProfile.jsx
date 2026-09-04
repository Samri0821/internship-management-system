import React, { useState } from "react";

const SupervisorProfile = () => {
  const [form, setForm] = useState({
    name: "John Supervisor",
    email: "supervisor@gmail.com",
    phone: "",
    organization: "ABC Technology Solutions",
    department: "Information Technology"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Profile update will be connected to the backend.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Supervisor Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your personal and professional information.
          </p>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-8">

          {/* Profile header */}
          <div className="flex items-center gap-5 pb-7 border-b">

            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl">
              👨‍💼
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {form.name}
              </h2>

              <p className="text-gray-500">
                Supervisor
              </p>
            </div>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <Input
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />

              <Input
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />

              <Input
                label="Organization"
                name="organization"
                value={form.organization}
                onChange={handleChange}
              />

              <Input
                label="Department"
                name="department"
                value={form.department}
                onChange={handleChange}
              />

            </div>

            <div className="mt-8 pt-6 border-t flex justify-end">

              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Save Changes
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange
}) => (
  <div>
    <label className="block font-medium text-gray-700 mb-2">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default SupervisorProfile;