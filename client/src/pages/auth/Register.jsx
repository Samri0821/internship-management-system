import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    fieldOfStudy: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            university: formData.university.trim(),
            fieldOfStudy: formData.fieldOfStudy,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      alert(
        "Account created successfully! Please login with your new account."
      );

      navigate("/login");

    } catch (error) {
      console.error("Registration Error:", error);

      alert(
        error.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
            🎓
          </div>

          <h1 className="mt-4 text-3xl font-bold text-gray-800">
            Create Your Account
          </h1>

          <p className="mt-2 text-gray-500">
            Join the Internship Management System
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-10">

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* University */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  University
                </label>

                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  placeholder="Enter your university"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Select your field
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

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  Password must contain at least 6 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

            </div>

            {/* Terms */}
            <div className="mt-6 flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 h-4 w-4"
              />

              <label
                htmlFor="terms"
                className="text-sm leading-5 text-gray-600"
              >
                I agree to the terms and conditions of the
                Internship Management System.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-7 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* Login */}
          <div className="mt-7 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;