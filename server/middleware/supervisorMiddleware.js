
const supervisorOnly = (req, res, next) => {
  if (req.user && req.user.role === "supervisor") {
    next();
  } else {
    return res.status(403).json({
      message: "Access denied. Supervisor only."
    });
  }
};

export default supervisorOnly;
