import { useEffect, useState } from "react";

const Evaluations = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedIntern, setSelectedIntern] =
    useState(null);

  const [form, setForm] = useState({
    technicalSkills: 3,
    communication: 3,
    teamwork: 3,
    problemSolving: 3,
    comments: ""
  });

  const [submitting, setSubmitting] =
    useState(false);

  const API_URL =
    "http://localhost:5000/api/evaluations";

  // ==========================================
  // GET TOKEN
  // ==========================================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken")
    );
  };

  // ==========================================
  // LOAD INTERNS
  // ==========================================

  const fetchInterns = async () => {
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
        `${API_URL}/supervisor-interns`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      console.log(
        "Evaluation Interns Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load interns"
        );
      }

      setInterns(data.interns || []);
    } catch (err) {
      console.error(
        "Fetch evaluation interns error:",
        err
      );

      setError(
        err.message ||
          "Failed to load interns"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterns();
  }, []);

  // ==========================================
  // OPEN EVALUATION
  // ==========================================

  const openEvaluation = (item) => {
    setSelectedIntern(item);

    setForm({
      technicalSkills: 3,
      communication: 3,
      teamwork: 3,
      problemSolving: 3,
      comments: ""
    });

    setError("");
  };

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const closeEvaluation = () => {
    setSelectedIntern(null);

    setForm({
      technicalSkills: 3,
      communication: 3,
      teamwork: 3,
      problemSolving: 3,
      comments: ""
    });

    setError("");
  };

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        name === "comments"
          ? value
          : Number(value)
    }));
  };

  // ==========================================
  // CALCULATE OVERALL
  // ==========================================

  const overallScore = (
    (
      Number(form.technicalSkills) +
      Number(form.communication) +
      Number(form.teamwork) +
      Number(form.problemSolving)
    ) / 4
  ).toFixed(2);

  // ==========================================
  // SUBMIT EVALUATION
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedIntern) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError(
          "You are not logged in. Please login again."
        );
        return;
      }

      const response = await fetch(
        API_URL,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            intern:
              selectedIntern.intern._id,

            internship:
              selectedIntern.internship._id,

            technicalSkills:
              form.technicalSkills,

            communication:
              form.communication,

            teamwork:
              form.teamwork,

            problemSolving:
              form.problemSolving,

            comments:
              form.comments.trim()
          })
        }
      );

      const data = await response.json();

      console.log(
        "Evaluation Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to submit evaluation"
        );
      }

      alert(
        "Evaluation submitted successfully!"
      );

      closeEvaluation();

      await fetchInterns();
    } catch (err) {
      console.error(
        "Submit evaluation error:",
        err
      );

      setError(
        err.message ||
          "Failed to submit evaluation"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">
            Intern Evaluations
          </h1>

          <p className="text-gray-500 mt-3">
            Loading interns...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Intern Evaluations
            </h1>

            <p className="text-gray-500 mt-2">
              Evaluate the performance of your
              assigned interns.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchInterns}
            className="px-5 py-2.5 bg-white border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            ↻ Refresh
          </button>
        </div>

        {/* ERROR */}
        {error && !selectedIntern && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <strong>Error:</strong>{" "}
            {error}
          </div>
        )}

        {/* EMPTY */}
        {interns.length === 0 ? (
          <div className="bg-white rounded-2xl border shadow-sm p-12 text-center">
            <div className="text-5xl mb-4">
              👨‍🎓
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              No Assigned Interns
            </h2>

            <p className="text-gray-500 mt-2">
              You currently have no interns assigned
              to you.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {interns.map((item) => (
              <div
                key={
                  item.intern._id +
                  item.internship._id
                }
                className="bg-white rounded-2xl border shadow-sm p-6"
              >

                {/* INTERN */}
                <div className="flex items-start justify-between gap-4">

                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {item.intern.name ||
                        "Unknown Intern"}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {item.intern.email}
                    </p>
                  </div>

                  {item.evaluated ? (
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                      Evaluated
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                      Pending
                    </span>
                  )}
                </div>

                {/* UNIVERSITY */}
                {item.intern.university && (
                  <p className="text-sm text-gray-600 mt-4">
                    <strong>
                      University:
                    </strong>{" "}
                    {item.intern.university}
                  </p>
                )}

                {/* FIELD */}
                {item.intern.fieldOfStudy && (
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>
                      Field:
                    </strong>{" "}
                    {item.intern.fieldOfStudy}
                  </p>
                )}

                {/* INTERNSHIP */}
                <div className="mt-5 p-4 bg-gray-50 rounded-lg">

                  <p className="text-sm text-gray-600">
                    <strong>
                      Organization:
                    </strong>{" "}
                    {item.internship.organization ||
                      "N/A"}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    <strong>
                      Department:
                    </strong>{" "}
                    {item.internship.department ||
                      "N/A"}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    <strong>
                      Position:
                    </strong>{" "}
                    {item.internship.position ||
                      "N/A"}
                  </p>

                </div>

                {/* EXISTING SCORE */}
                {item.evaluated &&
                  item.evaluation && (
                    <div className="mt-5 p-4 bg-green-50 rounded-lg">

                      <p className="text-green-800 font-semibold">
                        Overall Score
                      </p>

                      <p className="text-3xl font-bold text-green-700 mt-1">
                        {
                          item.evaluation
                            .overallScore
                        }{" "}
                        / 5
                      </p>

                    </div>
                  )}

                {/* BUTTON */}
                <div className="mt-6">

                  {item.evaluated ? (
                    <button
                      type="button"
                      disabled
                      className="w-full px-5 py-3 bg-gray-200 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                    >
                      Evaluation Submitted
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        openEvaluation(item)
                      }
                      className="w-full px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Submit Evaluation
                    </button>
                  )}

                </div>

              </div>
            ))}

          </div>
        )}
      </div>

      {/* ======================================
          EVALUATION MODAL
      ====================================== */}

      {selectedIntern && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* HEADER */}
            <div className="p-6 border-b flex justify-between items-center">

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Evaluate Intern
                </h2>

                <p className="text-gray-500 mt-1">
                  {selectedIntern.intern.name}
                </p>
              </div>

              <button
                type="button"
                onClick={closeEvaluation}
                className="text-gray-500 hover:text-gray-800 text-3xl"
              >
                ×
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="p-6"
            >

              {/* TECHNICAL SKILLS */}
              <div className="mb-5">
                <label className="block font-semibold text-gray-800 mb-2">
                  Technical Skills
                </label>

                <select
                  name="technicalSkills"
                  value={
                    form.technicalSkills
                  }
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>
                    1 - Poor
                  </option>

                  <option value={2}>
                    2 - Below Average
                  </option>

                  <option value={3}>
                    3 - Average
                  </option>

                  <option value={4}>
                    4 - Good
                  </option>

                  <option value={5}>
                    5 - Excellent
                  </option>
                </select>
              </div>

              {/* COMMUNICATION */}
              <div className="mb-5">
                <label className="block font-semibold text-gray-800 mb-2">
                  Communication
                </label>

                <select
                  name="communication"
                  value={
                    form.communication
                  }
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>
                    1 - Poor
                  </option>

                  <option value={2}>
                    2 - Below Average
                  </option>

                  <option value={3}>
                    3 - Average
                  </option>

                  <option value={4}>
                    4 - Good
                  </option>

                  <option value={5}>
                    5 - Excellent
                  </option>
                </select>
              </div>

              {/* TEAMWORK */}
              <div className="mb-5">
                <label className="block font-semibold text-gray-800 mb-2">
                  Teamwork
                </label>

                <select
                  name="teamwork"
                  value={form.teamwork}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>
                    1 - Poor
                  </option>

                  <option value={2}>
                    2 - Below Average
                  </option>

                  <option value={3}>
                    3 - Average
                  </option>

                  <option value={4}>
                    4 - Good
                  </option>

                  <option value={5}>
                    5 - Excellent
                  </option>
                </select>
              </div>

              {/* PROBLEM SOLVING */}
              <div className="mb-5">
                <label className="block font-semibold text-gray-800 mb-2">
                  Problem Solving
                </label>

                <select
                  name="problemSolving"
                  value={
                    form.problemSolving
                  }
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>
                    1 - Poor
                  </option>

                  <option value={2}>
                    2 - Below Average
                  </option>

                  <option value={3}>
                    3 - Average
                  </option>

                  <option value={4}>
                    4 - Good
                  </option>

                  <option value={5}>
                    5 - Excellent
                  </option>
                </select>
              </div>

              {/* OVERALL SCORE */}
              <div className="mb-5 p-5 bg-blue-50 rounded-xl text-center">

                <p className="text-blue-800 font-semibold">
                  Overall Score
                </p>

                <p className="text-4xl font-bold text-blue-700 mt-2">
                  {overallScore} / 5
                </p>

                <p className="text-sm text-blue-600 mt-1">
                  Automatically calculated
                </p>

              </div>

              {/* COMMENTS */}
              <div className="mb-5">

                <label className="block font-semibold text-gray-800 mb-2">
                  Comments / Feedback
                </label>

                <textarea
                  name="comments"
                  value={form.comments}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your evaluation comments and feedback..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* ERROR */}
              {error && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  <strong>Error:</strong>{" "}
                  {error}
                </div>
              )}

              {/* BUTTONS */}
              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={closeEvaluation}
                  disabled={submitting}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Evaluation"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </div>
  );
};

export default Evaluations;