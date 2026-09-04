import DailyReport from "../models/DailyReport.js";
import Internship from "../models/Internship.js";

// ==========================================
// SUBMIT DAILY REPORT
// ==========================================
export const createDailyReport = async (req, res) => {
  try {
    const {
      internship,
      date,
      title,
      activities,
      challenges,
      achievements,
      hoursWorked
    } = req.body;

    // Check authentication
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "User authentication information is missing"
      });
    }

    // Check required fields
    if (!internship || !date || !title || !activities) {
      return res.status(400).json({
        message:
          "Internship, date, title and activities are required"
      });
    }

    // Find internship
    const internshipData = await Internship.findById(internship);

    if (!internshipData) {
      return res.status(404).json({
        message: "Internship not found"
      });
    }

    // Make sure logged-in intern belongs to internship
    if (
      !internshipData.intern ||
      internshipData.intern.toString() !==
        req.user.userId.toString()
    ) {
      return res.status(403).json({
        message: "You are not assigned to this internship"
      });
    }

    // Check if report already exists for this date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingReport = await DailyReport.findOne({
      intern: req.user.userId,
      internship,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (existingReport) {
      return res.status(400).json({
        message: "A daily report already exists for this date",
        report: existingReport
      });
    }

    // Create report
    const report = await DailyReport.create({
      intern: req.user.userId,
      internship,
      date: new Date(date),
      title: title.trim(),
      activities: activities.trim(),
      challenges: challenges ? challenges.trim() : "",
      achievements: achievements
        ? achievements.trim()
        : "",
      hoursWorked: Number(hoursWorked) || 0,
      status: "submitted"
    });

    return res.status(201).json({
      message: "Daily report submitted successfully",
      report
    });

  } catch (error) {
    console.error(
      "Create Daily Report Error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while submitting daily report",
      error: error.message
    });
  }
};


// ==========================================
// GET MY DAILY REPORTS
// ==========================================
export const getMyDailyReports = async (req, res) => {
  try {
    // Check authentication
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "User authentication information is missing"
      });
    }

    const reports = await DailyReport.find({
      intern: req.user.userId
    })
      .populate(
        "intern",
        "name email university fieldOfStudy"
      )
      .populate(
        "internship",
        "organization department position startDate endDate status"
      )
      .sort({
        date: -1,
        createdAt: -1
      });

    return res.status(200).json({
      count: reports.length,
      reports
    });

  } catch (error) {
    console.error(
      "Get Daily Reports Error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while getting daily reports",
      error: error.message
    });
  }
};


// ==========================================
// GET DAILY REPORTS FOR SUPERVISOR
// ==========================================
export const getSupervisorDailyReports = async (
  req,
  res
) => {
  try {
    // Check authentication
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "User authentication information is missing"
      });
    }

    // Only supervisors can use this endpoint
    if (req.user.role !== "supervisor") {
      return res.status(403).json({
        message: "Access denied. Supervisor only."
      });
    }

    // Find internships assigned to this supervisor
    const internships = await Internship.find({
      supervisor: req.user.userId
    }).select("_id");

    const internshipIds = internships.map(
      (internship) => internship._id
    );

    // If supervisor has no internships
    if (internshipIds.length === 0) {
      return res.status(200).json({
        count: 0,
        reports: []
      });
    }

    // Find reports from assigned interns
    const reports = await DailyReport.find({
      internship: {
        $in: internshipIds
      }
    })
      .populate(
        "intern",
        "name email university fieldOfStudy role"
      )
      .populate(
        "internship",
        "organization department position startDate endDate status"
      )
      .sort({
        date: -1,
        createdAt: -1
      });

    return res.status(200).json({
      count: reports.length,
      reports
    });

  } catch (error) {
    console.error(
      "Get Supervisor Daily Reports Error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while getting supervisor reports",
      error: error.message
    });
  }
};


// ==========================================
// GET SINGLE DAILY REPORT
// ==========================================
export const getDailyReportById = async (
  req,
  res
) => {
  try {
    // Check authentication
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "User authentication information is missing"
      });
    }

    const report = await DailyReport.findById(
      req.params.id
    );

    if (!report) {
      return res.status(404).json({
        message: "Daily report not found"
      });
    }

    // Intern can only view their own report
    if (
      req.user.role === "intern" &&
      report.intern.toString() !==
        req.user.userId.toString()
    ) {
      return res.status(403).json({
        message:
          "Access denied. This report does not belong to you."
      });
    }

    // Supervisor can only view reports
    // belonging to their assigned internships
    if (req.user.role === "supervisor") {
      const internship = await Internship.findById(
        report.internship
      );

      if (!internship) {
        return res.status(404).json({
          message:
            "Internship associated with this report not found"
        });
      }

      if (
        !internship.supervisor ||
        internship.supervisor.toString() !==
          req.user.userId.toString()
      ) {
        return res.status(403).json({
          message:
            "Access denied. You can only view reports from your assigned interns."
        });
      }
    }

    // Populate information
    await report.populate(
      "intern",
      "name email university fieldOfStudy"
    );

    await report.populate(
      "internship",
      "organization department position startDate endDate status"
    );

    return res.status(200).json({
      report
    });

  } catch (error) {
    console.error(
      "Get Daily Report Error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while getting daily report",
      error: error.message
    });
  }
};


