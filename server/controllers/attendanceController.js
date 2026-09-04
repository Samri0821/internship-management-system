
import Attendance from "../models/Attendance.js";
import Internship from "../models/Internship.js";


// ==========================================
// CALCULATE DISTANCE BETWEEN TWO GPS POINTS
// ==========================================
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371000; // meters

  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;

  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) ** 2;

  const c =
    2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadius * c;
};


// ==========================================
// GPS CHECK-IN
// INTERN
// ==========================================
export const checkIn = async (req, res) => {
  try {

    const {
      internship,
      latitude,
      longitude
    } = req.body;


    // --------------------------------------
    // Validate request
    // --------------------------------------
    if (
      !internship ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        message:
          "Internship, latitude and longitude are required"
      });
    }


    // --------------------------------------
    // Validate authenticated user
    // --------------------------------------
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message:
          "User authentication information is missing"
      });
    }


    // --------------------------------------
    // Validate GPS values
    // --------------------------------------
    const userLatitude = Number(latitude);
    const userLongitude = Number(longitude);

    if (
      Number.isNaN(userLatitude) ||
      Number.isNaN(userLongitude)
    ) {
      return res.status(400).json({
        message:
          "Latitude and longitude must be valid numbers"
      });
    }


    // --------------------------------------
    // Find internship
    // --------------------------------------
    const internshipData =
      await Internship.findById(internship);

    if (!internshipData) {
      return res.status(404).json({
        message: "Internship not found"
      });
    }
    // ==========================================
// CHECK INTERNSHIP DATES
// ==========================================
const now = new Date();

if (now < internshipData.startDate) {
  return res.status(400).json({
    message: "Attendance cannot be recorded before the internship starts",
    startDate: internshipData.startDate
  });
}

if (now > internshipData.endDate) {
  return res.status(400).json({
    message: "Attendance cannot be recorded after the internship ends",
    endDate: internshipData.endDate
  });
}


    // --------------------------------------
    // Make sure intern is assigned
    // --------------------------------------
    if (
      !internshipData.intern ||
      internshipData.intern.toString() !==
        req.user.userId.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not assigned to this internship"
      });
    }


    // --------------------------------------
    // Check internship status
    // --------------------------------------
    if (
      internshipData.status !== "active" &&
      internshipData.status !== "upcoming"
    ) {
      return res.status(400).json({
        message:
          "Attendance is not available for this internship"
      });
    }


    // --------------------------------------
    // Check GPS configuration
    // --------------------------------------
    if (
      internshipData.latitude === undefined ||
      internshipData.longitude === undefined
    ) {
      return res.status(400).json({
        message:
          "GPS location is not configured for this internship"
      });
    }


    // --------------------------------------
    // Calculate distance
    // --------------------------------------
    const distance = calculateDistance(
      userLatitude,
      userLongitude,
      internshipData.latitude,
      internshipData.longitude
    );

    const allowedRadius =
      internshipData.allowedRadius || 200;


    console.log("================================");
    console.log("GPS CHECK-IN");
    console.log("Intern:", req.user.userId);
    console.log("Internship:", internship);
    console.log("User latitude:", userLatitude);
    console.log("User longitude:", userLongitude);
    console.log(
      "Workplace latitude:",
      internshipData.latitude
    );
    console.log(
      "Workplace longitude:",
      internshipData.longitude
    );
    console.log(
      "Distance:",
      Math.round(distance),
      "meters"
    );
    console.log(
      "Allowed radius:",
      allowedRadius,
      "meters"
    );
    console.log("================================");


    // --------------------------------------
    // Check GPS radius
    // --------------------------------------
    if (distance > allowedRadius) {
      return res.status(403).json({
        message:
          "You are outside the allowed attendance location",
        distance: Math.round(distance),
        allowedRadius
      });
    }


    // --------------------------------------
    // Get today's date range
    // --------------------------------------
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);


    // --------------------------------------
    // Check existing attendance
    // --------------------------------------
    const existingAttendance =
      await Attendance.findOne({
        intern: req.user.userId,
        internship: internship,
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      });


    if (existingAttendance) {
      return res.status(400).json({
        message:
          "You have already checked in today",
        attendance: existingAttendance
      });
    }


    // --------------------------------------
    // Create attendance
    // --------------------------------------
    const attendance =
      await Attendance.create({
        intern: req.user.userId,
        internship: internship,
        date: new Date(),
        status: "present",
        checkIn: new Date().toISOString()
      });


    return res.status(201).json({
      message:
        "GPS attendance recorded successfully",

      attendance: {
        id: attendance._id,
        intern: attendance.intern,
        internship: attendance.internship,
        date: attendance.date,
        status: attendance.status,
        checkIn: attendance.checkIn,
        distanceFromWorkplace:
          Math.round(distance)
      }
    });


  } catch (error) {

    console.error(
      "GPS Check-In Error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error during GPS check-in",
      error: error.message
    });
  }
};


