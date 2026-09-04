import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Application.css";

function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedInternship, setSelectedInternship] =
    useState(null);

  const [motivation, setMotivation] = useState("");
  const [applying, setApplying] = useState(false);
  const [success, setSuccess] = useState("");

  // Get logged-in user
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = user?.role;

  // ==========================================
  // GET INTERNSHIPS
  // ==========================================
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        setError("");

        let response;

        // INTERN
        if (role === "intern") {
          response = await api.get(
            "/internships/available"
          );
        }

        // SUPERVISOR
        else if (role === "supervisor") {
          response = await api.get(
            "/supervisor/my-internships"
          );
        }

        // UNKNOWN ROLE
        else {
          setError(
            "You do not have permission to view internships."
          );

          setLoading(false);
          return;
        }

        console.log(
          "Internship response:",
          response.data
        );

        setInternships(
          response.data.internships || []
        );

      } catch (error) {
        console.error(
          "Get Internships Error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load internships."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [role]);

  // ==========================================
  // OPEN APPLICATION FORM
  // ==========================================
  const handleApply = (internship) => {
    setSelectedInternship(internship);
    setMotivation("");
    setSuccess("");
    setError("");
  };

  // ==========================================
  // SUBMIT APPLICATION
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!motivation.trim()) {
      setError("Please enter your motivation.");
      return;
    }

    if (!selectedInternship?._id) {
      setError("Invalid internship selected.");
      return;
    }

    try {
      setApplying(true);
      setError("");
      setSuccess("");

      const response = await api.post(
        "/applications",
        {
          internshipId: selectedInternship._id,
          motivation: motivation.trim(),
        }
      );

      console.log(
        "Application response:",
        response.data
      );

      setSuccess(
        "Your internship application has been submitted successfully!"
      );

      // Remove applied internship from list
      setInternships((current) =>
        current.filter(
          (item) =>
            item._id !== selectedInternship._id
        )
      );

      setSelectedInternship(null);
      setMotivation("");

    } catch (error) {
      console.error(
        "Application Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to submit application."
      );
    } finally {
      setApplying(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h1>Internship Opportunities</h1>
        <p>Loading internships...</p>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================
  return (
    <div style={{ padding: "30px" }}>

      {/* HEADER */}
      <div style={{ marginBottom: "30px" }}>

        {role === "intern" ? (
          <>
            <h1>Internship Opportunities</h1>

            <p>
              Browse available internships and apply
              for the opportunity that matches your
              field of study.
            </p>
          </>
        ) : (
          <>
            <h1>My Internships</h1>

            <p>
              View the internship opportunities assigned
              to you.
            </p>
          </>
        )}

      </div>

      {/* SUCCESS */}
      {success && (
        <div
          style={{
            padding: "15px",
            marginBottom: "20px",
            background: "#d4edda",
            color: "#155724",
            borderRadius: "8px",
          }}
        >
          {success}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div
          style={{
            padding: "15px",
            marginBottom: "20px",
            background: "#f8d7da",
            color: "#721c24",
            borderRadius: "8px",
          }}
        >
          {error}
        </div>
      )}

      {/* NO INTERNSHIPS */}
      {internships.length === 0 ? (
        <div
          style={{
            padding: "40px",
            background: "#fff",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          {role === "intern" ? (
            <>
              <h2>
                No internship opportunities available
              </h2>

              <p>
                There are currently no internship
                opportunities matching your field of study.
              </p>
            </>
          ) : (
            <>
              <h2>No internships assigned</h2>

              <p>
                You currently do not have any internships
                assigned to you.
              </p>
            </>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {internships.map((internship) => (
            <div
              key={internship._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                background: "#fff",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >

              <h2>
                {internship.position}
              </h2>

              <p>
                <strong>Organization:</strong>{" "}
                {internship.organization}
              </p>

              <p>
                <strong>Field:</strong>{" "}
                {internship.fieldOfStudy}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {internship.department}
              </p>

              <p>
                <strong>Supervisor:</strong>{" "}
                {internship.supervisor?.name ||
                  "Not assigned"}
              </p>

              {role === "supervisor" && (
                <p>
                  <strong>Intern:</strong>{" "}
                  {internship.intern?.name ||
                    "Not assigned"}
                </p>
              )}

              {role === "supervisor" &&
                internship.intern?.email && (
                  <p>
                    <strong>Intern Email:</strong>{" "}
                    {internship.intern.email}
                  </p>
                )}

              <p>
                <strong>Start:</strong>{" "}
                {internship.startDate
                  ? new Date(
                      internship.startDate
                    ).toLocaleDateString()
                  : "Not specified"}
              </p>

              <p>
                <strong>End:</strong>{" "}
                {internship.endDate
                  ? new Date(
                      internship.endDate
                    ).toLocaleDateString()
                  : "Not specified"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {internship.status}
              </p>

              {internship.description && (
                <p>
                  {internship.description}
                </p>
              )}

              {/* APPLY BUTTON */}
              {role === "intern" && (
                <button
                  onClick={() =>
                    handleApply(internship)
                  }
                  disabled={
                    internship.status !== "upcoming"
                  }
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  Apply Now
                </button>
              )}

            </div>
          ))}
        </div>
      )}

      {/* APPLICATION MODAL */}
      {selectedInternship &&
        role === "intern" && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >

            <div
              style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "12px",
                width: "100%",
                maxWidth: "550px",
              }}
            >

              <h2>
                Apply for{" "}
                {selectedInternship.position}
              </h2>

              <p>
                <strong>
                  {selectedInternship.organization}
                </strong>
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {selectedInternship.department}
              </p>

              <form onSubmit={handleSubmit}>

                <div
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <label>
                    Why are you interested in this
                    internship?
                  </label>

                  <textarea
                    value={motivation}
                    onChange={(e) =>
                      setMotivation(e.target.value)
                    }
                    placeholder="Write your motivation..."
                    rows="6"
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      padding: "10px",
                      borderRadius: "6px",
                      border:
                        "1px solid #ccc",
                    }}
                    required
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >

                  <button
                    type="submit"
                    disabled={applying}
                  >
                    {applying
                      ? "Submitting..."
                      : "Submit Application"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedInternship(null);
                      setError("");
                    }}
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>
          </div>
        )}

    </div>
  );
}

export default Internships;