// ==========================================
// UPDATE DAILY REPORT
// ==========================================
export const updateDailyReport = async (
  req,
  res
) => {
  try {
    // Check authentication
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "User authentication information is missing"
      });
    }

    const report = await DailyReport.findById(
      req.params.id
    );

    if (!report) {
      return res.status(404).json({
        message: "Daily report not found"
      });
    }

    // Only the intern who created the report
    // can update it
    if (
      report.intern.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only update your own report"
      });
    }

    // Reviewed reports cannot be edited
    if (report.status === "reviewed") {
      return res.status(400).json({
        message:
          "Reviewed reports cannot be edited"
      });
    }

    const {
      title,
      activities,
      challenges,
      achievements,
      hoursWorked
    } = req.body;

    if (title !== undefined) {
      report.title = title.trim();
    }

    if (activities !== undefined) {
      report.activities = activities.trim();
    }

    if (challenges !== undefined) {
      report.challenges = challenges.trim();
    }

    if (achievements !== undefined) {
      report.achievements =
        achievements.trim();
    }

    if (hoursWorked !== undefined) {
      report.hoursWorked =
        Number(hoursWorked) || 0;
    }

    await report.save();

    return res.status(200).json({
      message:
        "Daily report updated successfully",
      report
    });

  } catch (error) {
    console.error(
      "Update Daily Report Error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while updating daily report",
      error: error.message
    });
  }
};


// ==========================================
// DELETE DAILY REPORT
// ==========================================
export const deleteDailyReport = async (
  req,
  res
) => {
  try {
    // Check authentication
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "User authentication information is missing"
      });
    }

    const report = await DailyReport.findById(
      req.params.id
    );

    if (!report) {
      return res.status(404).json({
        message: "Daily report not found"
      });
    }

    // Only the owner can delete it
    if (
      report.intern.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only delete your own report"
      });
    }

    // Reviewed reports cannot be deleted
    if (report.status === "reviewed") {
      return res.status(400).json({
        message:
          "Reviewed reports cannot be deleted"
      });
    }

    await report.deleteOne();

    return res.status(200).json({
      message:
        "Daily report deleted successfully"
    });

  } catch (error) {
    console.error(
      "Delete Daily Report Error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while deleting daily report",
      error: error.message
    });
  }
};


// ==========================================
// REVIEW DAILY REPORT
// ==========================================
export const reviewDailyReport = async (
  req,
  res
) => {
  try {
    const { supervisorComment } = req.body;

    // Check authentication
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "User authentication information is missing"
      });
    }

    // Only supervisors and admins can review
    if (
      req.user.role !== "supervisor" &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message:
          "Access denied. Supervisor or Admin only."
      });
    }

    // Validate comment
    if (
      !supervisorComment ||
      !supervisorComment.trim()
    ) {
      return res.status(400).json({
        message:
          "Supervisor comment is required"
      });
    }

    // Find report
    const report = await DailyReport.findById(
      req.params.id
    );

    if (!report) {
      return res.status(404).json({
        message: "Daily report not found"
      });
    }

    // ==========================================
    // SUPERVISOR AUTHORIZATION
    // ==========================================
    if (req.user.role === "supervisor") {
      const internship = await Internship.findById(
        report.internship
      );

      if (!internship) {
        return res.status(404).json({
          message:
            "Internship associated with this report not found"
        });
      }

      // Make sure this supervisor owns
      // the internship
      if (
        !internship.supervisor ||
        internship.supervisor.toString() !==
          req.user.userId.toString()
      ) {
        return res.status(403).json({
          message:
            "Access denied. You can only review reports from your assigned interns."
        });
      }
    }

    // Save supervisor feedback
    report.supervisorComment =
      supervisorComment.trim();

    report.status = "reviewed";

    await report.save();

    // Populate response
    await report.populate(
      "intern",
      "name email university fieldOfStudy"
    );

    await report.populate(
      "internship",
      "organization department position startDate endDate status"
    );

    return res.status(200).json({
      message:
        "Daily report reviewed successfully",
      report
    });

  } catch (error) {
    console.error(
      "Review Daily Report Error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while reviewing daily report",
      error: error.message
    });
  }
};