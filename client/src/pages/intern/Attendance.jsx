
import { useEffect, useState } from "react";
import api from "../../services/api";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [internship, setInternship] = useState(null);

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // LOAD ATTENDANCE AND ASSIGNED INTERNSHIP
  // =====================================================
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      // Get assigned internship
      const internshipResponse = await api.get(
        "/internships/my"
      );

      console.log(
        "My internship:",
        internshipResponse.data
      );

      const myInternships =
        internshipResponse.data.internships || [];

      if (myInternships.length > 0) {
        setInternship(myInternships[0]);
      } else {
        setInternship(null);
      }

      // Get attendance history
      const attendanceResponse = await api.get(
        "/attendance/my"
      );

      console.log(
        "My attendance:",
        attendanceResponse.data
      );

      setAttendance(
        attendanceResponse.data.attendance || []
      );
    } catch (err) {
      console.error("Attendance loading error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load attendance information."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD DATA WHEN PAGE OPENS
  // =====================================================
  useEffect(() => {
    loadData();
  }, []);

  // =====================================================
  // GET CURRENT GPS LOCATION
  // =====================================================
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(
          new Error(
            "Your browser does not support GPS location."
          )
        );
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (gpsError) => {
          if (gpsError.code === 1) {
            reject(
              new Error(
                "Location permission was denied. Please allow location access."
              )
            );
          } else if (gpsError.code === 2) {
            reject(
              new Error(
                "Your current location could not be determined."
              )
            );
          } else if (gpsError.code === 3) {
            reject(
              new Error(
                "Getting your location took too long. Please try again."
              )
            );
          } else {
            reject(
              new Error(
                "Unable to get your current location."
              )
            );
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    });
  };

  // =====================================================
  // CHECK IF ALREADY CHECKED IN TODAY
  // =====================================================
  const getTodayAttendance = () => {
    const today = new Date();

    return attendance.find((record) => {
      const recordDate = new Date(record.date);

      return (
        recordDate.getFullYear() === today.getFullYear() &&
        recordDate.getMonth() === today.getMonth() &&
        recordDate.getDate() === today.getDate()
      );
    });
  };

  // =====================================================
  // CHECK IN
  // =====================================================
  const handleCheckIn = async () => {
    try {
      setProcessing(true);
      setError("");
      setSuccess("");

      if (!internship?._id) {
        setError(
          "You do not have an assigned internship."
        );
        return;
      }

      // Get user's GPS location
      const location = await getLocation();

      console.log("Check-in location:", location);

      const response = await api.post(
        "/attendance/check-in",
        {
          internship: internship._id,
          latitude: location.latitude,
          longitude: location.longitude,
        }
      );

      console.log(
        "Check-in response:",
        response.data
      );

      setSuccess(
        response.data.message ||
          "Attendance checked in successfully."
      );

      await loadData();
    } catch (err) {
      console.error("Check-in error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to check in."
      );
    } finally {
      setProcessing(false);
    }
  };

  // =====================================================
  // CHECK OUT
  // =====================================================
  const handleCheckOut = async () => {
    try {
      setProcessing(true);
      setError("");
      setSuccess("");

      if (!internship?._id) {
        setError(
          "You do not have an assigned internship."
        );
        return;
      }

      const todayAttendance =
        getTodayAttendance();

      if (!todayAttendance) {
        setError(
          "You must check in before checking out."
        );
        return;
      }

      // Get user's GPS location
      const location = await getLocation();

      console.log("Check-out location:", location);

      const response = await api.post(
        "/attendance/check-out",
        {
          internship: internship._id,
          latitude: location.latitude,
          longitude: location.longitude,
        }
      );

      console.log(
        "Check-out response:",
        response.data
      );

      setSuccess(
        response.data.message ||
          "Attendance checked out successfully."
      );

      await loadData();
    } catch (err) {
      console.error("Check-out error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to check out."
      );
    } finally {
      setProcessing(false);
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================
  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString();
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================
  const formatTime = (time) => {
    if (!time) {
      return "—";
    }

    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =====================================================
  // LOADING
  // =====================================================
  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <h1>Attendance</h1>
          <p>Loading attendance information...</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // TODAY'S RECORD
  // =====================================================
  const todayAttendance =
    getTodayAttendance();

  // =====================================================
  // PAGE
  // =====================================================
  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            Attendance
          </h1>

          <p style={styles.subtitle}>
            Track your internship attendance using
            GPS-based check-in and check-out.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div style={styles.success}>
            {success}
          </div>
        )}

        {/* =========================================== */}
        {/* INTERNSHIP INFORMATION */}
        {/* =========================================== */}

        {internship ? (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              My Internship
            </h2>

            <div style={styles.infoGrid}>

              <div>
                <strong>Organization</strong>
                <p>
                  {internship.organization || "—"}
                </p>
              </div>

              <div>
                <strong>Position</strong>
                <p>
                  {internship.position || "—"}
                </p>
              </div>

              <div>
                <strong>Department</strong>
                <p>
                  {internship.department || "—"}
                </p>
              </div>

              <div>
                <strong>Field of Study</strong>
                <p>
                  {internship.fieldOfStudy || "—"}
                </p>
              </div>

              <div>
                <strong>Start Date</strong>
                <p>
                  {formatDate(internship.startDate)}
                </p>
              </div>

              <div>
                <strong>End Date</strong>
                <p>
                  {formatDate(internship.endDate)}
                </p>
              </div>

            </div>
          </div>
        ) : (
          <div style={styles.warning}>
            <h2>No Assigned Internship</h2>

            <p>
              You do not currently have an assigned
              internship. Attendance will become
              available after an internship is assigned
              to you.
            </p>
          </div>
        )}

        {/* =========================================== */}
        {/* TODAY */}
        {/* =========================================== */}

        {internship && (
          <div style={styles.card}>

            <h2 style={styles.cardTitle}>
              Today's Attendance
            </h2>

            {!todayAttendance ? (
              <div>
                <p style={styles.muted}>
                  You have not checked in today.
                </p>

                <button
                  onClick={handleCheckIn}
                  disabled={processing}
                  style={{
                    ...styles.checkInButton,
                    opacity: processing ? 0.6 : 1,
                  }}
                >
                  {processing
                    ? "Getting Location..."
                    : "📍 Check In"}
                </button>
              </div>
            ) : (
              <div>

                <div style={styles.todayGrid}>

                  <div style={styles.todayBox}>
                    <strong>Date</strong>
                    <p>
                      {formatDate(
                        todayAttendance.date
                      )}
                    </p>
                  </div>

                  <div style={styles.todayBox}>
                    <strong>Check In</strong>
                    <p>
                      {formatTime(
                        todayAttendance.checkIn
                      )}
                    </p>
                  </div>

                  <div style={styles.todayBox}>
                    <strong>Check Out</strong>
                    <p>
                      {formatTime(
                        todayAttendance.checkOut
                      )}
                    </p>
                  </div>

                  <div style={styles.todayBox}>
                    <strong>Status</strong>
                    <p
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {todayAttendance.status ||
                        "present"}
                    </p>
                  </div>

                </div>

                {!todayAttendance.checkOut ? (
                  <button
                    onClick={handleCheckOut}
                    disabled={processing}
                    style={{
                      ...styles.checkOutButton,
                      opacity: processing
                        ? 0.6
                        : 1,
                    }}
                  >
                    {processing
                      ? "Getting Location..."
                      : "📍 Check Out"}
                  </button>
                ) : (
                  <div style={styles.completed}>
                    ✓ Today's attendance is complete.
                  </div>
                )}

              </div>
            )}
          </div>
        )}

        {/* =========================================== */}
        {/* ATTENDANCE HISTORY */}
        {/* =========================================== */}

        <div style={styles.card}>

          <h2 style={styles.cardTitle}>
            Attendance History
          </h2>

          {attendance.length === 0 ? (
            <div style={styles.empty}>
              <h3>No Attendance Records</h3>

              <p>
                Your attendance records will appear here
                after you check in.
              </p>
            </div>
          ) : (
            <div style={styles.tableWrapper}>

              <table style={styles.table}>

                <thead>
                  <tr>
                    <th style={styles.th}>
                      Date
                    </th>

                    <th style={styles.th}>
                      Organization
                    </th>

                    <th style={styles.th}>
                      Position
                    </th>

                    <th style={styles.th}>
                      Check In
                    </th>

                    <th style={styles.th}>
                      Check Out
                    </th>

                    <th style={styles.th}>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {attendance.map((record) => (
                    <tr key={record._id}>

                      <td style={styles.td}>
                        {formatDate(record.date)}
                      </td>

                      <td style={styles.td}>
                        {record.internship
                          ?.organization || "—"}
                      </td>

                      <td style={styles.td}>
                        {record.internship
                          ?.position || "—"}
                      </td>

                      <td style={styles.td}>
                        {formatTime(
                          record.checkIn
                        )}
                      </td>

                      <td style={styles.td}>
                        {formatTime(
                          record.checkOut
                        )}
                      </td>

                      <td style={styles.td}>
                        <span
                          style={styles.status}
                        >
                          {record.status ||
                            "present"}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "#f8fafc",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  header: {
    marginBottom: "25px",
  },

  title: {
    margin: "0 0 8px 0",
    fontSize: "32px",
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    margin: 0,
    color: "#6b7280",
    fontSize: "16px",
  },

  card: {
    background: "#ffffff",
    borderRadius: "14px",
    padding: "25px",
    marginBottom: "25px",
    boxShadow:
      "0 3px 12px rgba(0, 0, 0, 0.08)",
  },

  cardTitle: {
    margin: "0 0 20px 0",
    fontSize: "22px",
    color: "#111827",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },

  todayGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  todayBox: {
    padding: "18px",
    background: "#f8fafc",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
  },

  checkInButton: {
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
  },

  checkOutButton: {
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    background: "#dc2626",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
  },

  success: {
    padding: "15px 20px",
    marginBottom: "20px",
    background: "#dcfce7",
    color: "#166534",
    border:
      "1px solid #86efac",
    borderRadius: "10px",
  },

  error: {
    padding: "15px 20px",
    marginBottom: "20px",
    background: "#fee2e2",
    color: "#991b1b",
    border:
      "1px solid #fca5a5",
    borderRadius: "10px",
  },

  warning: {
    background: "#fff7ed",
    border:
      "1px solid #fed7aa",
    color: "#9a3412",
    padding: "25px",
    borderRadius: "14px",
    marginBottom: "25px",
  },

  completed: {
    display: "inline-block",
    padding: "12px 18px",
    background: "#dcfce7",
    color: "#166534",
    borderRadius: "8px",
    fontWeight: "600",
  },

  muted: {
    color: "#6b7280",
  },

  empty: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#6b7280",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    padding: "14px",
    textAlign: "left",
    background: "#f3f4f6",
    borderBottom:
      "1px solid #d1d5db",
    whiteSpace: "nowrap",
  },

  td: {
    padding: "14px",
    borderBottom:
      "1px solid #e5e7eb",
    whiteSpace: "nowrap",
  },

  status: {
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: "20px",
    background: "#dcfce7",
    color: "#166534",
    fontWeight: "600",
    textTransform: "capitalize",
  },
};

export default Attendance;