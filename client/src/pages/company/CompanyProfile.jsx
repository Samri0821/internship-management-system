
import React, { useState } from "react";

const CompanyProfile = () => {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    companyName: "ABC Technology Solutions",
    email: "hr@abctech.com",
    phone: "+251 911 123 456",
    location: "Addis Ababa, Ethiopia",
    website: "https://www.abctech.com",
    industry: "Information Technology",
    description:
      "ABC Technology Solutions is a technology company providing software development and digital solutions.",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    alert("Company profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Company Profile
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your company information.
          </p>
        </div>

        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Company Header */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-4xl font-bold text-blue-700">
              {profile.companyName.charAt(0)}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {profile.companyName}
              </h2>

              <p className="mt-1 text-gray-500">
                {profile.industry}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                📍 {profile.location}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            Company Information
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Company Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  value={profile.companyName}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none disabled:bg-gray-100 focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none disabled:bg-gray-100 focus:border-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none disabled:bg-gray-100 focus:border-blue-500"
                />
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none disabled:bg-gray-100 focus:border-blue-500"
                />
              </div>

              {/* Website */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Website
                </label>

                <input
                  type="url"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none disabled:bg-gray-100 focus:border-blue-500"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Industry
                </label>

                <input
                  type="text"
                  name="industry"
                  value={profile.industry}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none disabled:bg-gray-100 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Company Description
              </label>

              <textarea
                name="description"
                value={profile.description}
                onChange={handleChange}
                disabled={!editing}
                rows="5"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none disabled:bg-gray-100 focus:border-blue-500"
              />
            </div>

            {/* Buttons */}
            {editing && (
              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Account Information */}
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">
            Account Information
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Account Type
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                Company
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Account Status
              </p>

              <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;