
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // ==========================================
      // SAVE LOGIN INFORMATION
      // ==========================================

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ==========================================
      // REDIRECT BASED ON ROLE
      // ==========================================

      switch (data.user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;

        case "supervisor":
          navigate("/supervisor/dashboard");
          break;

        case "intern":
          navigate("/intern/dashboard");
          break;

        case "company":
          navigate("/company/dashboard");
          break;

        default:
          alert("Unknown user role.");
          break;
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-2">

        {/* ==========================================
            LEFT SIDE
        ========================================== */}

        <div className="hidden bg-blue-600 p-10 text-white lg:flex lg:flex-col lg:justify-center">
          <div className="mb-8">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl">
              🎓
            </div>

            <h1 className="text-4xl font-bold">
              Internship Management System
            </h1>

            <p className="mt-5 leading-7 text-blue-100">
              Connect students, companies, supervisors, and universities
              through one platform for managing internships.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">✓</span>
              <span>Find internship opportunities</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">✓</span>
              <span>Manage applications</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">✓</span>
              <span>Schedule interviews</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">✓</span>
              <span>Track internship attendance</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            LOGIN FORM
        ========================================== */}

        <div className="p-6 sm:p-10">
          <div className="mx-auto max-w-md">

            {/* Mobile Logo */}
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                🎓
              </div>

              <h1 className="text-xl font-bold text-gray-800">
                Internship Management System
              </h1>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Welcome Back
              </h2>

              <p className="mt-2 text-gray-500">
                Sign in to your account to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

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
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      alert("Password reset will be connected later.")
                    }
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Register */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>

            {/* Development Notice */}
            <div className="mt-6 rounded-lg bg-yellow-50 p-4">
              <p className="text-xs leading-5 text-yellow-700">
                <strong>Development mode:</strong> Login is now connected
                to the backend and uses JWT authentication.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;