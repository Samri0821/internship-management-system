import Evaluation from "../models/Evaluation.js";
import Internship from "../models/Internship.js";
import User from "../models/User.js";

// ==========================================
// CREATE / SUBMIT EVALUATION
// ==========================================
export const createEvaluation = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "User authentication information is missing"
      });
    }

    // Only supervisors can evaluate
    if (req.user.role !== "supervisor") {
      return res.status(403).json({
        message: "Access denied. Supervisor only."
      });
    }

    const {
      intern,
      internship,
      technicalSkills,
      communication,
      teamwork,
      problemSolving,
      comments
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!intern || !internship) {
      return res.status(400).json({
        message: "Intern and internship are required"
      });
    }

    const scores = {
      technicalSkills: Number(technicalSkills),
      communication: Number(communication),
      teamwork: Number(teamwork),
      problemSolving: Number(problemSolving)
    };

    for (const [key, value] of Object.entries(scores)) {
      if (
        !Number.isFinite(value) ||
        value < 1 ||
        value > 5
      ) {
        return res.status(400).json({
          message: `${key} must be between 1 and 5`
        });
      }
    }

    // ==========================================
    // FIND INTERNSHIP
    // ==========================================

    const internshipData = await Internship.findById(
      internship
    );

    if (!internshipData) {
      return res.status(404).json({
        message: "Internship not found"
      });
    }

    // ==========================================
    // VERIFY SUPERVISOR
    // ==========================================

    if (
      !internshipData.supervisor ||
      internshipData.supervisor.toString() !==
        req.user.userId.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only evaluate interns assigned to you."
      });
    }

    // ==========================================
    // VERIFY INTERN
    // ==========================================

    if (
      !internshipData.intern ||
      internshipData.intern.toString() !==
        intern.toString()
    ) {
      return res.status(403).json({
        message:
          "This intern is not assigned to this internship."
      });
    }

    const internUser = await User.findById(intern);

    if (!internUser) {
      return res.status(404).json({
        message: "Intern not found"
      });
    }

    if (internUser.role !== "intern") {
      return res.status(400).json({
        message: "Selected user is not an intern"
      });
    }

    // ==========================================
    // CHECK EXISTING EVALUATION
    // ==========================================

    const existingEvaluation =
      await Evaluation.findOne({
        intern,
        supervisor: req.user.userId,
        internship
      });

    if (existingEvaluation) {
      return res.status(400).json({
        message:
          "This intern has already been evaluated for this internship.",
        evaluation: existingEvaluation
      });
    }

    // ==========================================
    // CALCULATE OVERALL SCORE
    // ==========================================

    const overallScore =
      (
        scores.technicalSkills +
        scores.communication +
        scores.teamwork +
        scores.problemSolving
      ) / 4;

    // Round to 2 decimal places
    const roundedOverall =
      Math.round(overallScore * 100) / 100;

    // ==========================================
    // CREATE EVALUATION
    // ==========================================

    const evaluation = await Evaluation.create({
      intern,
      supervisor: req.user.userId,
      internship,

      technicalSkills:
        scores.technicalSkills,

      communication:
        scores.communication,

      teamwork:
        scores.teamwork,

      problemSolving:
        scores.problemSolving,

      overallScore: roundedOverall,

      comments: comments
        ? comments.trim()
        : ""
    });

    // Populate response
    await evaluation.populate(
      "intern",
      "name email university fieldOfStudy"
    );

    await evaluation.populate(
      "supervisor",
      "name email"
    );

    await evaluation.populate(
      "internship",
      "organization department position startDate endDate status"
    );

    return res.status(201).json({
      message:
        "Evaluation submitted successfully",
      evaluation
    });
  } catch (error) {
    console.error(
      "Create Evaluation Error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while submitting evaluation",
      error: error.message
    });
  }
};


// ==========================================
// GET SUPERVISOR'S INTERNS FOR EVALUATION
// ==========================================
export const getSupervisorInternsForEvaluation =
  async (req, res) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          message:
            "User authentication information is missing"
        });
      }

      if (req.user.role !== "supervisor") {
        return res.status(403).json({
          message:
            "Access denied. Supervisor only."
        });
      }

      const internships =
        await Internship.find({
          supervisor: req.user.userId,
          intern: { $ne: null }
        })
          .populate(
            "intern",
            "name email university fieldOfStudy role"
          )
          .sort({
            createdAt: -1
          });

      const interns = internships
        .filter((item) => item.intern)
        .map((item) => ({
          intern: item.intern,

          internship: {
            _id: item._id,
            organization:
              item.organization,
            fieldOfStudy:
              item.fieldOfStudy,
            department:
              item.department,
            position:
              item.position,
            startDate:
              item.startDate,
            endDate:
              item.endDate,
            status:
              item.status
          }
        }));

      // Get existing evaluations
      const evaluations =
        await Evaluation.find({
          supervisor: req.user.userId
        }).select(
          "intern internship overallScore evaluationDate"
        );

      const result = interns.map((item) => {
        const evaluation =
          evaluations.find(
            (evaluation) =>
              evaluation.intern.toString() ===
                item.intern._id.toString() &&
              evaluation.internship.toString() ===
                item.internship._id.toString()
          );

        return {
          ...item,
          evaluated: !!evaluation,
          evaluation: evaluation || null
        };
      });

      return res.status(200).json({
        count: result.length,
        interns: result
      });
    } catch (error) {
      console.error(
        "Get Evaluation Interns Error:",
        error
      );

      return res.status(500).json({
        message:
          "Server error while getting interns for evaluation",
        error: error.message
      });
    }
  };


// ==========================================
// GET SUPERVISOR EVALUATIONS
// ==========================================
export const getSupervisorEvaluations =
  async (req, res) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          message:
            "User authentication information is missing"
        });
      }

      if (req.user.role !== "supervisor") {
        return res.status(403).json({
          message:
            "Access denied. Supervisor only."
        });
      }

      const evaluations =
        await Evaluation.find({
          supervisor: req.user.userId
        })
          .populate(
            "intern",
            "name email university fieldOfStudy"
          )
          .populate(
            "supervisor",
            "name email"
          )
          .populate(
            "internship",
            "organization department position startDate endDate status"
          )
          .sort({
            evaluationDate: -1
          });

      return res.status(200).json({
        count: evaluations.length,
        evaluations
      });
    } catch (error) {
      console.error(
        "Get Supervisor Evaluations Error:",
        error
      );

      return res.status(500).json({
        message:
          "Server error while getting evaluations",
        error: error.message
      });
    }
  };


// ==========================================
// GET INTERN EVALUATIONS
// ==========================================
export const getMyEvaluations = async (
  req,
  res
) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message:
          "User authentication information is missing"
      });
    }

    const evaluations =
      await Evaluation.find({
        intern: req.user.userId
      })
        .populate(
          "supervisor",
          "name email"
        )
        .populate(
          "internship",
          "organization department position startDate endDate status"
        )
        .sort({
          evaluationDate: -1
        });

    return res.status(200).json({
      count: evaluations.length,
      evaluations
    });
  } catch (error) {
    console.error(
      "Get My Evaluations Error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while getting your evaluations",
      error: error.message
    });
  }
};