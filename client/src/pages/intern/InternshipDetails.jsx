import { useNavigate, useParams } from "react-router-dom";

const InternshipDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Temporary data for UI.
  // We will connect this to the backend later.
  const internship = {
    id,
    organization: "ABC Technology Solutions",
    position: "Software Development Intern",
    department: "Information Technology",
    fieldOfStudy: "Information Technology",
    supervisor: "John Supervisor",
    startDate: "September 1, 2026",
    endDate: "December 1, 2026",
    description:
      "This internship provides practical experience in web application development, software engineering, database management and modern development technologies.",
    location: "Addis Ababa, Ethiopia",
  };

  const handleApply = () => {
    alert(
      "Application feature will be connected to the backend."
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Opportunities
        </button>

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

          {/* Header */}
          <div className="p-8 border-b">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>

                <p className="text-sm text-blue-600 font-semibold mb-2">
                  INTERNSHIP OPPORTUNITY
                </p>

                <h1 className="text-3xl font-bold text-gray-800">
                  {internship.position}
                </h1>

                <p className="text-lg text-gray-500 mt-2">
                  {internship.organization}
                </p>

              </div>

              <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                Upcoming
              </span>

            </div>

          </div>

          {/* Information */}
          <div className="p-8">

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Internship Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <Info
                title="Department"
                value={internship.department}
              />

              <Info
                title="Field of Study"
                value={internship.fieldOfStudy}
              />

              <Info
                title="Supervisor"
                value={internship.supervisor}
              />

              <Info
                title="Location"
                value={internship.location}
              />

              <Info
                title="Start Date"
                value={internship.startDate}
              />

              <Info
                title="End Date"
                value={internship.endDate}
              />

            </div>

            {/* Description */}
            <div className="mt-8">

              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Description
              </h2>

              <p className="text-gray-600 leading-7">
                {internship.description}
              </p>

            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-4">

              <button
                onClick={handleApply}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Apply for Internship
              </button>

              <button
                onClick={() =>
                  navigate("/intern/internships")
                }
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                View Other Opportunities
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

// ==========================================
// REUSABLE INFORMATION COMPONENT
// ==========================================
const Info = ({ title, value }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4">

      <p className="text-sm text-gray-500 mb-1">
        {title}
      </p>

      <p className="font-semibold text-gray-800">
        {value}
      </p>

    </div>
  );
};

export default InternshipDetails;