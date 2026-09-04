import { useEffect, useState } from "react";

function Profile() {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
const fetchProfile = async () => {
try {
const token = localStorage.getItem("token");

    if (!token) {
      setError("You are not logged in.");
      setLoading(false);
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to load profile");
    }

    setUser(data.user);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

fetchProfile();

}, []);

if (loading) {
return (
<div className="flex min-h-[60vh] items-center justify-center">
<p className="text-lg text-gray-600">Loading profile...</p>
</div>
);
}

if (error) {
return (
<div className="p-6">
<div className="rounded-lg bg-red-100 p-4 text-red-700">
{error}
</div>
</div>
);
}

return (
<div className="min-h-screen bg-gray-50 p-6">
<div className="mx-auto max-w-3xl">
<div className="mb-6">
<h1 className="text-3xl font-bold text-gray-800">
My Profile
</h1>
<p className="mt-1 text-gray-500">
View your personal and academic information.
</p>
</div>

    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-blue-600">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {user?.name || "Intern"}
            </h2>
            <p className="text-blue-100">
              {user?.role || "Intern"}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="p-6">
        <h3 className="mb-5 text-xl font-semibold text-gray-800">
          Personal Information
        </h3>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="mt-1 font-semibold text-gray-800">
              {user?.name || "Not provided"}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Email</p>
            <p className="mt-1 font-semibold text-gray-800">
              {user?.email || "Not provided"}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">University</p>
            <p className="mt-1 font-semibold text-gray-800">
              {user?.university || "Not provided"}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Field of Study</p>
            <p className="mt-1 font-semibold capitalize text-gray-800">
              {user?.fieldOfStudy || "Not provided"}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Account Role</p>
            <p className="mt-1 font-semibold capitalize text-gray-800">
              {user?.role || "Not provided"}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">GitHub</p>
            <p className="mt-1 font-semibold text-gray-800">
              {user?.github?.connected
                ? `Connected: ${user.github.username}`
                : "Not connected"}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

);
}

export default Profile;