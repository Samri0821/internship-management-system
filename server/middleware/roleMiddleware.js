
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Make sure the user has been authenticated first
    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    // Check whether the user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission to access this resource.",
      });
    }

    next();
  };
};

export default authorizeRoles;