// ==========================================
// GPS CHECK-OUT
// INTERN
// ==========================================
export const checkOut = async (req, res) => {
  try {

    const {
      internship,
      latitude,
      longitude
    } = req.body;


    // --------------------------------------
    // Validate request
    // --------------------------------------
    if (
      !internship ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        message:
          "Internship, latitude and longitude are required"
      });
    }


    // --------------------------------------
    // Validate authenticated user
    // --------------------------------------
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message:
          "User authentication information is missing"
      });
    }


    // --------------------------------------
    // Validate GPS values
    // --------------------------------------
    const userLatitude = Number(latitude);
    const userLongitude = Number(longitude);

    if (
      Number.isNaN(userLatitude) ||
      Number.isNaN(userLongitude)
    ) {
      return res.status(400).json({
        message:
          "Latitude and longitude must be valid numbers"
      });
    }


    // --------------------------------------
    // Find internship
    // --------------------------------------
    const internshipData =
      await Internship.findById(internship);

    if (!internshipData) {
      return res.status(404).json({
        message: "Internship not found"
      });
    }
// ==========================================
// CHECK INTERNSHIP DATES
// ==========================================
const now = new Date();

if (now < internshipData.startDate) {
  return res.status(400).json({
    message: "Attendance cannot be recorded before the internship starts",
    startDate: internshipData.startDate
  });
}

if (now > internshipData.endDate) {
  return res.status(400).json({
    message: "Attendance cannot be recorded after the internship ends",
    endDate: internshipData.endDate
  });
}

    // --------------------------------------
    // Make sure intern is assigned
    // --------------------------------------
    if (
      !internshipData.intern ||
      internshipData.intern.toString() !==
        req.user.userId.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not assigned to this internship"
      });
    }


    // --------------------------------------
    // Check GPS configuration
    // --------------------------------------
    if (
      internshipData.latitude === undefined ||
      internshipData.longitude === undefined
    ) {
      return res.status(400).json({
        message:
          "GPS location is not configured for this internship"
      });
    }


    // --------------------------------------
    // Calculate distance
    // --------------------------------------
    const distance = calculateDistance(
      userLatitude,
      userLongitude,
      internshipData.latitude,
      internshipData.longitude
    );

    const allowedRadius =
      internshipData.allowedRadius || 200;


    console.log("================================");
    console.log("GPS CHECK-OUT");
    console.log("Intern:", req.user.userId);
    console.log("Internship:", internship);
    console.log(
      "Distance:",
      Math.round(distance),
      "meters"
    );
    console.log(
      "Allowed radius:",
      allowedRadius,
      "meters"
    );
    console.log("================================");


    // --------------------------------------
    // Check GPS radius
    // --------------------------------------
    if (distance > allowedRadius) {
      return res.status(403).json({
        message:
          "You are outside the allowed attendance location",
        distance: Math.round(distance),
        allowedRadius
      });
    }


    // --------------------------------------
    // Get today's attendance
    // --------------------------------------
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);


    const attendance =
      await Attendance.findOne({
        intern: req.user.userId,
        internship: internship,
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      });


    // --------------------------------------
    // Check if checked in
    // --------------------------------------
    if (!attendance) {
      return res.status(404).json({
        message:
          "No check-in found for today"
      });
    }


    // --------------------------------------
    // Prevent duplicate checkout
    // --------------------------------------
    if (attendance.checkOut) {
      return res.status(400).json({
        message:
          "You have already checked out today",
        attendance
      });
    }


    // --------------------------------------
    // Record checkout
    // --------------------------------------
    attendance.checkOut =
      new Date().toISOString();

    await attendance.save();


    return res.status(200).json({
      message:
        "GPS check-out recorded successfully",

      attendance: {
        id: attendance._id,
        intern: attendance.intern,
        internship: attendance.internship,
        date: attendance.date,
        status: attendance.status,
        checkIn: attendance.checkIn,
        checkOut: attendance.checkOut,
        distanceFromWorkplace:
          Math.round(distance)
      }
    });


  } catch (error) {

    console.error(
      "GPS Check-Out Error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error during GPS check-out",
      error: error.message
    });
  }
};


// ==========================================
// GET MY ATTENDANCE
// INTERN
// ==========================================
export const getMyAttendance = async (req, res) => {
  try {

    const attendance =
      await Attendance.find({
        intern: req.user.userId
      })
        .populate(
          "internship",
          "organization fieldOfStudy department position startDate endDate"
        )
        .sort({
          date: -1
        });


    res.json({
      count: attendance.length,
      attendance
    });


  } catch (error) {

    console.error(
      "Get My Attendance Error:",
      error
    );

    res.status(500).json({
      message:
        "Server error while getting attendance"
    });
  }
};


// ==========================================
// GET ALL ATTENDANCE
// ADMIN
// ==========================================
export const getAllAttendance = async (req, res) => {
  try {

    const attendance =
      await Attendance.find()
        .populate(
          "intern",
          "name email university fieldOfStudy"
        )
        .populate(
          "internship",
          "organization fieldOfStudy department position"
        )
        .sort({
          date: -1
        });


    res.json({
      count: attendance.length,
      attendance
    });


  } catch (error) {

    console.error(
      "Get All Attendance Error:",
      error
    );

    res.status(500).json({
      message:
        "Server error while getting attendance"
    });
  }
};
