import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Application.css";

function Applications() {

  const [user, setUser] = useState(null);

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==========================================
  // GET LOGGED-IN USER
  // ==========================================

  useEffect(() => {

    try {

      const savedUser =
        JSON.parse(localStorage.getItem("user"));

      setUser(savedUser);

    } catch (error) {

      console.error(
        "User data error:",
        error
      );

    }

  }, []);


  // ==========================================
  // GET APPLICATIONS
  // ==========================================

  useEffect(() => {

    const fetchApplications = async () => {

      try {

        setLoading(true);
        setError("");

        const savedUser =
          JSON.parse(localStorage.getItem("user"));

        // ======================================
        // INTERN
        // ======================================

        if (savedUser?.role === "intern") {

          const response =
            await api.get("/applications/my");

          console.log(
            "My applications:",
            response.data
          );

          setApplications(
            response.data.applications || []
          );

        }

        // ======================================
        // SUPERVISOR
        // ======================================

        else if (savedUser?.role === "supervisor") {

          const response =
            await api.get(
              "/supervisor/my-applications"
            );

          console.log(
            "Supervisor applications:",
            response.data
          );

          setApplications(
            response.data.applications || []
          );

        }

        else {

          setError(
            "You do not have permission to view applications."
          );

        }

      } catch (error) {

        console.error(
          "Get Applications Error:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Unable to load applications."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchApplications();

  }, []);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div
        style={{
          padding: "30px"
        }}
      >

        <h1>
          Applications
        </h1>

        <p>
          Loading applications...
        </p>

      </div>

    );

  }


  return (

    <div
      style={{
        padding: "30px"
      }}
    >

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div
        style={{
          marginBottom: "30px"
        }}
      >

        <h1>

          {user?.role === "supervisor"
            ? "Intern Applications"
            : "My Applications"}

        </h1>


        <p>

          {user?.role === "supervisor"
            ? "Review applications submitted by interns for your internship opportunities."
            : "View and track your internship applications."}

        </p>

      </div>


      {/* ======================================
          ERROR
      ====================================== */}

      {error && (

        <div
          style={{
            padding: "15px",
            marginBottom: "20px",
            background: "#f8d7da",
            color: "#721c24",
            borderRadius: "8px"
          }}
        >

          {error}

        </div>

      )}


      {/* ======================================
          NO APPLICATIONS
      ====================================== */}

      {applications.length === 0 ? (

        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >

          <h2>
            No Applications
          </h2>

          <p>

            {user?.role === "supervisor"
              ? "There are no applications for your internships yet."
              : "You have not submitted any internship applications yet."}

          </p>

        </div>

      ) : (

        /* ====================================
           APPLICATION LIST
        ==================================== */

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px"
          }}
        >

          {applications.map((application) => (

            <div
              key={application._id}
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "12px",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.08)"
              }}
            >

              {/* =================================
                  SUPERVISOR VIEW
              ================================= */}

              {user?.role === "supervisor" && (

                <>

                  <h2>
                    {application.applicant?.name ||
                      "Unknown Intern"}
                  </h2>

                  <p>
                    <strong>
                      Email:
                    </strong>{" "}

                    {application.applicant?.email ||
                      "-"}
                  </p>

                  <p>
                    <strong>
                      University:
                    </strong>{" "}

                    {application.applicant?.university ||
                      "-"}
                  </p>

                  <p>
                    <strong>
                      Field:
                    </strong>{" "}

                    {application.applicant?.fieldOfStudy ||
                      "-"}
                  </p>

                  <hr />

                </>

              )}


              {/* =================================
                  INTERNSHIP INFORMATION
              ================================= */}

              <h3>
                {application.internship?.position ||
                  "Internship"}
              </h3>

              <p>

                <strong>
                  Organization:
                </strong>{" "}

                {application.internship?.organization ||
                  "-"}

              </p>


              <p>

                <strong>
                  Department:
                </strong>{" "}

                {application.internship?.department ||
                  "-"}

              </p>


              {/* =================================
                  MOTIVATION
              ================================= */}

              <div
                style={{
                  marginTop: "20px"
                }}
              >

                <strong>
                  Motivation:
                </strong>

                <p
                  style={{
                    marginTop: "8px",
                    lineHeight: "1.6"
                  }}
                >

                  {application.motivation ||
                    "No motivation provided."}

                </p>

              </div>


              {/* =================================
                  STATUS
              ================================= */}

              <div
                style={{
                  marginTop: "20px"
                }}
              >

                <strong>
                  Status:
                </strong>

                <span
                  style={{
                    marginLeft: "10px",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    background:
                      "#eee",
                    textTransform:
                      "capitalize"
                  }}
                >

                  {application.status ||
                    "pending"}

                </span>

              </div>


              {/* =================================
                  DATE
              ================================= */}

              <p
                style={{
                  marginTop: "15px",
                  color: "#666"
                }}
              >

                <strong>
                  Applied:
                </strong>{" "}

                {application.createdAt
                  ? new Date(
                      application.createdAt
                    ).toLocaleDateString()
                  : "-"}

              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Applications;