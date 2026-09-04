
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ==========================================
// HELPER: CREATE JWT
// ==========================================
const createToken = (user) => {
  return jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

// ==========================================
// REGISTER INTERN
// ==========================================
export const registerIntern = async (req, res) => {
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

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      university,
      fieldOfStudy,
      role: "intern",
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        university: user.university,
        fieldOfStudy: user.fieldOfStudy,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);

    return res.status(500).json({
      message: "Server error during registration",
    });
  }
};

// ==========================================
// REGISTER COMPANY
// ==========================================
export const registerCompany = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
    } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Company name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "company",
    });

    return res.status(201).json({
      message: "Company registered successfully",
      user: {
        id: company._id,
        name: company.name,
        email: company.email,
        role: company.role,
      },
    });
  } catch (error) {
    console.error("Company Registration Error:", error);

    return res.status(500).json({
      message: "Server error during company registration",
    });
  }
};

// ==========================================
// LOGIN
// ==========================================
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = createToken(user);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        university: user.university,
        fieldOfStudy: user.fieldOfStudy,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Server error during login",
    });
  }
};

// ==========================================
// CREATE ADMIN
// DEVELOPMENT ONLY
// ==========================================
export const createAdmin = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    return res.status(201).json({
      message: "Admin created successfully",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Create Admin Error:", error);

    return res.status(500).json({
      message: "Server error while creating admin",
    });
  }
};

// ==========================================
// CREATE SUPERVISOR
// DEVELOPMENT ONLY
// ==========================================
export const createSupervisor = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const supervisor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "supervisor",
    });

    return res.status(201).json({
      message: "Supervisor created successfully",
      user: {
        id: supervisor._id,
        name: supervisor.name,
        email: supervisor.email,
        role: supervisor.role,
      },
    });
  } catch (error) {
    console.error("Create Supervisor Error:", error);

    return res.status(500).json({
      message: "Server error while creating supervisor",
    });
  }
};

// ==========================================
// RESET PASSWORD
// DEVELOPMENT ONLY
// ==========================================
const resetPassword = async (req, res, expectedRole, roleName) => {
  try {
    let { email, newPassword } = req.body;

    email = email?.trim().toLowerCase();

    if (!email || !newPassword) {
      return res.status(400).json({
        message: "Email and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: `${roleName} not found`,
      });
    }

    if (user.role !== expectedRole) {
      return res.status(403).json({
        message: `This user is not a ${roleName.toLowerCase()}`,
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    return res.json({
      message: `${roleName} password changed successfully`,
    });
  } catch (error) {
    console.error(`${roleName} Password Reset Error:`, error);

    return res.status(500).json({
      message: `Server error while changing ${roleName.toLowerCase()} password`,
    });
  }
};

export const resetAdminPassword = (req, res) =>
  resetPassword(req, res, "admin", "Admin");

export const resetInternPassword = (req, res) =>
  resetPassword(req, res, "intern", "Intern");

export const resetSupervisorPassword = (req, res) =>
  resetPassword(req, res, "supervisor", "Supervisor");
