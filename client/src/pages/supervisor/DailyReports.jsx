import { useEffect, useState } from "react";

const DailyReports = () => {
  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedReport, setSelectedReport] =
    useState(null);

  const [comment, setComment] = useState("");

  const [reviewing, setReviewing] =
    useState(false);

  const API_URL =
    "http://localhost:5000/api/daily-reports";


  // ==========================================
  // GET JWT TOKEN
  // ==========================================
  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken")
    );
  };


  // ==========================================
  // LOAD SUPERVISOR REPORTS
  // ==========================================
  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError(
          "You are not logged in. Please login again."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/supervisor-reports`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      console.log(
        "Supervisor Reports Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load supervisor reports"
        );
      }

      setReports(data.reports || []);

    } catch (err) {
      console.error(
        "Fetch supervisor reports error:",
        err
      );

      setError(
        err.message ||
          "Failed to load supervisor reports"
      );

    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // LOAD REPORTS WHEN PAGE OPENS
  // ==========================================
  useEffect(() => {
    fetchReports();
  }, []);


  // ==========================================
  // OPEN REVIEW MODAL
  // ==========================================
  const openReview = (report) => {
    setSelectedReport(report);

    setComment(
      report.supervisorComment || ""
    );

    setError("");
  };


  // ==========================================
  // CLOSE REVIEW MODAL
  // ==========================================
  const closeReview = () => {
    setSelectedReport(null);

    setComment("");

    setError("");
  };


  // ==========================================
  // SUBMIT REVIEW
  // ==========================================
  const handleReview = async (e) => {
    e.preventDefault();

    if (!selectedReport) {
      return;
    }

    if (!comment.trim()) {
      setError(
        "Please enter feedback before submitting."
      );
      return;
    }

    try {
      setReviewing(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError(
          "You are not logged in. Please login again."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/${selectedReport._id}/review`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            supervisorComment:
              comment.trim()
          })
        }
      );

      const data = await response.json();

      console.log(
        "Review Report Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to review report"
        );
      }

      alert(
        "Daily report reviewed successfully!"
      );

      closeReview();

      await fetchReports();

    } catch (err) {
      console.error(
        "Review report error:",
        err
      );

      setError(
        err.message ||
          "Failed to review report"
      );

    } finally {
      setReviewing(false);
    }
  };


  // ==========================================
  // FORMAT DATE
  // ==========================================
  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );
  };


  // ==========================================
  // STATUS LABEL
  // ==========================================
  const getStatusLabel = (status) => {
    if (status === "reviewed") {
      return "Reviewed";
    }

    return "Pending Review";
  };


  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-bold text-gray-800">
            Daily Reports
          </h1>

          <p className="text-gray-500 mt-3">
            Loading reports...
          </p>

        </div>

      </div>
    );
  }


  // ==========================================
  // PAGE
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-7xl mx-auto">


        {/* ======================================
            HEADER
        ====================================== */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Daily Reports
            </h1>

            <p className="text-gray-500 mt-2">
              Review daily reports submitted by
              your assigned interns.
            </p>

          </div>


          <button
            type="button"
            onClick={fetchReports}
            className="px-5 py-2.5 bg-white border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            ↻ Refresh
          </button>

        </div>


        {/* ======================================
            ERROR
        ====================================== */}

        {error && !selectedReport && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">

            <strong>Error:</strong>{" "}
            {error}

          </div>
        )}


        {/* ======================================
            REPORT COUNT
        ====================================== */}

        {reports.length > 0 && (
          <div className="mb-6 bg-white border rounded-xl p-4">

            <p className="text-gray-600">

              Total Reports:{" "}

              <span className="font-bold text-blue-600">
                {reports.length}
              </span>

            </p>

          </div>
        )}


        {/* ======================================
            EMPTY STATE
        ====================================== */}

        {reports.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">

            <div className="text-5xl mb-4">
              📝
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              No Daily Reports
            </h2>

            <p className="text-gray-500 mt-2">
              Your assigned interns have not
              submitted any daily reports yet.
            </p>

          </div>

        ) : (


          /* ======================================
             REPORT LIST
          ====================================== */

          <div className="space-y-5">

            {reports.map((report) => (

              <div
                key={report._id}
                className="bg-white rounded-2xl border shadow-sm p-6"
              >


                {/* REPORT HEADER */}

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                  <div>

                    <h2 className="text-xl font-bold text-gray-800">
                      {report.title ||
                        "Daily Report"}
                    </h2>

                    <p className="text-gray-500 mt-1">

                      Submitted by{" "}

                      <span className="font-semibold text-gray-700">
                        {report.intern?.name ||
                          "Unknown Intern"}
                      </span>

                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      📅{" "}
                      {formatDate(report.date)}
                    </p>

                  </div>


                  {/* STATUS */}

                  <span
                    className={`px-4 py-2 rounded-full font-medium text-sm ${
                      report.status ===
                      "reviewed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {getStatusLabel(
                      report.status
                    )}
                  </span>

                </div>


                {/* ==================================
                    INTERN INFORMATION
                ================================== */}

                {report.intern && (
                  <div className="mt-5 p-4 bg-blue-50 rounded-lg">

                    <h3 className="font-bold text-blue-900 mb-2">
                      Intern Information
                    </h3>

                    <p className="text-sm text-blue-800">
                      <strong>Name:</strong>{" "}
                      {report.intern.name ||
                        "N/A"}
                    </p>

                    <p className="text-sm text-blue-800 mt-1">
                      <strong>Email:</strong>{" "}
                      {report.intern.email ||
                        "N/A"}
                    </p>

                    {report.intern.university && (
                      <p className="text-sm text-blue-800 mt-1">
                        <strong>
                          University:
                        </strong>{" "}
                        {
                          report.intern
                            .university
                        }
                      </p>
                    )}

                    {report.intern.fieldOfStudy && (
                      <p className="text-sm text-blue-800 mt-1">
                        <strong>
                          Field:
                        </strong>{" "}
                        {
                          report.intern
                            .fieldOfStudy
                        }
                      </p>
                    )}

                  </div>
                )}


                {/* ==================================
                    INTERNSHIP INFORMATION
                ================================== */}

                {report.internship && (
                  <div className="mt-5 p-4 bg-gray-50 rounded-lg">

                    <h3 className="font-bold text-gray-800 mb-2">
                      Internship Information
                    </h3>

                    <p className="text-sm text-gray-600">
                      <strong>
                        Organization:
                      </strong>{" "}
                      {
                        report.internship
                          .organization ||
                        "N/A"
                      }
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      <strong>
                        Department:
                      </strong>{" "}
                      {
                        report.internship
                          .department ||
                        "N/A"
                      }
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      <strong>
                        Position:
                      </strong>{" "}
                      {
                        report.internship
                          .position ||
                        "N/A"
                      }
                    </p>

                  </div>
                )}


                {/* ==================================
                    ACTIVITIES
                ================================== */}

                <div className="mt-5">

                  <h3 className="font-bold text-gray-800">
                    Activities
                  </h3>

                  <div className="mt-2 bg-gray-50 rounded-lg p-4">

                    <p className="text-gray-700 whitespace-pre-line">
                      {report.activities ||
                        "No activities provided."}
                    </p>

                  </div>

                </div>


                {/* ==================================
                    ACHIEVEMENTS
                ================================== */}

                {report.achievements && (

                  <div className="mt-5">

                    <h3 className="font-bold text-gray-800">
                      Achievements
                    </h3>

                    <div className="mt-2 bg-gray-50 rounded-lg p-4">

                      <p className="text-gray-700 whitespace-pre-line">
                        {report.achievements}
                      </p>

                    </div>

                  </div>

                )}


                {/* ==================================
                    CHALLENGES
                ================================== */}

                {report.challenges && (

                  <div className="mt-5">

                    <h3 className="font-bold text-gray-800">
                      Challenges
                    </h3>

                    <div className="mt-2 bg-gray-50 rounded-lg p-4">

                      <p className="text-gray-700 whitespace-pre-line">
                        {report.challenges}
                      </p>

                    </div>

                  </div>

                )}


                {/* ==================================
                    HOURS WORKED
                ================================== */}

                <div className="mt-5 p-3 bg-blue-50 rounded-lg text-blue-800">

                  ⏱️{" "}

                  <strong>
                    Hours Worked:
                  </strong>{" "}

                  {report.hoursWorked || 0} hours

                </div>


                {/* ==================================
                    SUPERVISOR FEEDBACK
                ================================== */}

                {report.supervisorComment && (

                  <div className="mt-5 p-4 bg-green-50 border-l-4 border-green-500 rounded">

                    <h3 className="font-bold text-green-800">
                      💬 Supervisor Feedback
                    </h3>

                    <p className="text-green-700 mt-2 whitespace-pre-line">
                      {
                        report.supervisorComment
                      }
                    </p>

                  </div>

                )}


                {/* ==================================
                    REVIEW BUTTON
                ================================== */}

                <div className="mt-6 pt-5 border-t">

                  <button
                    type="button"
                    onClick={() =>
                      openReview(report)
                    }
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    {report.status ===
                    "reviewed"
                      ? "Update Review"
                      : "Review Report"}
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* ========================================
          REVIEW MODAL
      ======================================== */}

      {selectedReport && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">


            {/* MODAL HEADER */}

            <div className="p-6 border-b flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Review Daily Report
                </h2>

                <p className="text-gray-500 mt-1">
                  {selectedReport.title}
                </p>

              </div>


              <button
                type="button"
                onClick={closeReview}
                className="text-gray-500 hover:text-gray-800 text-3xl"
              >
                ×
              </button>

            </div>


            {/* MODAL BODY */}

            <form
              onSubmit={handleReview}
              className="p-6"
            >


              {/* INTERN */}

              <div className="mb-5">

                <p className="text-sm text-gray-500">
                  Intern
                </p>

                <p className="font-semibold text-gray-800">
                  {
                    selectedReport.intern
                      ?.name ||
                    "Unknown Intern"
                  }
                </p>

              </div>


              {/* DATE */}

              <div className="mb-5">

                <p className="text-sm text-gray-500">
                  Report Date
                </p>

                <p className="font-semibold text-gray-800">
                  {formatDate(
                    selectedReport.date
                  )}
                </p>

              </div>


              {/* ACTIVITIES */}

              <div className="mb-5">

                <p className="text-sm text-gray-500 mb-2">
                  Activities
                </p>

                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line text-gray-700">
                  {
                    selectedReport.activities ||
                    "No activities provided."
                  }
                </div>

              </div>


              {/* ACHIEVEMENTS */}

              {selectedReport.achievements && (

                <div className="mb-5">

                  <p className="text-sm text-gray-500 mb-2">
                    Achievements
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line text-gray-700">
                    {
                      selectedReport
                        .achievements
                    }
                  </div>

                </div>

              )}


              {/* CHALLENGES */}

              {selectedReport.challenges && (

                <div className="mb-5">

                  <p className="text-sm text-gray-500 mb-2">
                    Challenges
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line text-gray-700">
                    {
                      selectedReport.challenges
                    }
                  </div>

                </div>

              )}


              {/* HOURS */}

              <div className="mb-5 p-3 bg-blue-50 rounded-lg text-blue-800">

                ⏱️{" "}

                <strong>
                  Hours Worked:
                </strong>{" "}

                {
                  selectedReport.hoursWorked ||
                  0
                } hours

              </div>


              {/* FEEDBACK */}

              <div className="mb-5">

                <label className="block font-semibold text-gray-800 mb-2">
                  Supervisor Feedback
                </label>

                <textarea
                  value={comment}
                  onChange={(e) =>
                    setComment(
                      e.target.value
                    )
                  }
                  rows={5}
                  placeholder="Write your feedback for the intern..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* MODAL ERROR */}

              {error && (

                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">

                  {error}

                </div>

              )}


              {/* MODAL BUTTONS */}

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={closeReview}
                  disabled={reviewing}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 disabled:opacity-50"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={reviewing}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {reviewing
                    ? "Saving..."
                    : "Submit Review"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default DailyReports;