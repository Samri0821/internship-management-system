import React, { useEffect, useState } from "react";
import api from "../../services/api";

function GitHub() {
  const [github, setGithub] = useState(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // CHECK GITHUB STATUS
  // ==========================================
  useEffect(() => {
    checkGitHubStatus();
  }, []);

  const checkGitHubStatus = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/github/status");

      setConnected(response.data.connected || false);
      setGithub(response.data.github || null);
    } catch (err) {
      console.error("GitHub status error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to check GitHub connection."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CONNECT GITHUB
  // ==========================================
  const handleConnect = async () => {
    try {
      setConnecting(true);
      setError("");

      /*
       * IMPORTANT:
       * We use Axios here instead of window.location.href
       * because Axios automatically adds the JWT token
       * from localStorage through api.js.
       */
      const response = await api.get("/github/login");

      console.log("GitHub login response:", response.data);

      if (response.data.url) {
        // Send the browser to GitHub authorization page
        window.location.href = response.data.url;
      } else {
        setError(
          "GitHub authorization URL was not returned."
        );
        setConnecting(false);
      }
    } catch (err) {
      console.error("GitHub connection error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to connect to GitHub."
      );

      setConnecting(false);
    }
  };

  // ==========================================
  // DISCONNECT GITHUB
  // ==========================================
  const handleDisconnect = async () => {
    const confirmDisconnect = window.confirm(
      "Are you sure you want to disconnect your GitHub account?"
    );

    if (!confirmDisconnect) {
      return;
    }

    try {
      setDisconnecting(true);
      setError("");

      await api.delete("/github/disconnect");

      setConnected(false);
      setGithub(null);
    } catch (err) {
      console.error("GitHub disconnect error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to disconnect GitHub."
      );
    } finally {
      setDisconnecting(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border p-10 text-center">

            <div className="text-5xl mb-4">
              🐙
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              Checking GitHub connection...
            </h2>

            <p className="text-gray-500 mt-2">
              Please wait.
            </p>

          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">

          <h1 className="text-3xl font-bold text-gray-800">
            GitHub
          </h1>

          <p className="text-gray-500 mt-2">
            Connect your GitHub account to allow your
            supervisor to monitor your project activity.
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
            {error}
          </div>
        )}

        {/* ==========================================
            CONNECTED GITHUB
        ========================================== */}
        {connected && github ? (

          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

            {/* SUCCESS HEADER */}
            <div className="bg-green-50 border-b border-green-100 p-6">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                  ✓
                </div>

                <div>

                  <h2 className="text-lg font-bold text-green-800">
                    GitHub Connected
                  </h2>

                  <p className="text-sm text-green-700">
                    Your GitHub account is successfully connected.
                  </p>

                </div>

              </div>

            </div>

            {/* PROFILE */}
            <div className="p-6">

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                {/* AVATAR */}
                {github.avatarUrl ? (

                  <img
                    src={github.avatarUrl}
                    alt="GitHub Avatar"
                    className="w-24 h-24 rounded-full border-4 border-gray-100"
                  />

                ) : (

                  <div className="w-24 h-24 rounded-full bg-gray-900 text-white flex items-center justify-center text-4xl">
                    🐙
                  </div>

                )}

                {/* INFORMATION */}
                <div className="flex-1 text-center sm:text-left">

                  <p className="text-sm text-gray-500">
                    GitHub Username
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mt-1">
                    @{github.username}
                  </h2>

                  {github.profileUrl && (
                    <a
                      href={github.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View GitHub Profile →
                    </a>
                  )}

                </div>

              </div>

              {/* INFORMATION BOX */}
              <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">

                <h3 className="font-semibold text-blue-800 mb-2">
                  GitHub Activity Monitoring
                </h3>

                <p className="text-sm text-blue-700 leading-6">
                  Your connected GitHub account can be used
                  to monitor your coding activities and project
                  contributions during your internship.
                </p>

              </div>

              {/* DISCONNECT */}
              <div className="mt-6 flex justify-end">

                <button
                  onClick={handleDisconnect}
                  disabled={disconnecting}
                  className="px-5 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {disconnecting
                    ? "Disconnecting..."
                    : "Disconnect GitHub"}
                </button>

              </div>

            </div>

          </div>

        ) : (

          /* ==========================================
             NOT CONNECTED
          ========================================== */

          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

            <div className="p-8 md:p-12 text-center">

              {/* GITHUB ICON */}
              <div className="w-24 h-24 mx-auto bg-gray-900 rounded-full flex items-center justify-center text-5xl">
                🐙
              </div>

              {/* TITLE */}
              <h2 className="text-2xl font-bold text-gray-800 mt-6">
                Connect Your GitHub Account
              </h2>

              {/* DESCRIPTION */}
              <p className="text-gray-500 max-w-2xl mx-auto mt-3 leading-7">
                Connect your GitHub account to allow your
                supervisor to monitor your project repositories,
                coding activity, and contributions during your
                internship.
              </p>

              {/* CONNECT BUTTON */}
              <button
                onClick={handleConnect}
                disabled={connecting}
                className="mt-8 px-7 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {connecting
                  ? "Connecting..."
                  : "Connect GitHub"}
              </button>

              {/* FEATURES */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">

                {/* FEATURE 1 */}
                <div className="bg-gray-50 rounded-xl p-5">

                  <div className="text-2xl mb-2">
                    📊
                  </div>

                  <h3 className="font-semibold text-gray-800">
                    Track Activity
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Monitor your GitHub development activity.
                  </p>

                </div>

                {/* FEATURE 2 */}
                <div className="bg-gray-50 rounded-xl p-5">

                  <div className="text-2xl mb-2">
                    💻
                  </div>

                  <h3 className="font-semibold text-gray-800">
                    Project Contributions
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Show your contribution to internship projects.
                  </p>

                </div>

                {/* FEATURE 3 */}
                <div className="bg-gray-50 rounded-xl p-5">

                  <div className="text-2xl mb-2">
                    👨‍💼
                  </div>

                  <h3 className="font-semibold text-gray-800">
                    Supervisor Monitoring
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Help your supervisor review your progress.
                  </p>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default GitHub;