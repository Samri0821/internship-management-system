import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  // ==========================================
  // GET JWT TOKEN
  // ==========================================
  const token = localStorage.getItem("token");

  // ==========================================
  // GET LOGGED-IN USER
  // ==========================================
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch (error) {
    console.error("Invalid user data in localStorage");
  }

  // ==========================================
  // NO TOKEN
  // ==========================================
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ==========================================
  // ROLE PROTECTION
  // ==========================================
  if (
    allowedRoles &&
    (!user || !allowedRoles.includes(user.role))
  ) {
    // Redirect based on actual role
    if (user?.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    if (user?.role === "supervisor") {
      return <Navigate to="/supervisor" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;

