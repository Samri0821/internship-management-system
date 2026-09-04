import { useEffect, useState } from "react";

function DailyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    internship: "",
    date: "",
    title: "",
    activities: "",
    challenges: "",
    achievements: "",
    hoursWorked: "",
  });

  const API_URL = "http://localhost:5000/api/daily-reports";

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
  // LOAD MY REPORTS
  // ==========================================
  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError("You are not logged in. Please login again.");
        return;
      }

      const response = await fetch(`${API_URL}/my-reports`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("Daily Reports API Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load daily reports"
        );
      }

      setReports(data.reports || []);
    } catch (err) {
      console.error("Fetch reports error:", err);
      setError(err.message || "Failed to load daily reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ==========================================
  // HANDLE FORM INPUT
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // SUBMIT REPORT
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const token = getToken();

    if (!token) {
      setError("You are not logged in. Please login again.");
      return;
    }

    if (
      !formData.internship ||
      !formData.date ||
      !formData.title ||
      !formData.activities
    ) {
      setError(
        "Internship ID, date, title and activities are required."
      );
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          internship: formData.internship,
          date: formData.date,
          title: formData.title,
          activities: formData.activities,
          challenges: formData.challenges,
          achievements: formData.achievements,
          hoursWorked: Number(formData.hoursWorked) || 0,
        }),
      });

      const data = await response.json();

      console.log("Submit Report Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit daily report"
        );
      }

      alert("Daily report submitted successfully!");

      setFormData({
        internship: "",
        date: "",
        title: "",
        activities: "",
        challenges: "",
        achievements: "",
        hoursWorked: "",
      });

      setShowForm(false);

      await fetchReports();
    } catch (err) {
      console.error("Submit report error:", err);
      setError(
        err.message || "Failed to submit daily report"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // DELETE REPORT
  // ==========================================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const token = getToken();

      if (!token) {
        setError("You are not logged in. Please login again.");
        return;
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("Delete Report Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete report"
        );
      }

      alert("Report deleted successfully.");

      await fetchReports();
    } catch (err) {
      console.error("Delete report error:", err);
      setError(
        err.message || "Failed to delete report"
      );
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================
  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Daily Reports</h1>

          <p style={styles.loading}>
            Loading your reports...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================
  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>
              Daily Reports
            </h1>

            <p style={styles.subtitle}>
              Record and track your daily internship activities.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setError("");
              setShowForm(!showForm);
            }}
            style={styles.primaryButton}
          >
            {showForm ? "Cancel" : "+ New Report"}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div style={styles.error}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* NEW REPORT FORM */}
        {showForm && (
          <div style={styles.formCard}>
            <h2 style={styles.formTitle}>
              Submit Daily Report
            </h2>

            <form onSubmit={handleSubmit}>

              {/* INTERNSHIP */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Internship ID *
                </label>

                <input
                  type="text"
                  name="internship"
                  value={formData.internship}
                  onChange={handleChange}
                  placeholder="Paste your internship ID"
                  style={styles.input}
                  required
                />

                <small style={styles.helpText}>
                  Example: 6a943aa0e386a4ecb142dca0
                </small>
              </div>

              {/* DATE */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Date *
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              {/* TITLE */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Report Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Example: React Dashboard Development"
                  style={styles.input}
                  required
                />
              </div>

              {/* ACTIVITIES */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Activities *
                </label>

                <textarea
                  name="activities"
                  value={formData.activities}
                  onChange={handleChange}
                  placeholder="Describe what you worked on today..."
                  rows="5"
                  style={styles.textarea}
                  required
                />
              </div>

              {/* CHALLENGES */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Challenges
                </label>

                <textarea
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleChange}
                  placeholder="Describe any challenges you faced..."
                  rows="4"
                  style={styles.textarea}
                />
              </div>

              {/* ACHIEVEMENTS */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Achievements
                </label>

                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  placeholder="What did you accomplish today?"
                  rows="4"
                  style={styles.textarea}
                />
              </div>

              {/* HOURS */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Hours Worked
                </label>

                <input
                  type="number"
                  name="hoursWorked"
                  value={formData.hoursWorked}
                  onChange={handleChange}
                  min="0"
                  max="24"
                  step="0.5"
                  placeholder="Example: 8"
                  style={styles.input}
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  ...styles.submitButton,
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Daily Report"}
              </button>

            </form>
          </div>
        )}

        {/* REPORTS */}
        <div style={styles.reportsSection}>

          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              My Reports
            </h2>

            <button
              type="button"
              onClick={fetchReports}
              style={styles.refreshButton}
            >
              ↻ Refresh
            </button>
          </div>

          {reports.length === 0 ? (
            <div style={styles.emptyState}>

              <div style={styles.emptyIcon}>
                📝
              </div>

              <h3>No Daily Reports Yet</h3>

              <p>
                You haven't submitted any daily reports yet.
              </p>

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setShowForm(true);
                }}
                style={styles.primaryButton}
              >
                + Submit Your First Report
              </button>

            </div>
          ) : (
            <div style={styles.reportList}>

              {reports.map((report) => (
                <div
                  key={report._id}
                  style={styles.reportCard}
                >

                  {/* REPORT HEADER */}
                  <div style={styles.reportHeader}>

                    <div>
                      <h3 style={styles.reportTitle}>
                        {report.title}
                      </h3>

                      <p style={styles.reportDate}>
                        📅 {formatDate(report.date)}
                      </p>
                    </div>

                    <span style={styles.status}>
                      {report.status || "submitted"}
                    </span>

                  </div>

                  {/* INTERNSHIP */}
                  <div style={styles.internshipInfo}>
                    <strong>Internship:</strong>{" "}

                    {report.internship?.organization ||
                      "Internship"}

                    {report.internship?.position && (
                      <>
                        {" — "}
                        {report.internship.position}
                      </>
                    )}
                  </div>

                  {/* ACTIVITIES */}
                  <div style={styles.field}>
                    <h4>Activities</h4>

                    <p>
                      {report.activities ||
                        "No activities provided."}
                    </p>
                  </div>

                  {/* ACHIEVEMENTS */}
                  {report.achievements && (
                    <div style={styles.field}>
                      <h4>Achievements</h4>

                      <p>
                        {report.achievements}
                      </p>
                    </div>
                  )}

                  {/* CHALLENGES */}
                  {report.challenges && (
                    <div style={styles.field}>
                      <h4>Challenges</h4>

                      <p>
                        {report.challenges}
                      </p>
                    </div>
                  )}

                  {/* HOURS */}
                  <div style={styles.hours}>
                    ⏱️ <strong>Hours Worked:</strong>{" "}
                    {report.hoursWorked || 0} hours
                  </div>

                  {/* SUPERVISOR COMMENT */}
                  {report.supervisorComment && (
                    <div style={styles.comment}>
                      <h4>
                        💬 Supervisor Feedback
                      </h4>

                      <p>
                        {report.supervisorComment}
                      </p>
                    </div>
                  )}

                  {/* DELETE */}
                  {report.status !== "reviewed" && (
                    <div style={styles.actions}>
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(report._id)
                        }
                        style={styles.deleteButton}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  )}

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "30px 20px",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },

  heading: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "700",
    color: "#1e293b",
  },

  subtitle: {
    marginTop: "8px",
    color: "#64748b",
    fontSize: "16px",
  },

  primaryButton: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 20px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  error: {
    background: "#fee2e2",
    color: "#991b1b",
    border: "1px solid #fecaca",
    padding: "14px 18px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  loading: {
    color: "#64748b",
    fontSize: "16px",
  },

  formCard: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    marginBottom: "30px",
  },

  formTitle: {
    marginTop: 0,
    marginBottom: "25px",
    color: "#1e293b",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },

  label: {
    fontWeight: "600",
    color: "#334155",
    marginBottom: "7px",
  },

  input: {
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
  },

  textarea: {
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "15px",
    resize: "vertical",
    fontFamily: "inherit",
    outline: "none",
  },

  helpText: {
    color: "#64748b",
    marginTop: "5px",
  },

  submitButton: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "9px",
    padding: "13px 22px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  reportsSection: {
    marginTop: "20px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: 0,
    color: "#1e293b",
    fontSize: "24px",
  },

  refreshButton: {
    background: "#fff",
    color: "#2563eb",
    border: "1px solid #2563eb",
    borderRadius: "8px",
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: "600",
  },

  emptyState: {
    background: "#fff",
    padding: "60px 30px",
    textAlign: "center",
    borderRadius: "16px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
    color: "#64748b",
  },

  emptyIcon: {
    fontSize: "45px",
    marginBottom: "10px",
  },

  reportList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  reportCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.07)",
  },

  reportHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "15px",
  },

  reportTitle: {
    margin: 0,
    fontSize: "20px",
    color: "#1e293b",
  },

  reportDate: {
    margin: "6px 0 0",
    color: "#64748b",
  },

  status: {
    background: "#dbeafe",
    color: "#1d4ed8",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "capitalize",
  },

  internshipInfo: {
    background: "#f1f5f9",
    padding: "10px 12px",
    borderRadius: "8px",
    marginBottom: "18px",
    color: "#475569",
  },

  field: {
    marginBottom: "15px",
  },

  hours: {
    background: "#f8fafc",
    padding: "10px 12px",
    borderRadius: "8px",
    color: "#475569",
    marginTop: "15px",
  },

  comment: {
    background: "#eff6ff",
    borderLeft: "4px solid #2563eb",
    padding: "12px 15px",
    marginTop: "18px",
    borderRadius: "6px",
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
    paddingTop: "15px",
    borderTop: "1px solid #e2e8f0",
  },

  deleteButton: {
    background: "#fee2e2",
    color: "#b91c1c",
    border: "none",
    borderRadius: "8px",
    padding: "9px 14px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default DailyReports;