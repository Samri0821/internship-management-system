
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// ==========================================
// GET CURRENT USER
// ==========================================
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password -github.accessToken");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user,
    });
  } catch (error) {
    console.error("Get current user error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ==========================================
// GET ALL INTERNS
// ADMIN ONLY
// ==========================================
router.get("/interns", protect, adminOnly, async (req, res) => {
  try {
    const interns = await User.find({ role: "intern" })
      .select("-password -github.accessToken")
      .sort({ createdAt: -1 });

    res.json({
      count: interns.length,
      interns,
    });
  } catch (error) {
    console.error("Get interns error:", error);

    res.status(500).json({
      message: "Server error while fetching interns",
    });
  }
});

// ==========================================
// CREATE INTERN
// ADMIN ONLY
// ==========================================
router.post("/interns", protect, adminOnly, async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      university,
      fieldOfStudy,
    } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();
    university = university?.trim();
    fieldOfStudy = fieldOfStudy?.trim();

    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !university ||
      !fieldOfStudy
    ) {
      return res.status(400).json({
        message:
          "Name, email, password, university and field of study are required",
      });
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check existing email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "An account with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create intern
    const intern = await User.create({
      name,
      email,
      password: hashedPassword,
      university,
      fieldOfStudy,
      role: "intern",
    });

    res.status(201).json({
      message: "Intern created successfully",
      intern: {
        _id: intern._id,
        name: intern.name,
        email: intern.email,
        university: intern.university,
        fieldOfStudy: intern.fieldOfStudy,
        role: intern.role,
        createdAt: intern.createdAt,
      },
    });
  } catch (error) {
    console.error("Create intern error:", error);

    res.status(500).json({
      message: "Server error while creating intern",
    });
  }
});

// ==========================================
// UPDATE INTERN
// ADMIN ONLY
// ==========================================
router.put("/interns/:id", protect, adminOnly, async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      university,
      fieldOfStudy,
    } = req.body;

    const intern = await User.findOne({
      _id: req.params.id,
      role: "intern",
    });

    if (!intern) {
      return res.status(404).json({
        message: "Intern not found",
      });
    }

    // Update basic information
    if (name !== undefined) {
      intern.name = name.trim();
    }

    if (email !== undefined) {
      const normalizedEmail = email.trim().toLowerCase();

      const emailExists = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: intern._id },
      });

      if (emailExists) {
        return res.status(400).json({
          message: "Another account already uses this email",
        });
      }

      intern.email = normalizedEmail;
    }

    if (university !== undefined) {
      intern.university = university.trim();
    }

    if (fieldOfStudy !== undefined) {
      intern.fieldOfStudy = fieldOfStudy.trim();
    }

    // Change password only if provided
    if (password && password.trim() !== "") {
      if (password.length < 6) {
        return res.status(400).json({
          message: "Password must be at least 6 characters",
        });
      }

      intern.password = await bcrypt.hash(password, 10);
    }

    await intern.save();

    res.json({
      message: "Intern updated successfully",
      intern: {
        _id: intern._id,
        name: intern.name,
        email: intern.email,
        university: intern.university,
        fieldOfStudy: intern.fieldOfStudy,
        role: intern.role,
        createdAt: intern.createdAt,
      },
    });
  } catch (error) {
    console.error("Update intern error:", error);

    res.status(500).json({
      message: "Server error while updating intern",
    });
  }
});

// ==========================================
// DELETE INTERN
// ADMIN ONLY
// ==========================================
router.delete("/interns/:id", protect, adminOnly, async (req, res) => {
  try {
    const intern = await User.findOneAndDelete({
      _id: req.params.id,
      role: "intern",
    });

    if (!intern) {
      return res.status(404).json({
        message: "Intern not found",
      });
    }

    res.json({
      message: "Intern deleted successfully",
    });
  } catch (error) {
    console.error("Delete intern error:", error);

    res.status(500).json({
      message: "Server error while deleting intern",
    });
  }
});

// ==========================================
// GET ALL SUPERVISORS
// ADMIN ONLY
// ==========================================
router.get("/supervisors", protect, adminOnly, async (req, res) => {
  try {
    const supervisors = await User.find({
      role: "supervisor",
    })
      .select("-password -github.accessToken")
      .sort({ createdAt: -1 });

    res.json({
      count: supervisors.length,
      supervisors,
    });
  } catch (error) {
    console.error("Get supervisors error:", error);

    res.status(500).json({
      message: "Server error while fetching supervisors",
    });
  }
});


// ==========================================
// CREATE SUPERVISOR
// ADMIN ONLY
// ==========================================
router.post("/supervisors", protect, adminOnly, async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      organization,
      department,
    } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();
    organization = organization?.trim() || "";
    department = department?.trim() || "";

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "An account with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create supervisor
    const supervisor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "supervisor",
      organization,
      department,
    });

    res.status(201).json({
      message: "Supervisor created successfully",

      supervisor: {
        _id: supervisor._id,
        name: supervisor.name,
        email: supervisor.email,
        organization: supervisor.organization,
        department: supervisor.department,
        role: supervisor.role,
        createdAt: supervisor.createdAt,
      },
    });
  } catch (error) {
    console.error("Create supervisor error:", error);

    res.status(500).json({
      message: "Server error while creating supervisor",
    });
  }
});


// ==========================================
// UPDATE SUPERVISOR
// ADMIN ONLY
// ==========================================
router.put(
  "/supervisors/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        organization,
        department,
      } = req.body;

      const supervisor = await User.findOne({
        _id: req.params.id,
        role: "supervisor",
      });

      if (!supervisor) {
        return res.status(404).json({
          message: "Supervisor not found",
        });
      }

      // Update name
      if (name !== undefined) {
        supervisor.name = name.trim();
      }

      // Update email
      if (email !== undefined) {
        const normalizedEmail = email.trim().toLowerCase();

        const emailExists = await User.findOne({
          email: normalizedEmail,
          _id: { $ne: supervisor._id },
        });

        if (emailExists) {
          return res.status(400).json({
            message:
              "Another account already uses this email",
          });
        }

        supervisor.email = normalizedEmail;
      }

      // Update organization
      if (organization !== undefined) {
        supervisor.organization = organization.trim();
      }

      // Update department
      if (department !== undefined) {
        supervisor.department = department.trim();
      }

      // Update password only when provided
      if (password && password.trim() !== "") {
        if (password.length < 6) {
          return res.status(400).json({
            message: "Password must be at least 6 characters",
          });
        }

        supervisor.password = await bcrypt.hash(
          password,
          10
        );
      }

      await supervisor.save();

      res.json({
        message: "Supervisor updated successfully",

        supervisor: {
          _id: supervisor._id,
          name: supervisor.name,
          email: supervisor.email,
          organization: supervisor.organization,
          department: supervisor.department,
          role: supervisor.role,
          createdAt: supervisor.createdAt,
        },
      });
    } catch (error) {
      console.error("Update supervisor error:", error);

      res.status(500).json({
        message: "Server error while updating supervisor",
      });
    }
  }
);


// ==========================================
// DELETE SUPERVISOR
// ADMIN ONLY
// ==========================================
router.delete(
  "/supervisors/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const supervisor = await User.findOneAndDelete({
        _id: req.params.id,
        role: "supervisor",
      });

      if (!supervisor) {
        return res.status(404).json({
          message: "Supervisor not found",
        });
      }

      res.json({
        message: "Supervisor deleted successfully",
      });
    } catch (error) {
      console.error("Delete supervisor error:", error);

      res.status(500).json({
        message: "Server error while deleting supervisor",
      });
    }
  }
);
export default router;
