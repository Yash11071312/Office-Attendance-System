const Attendance = require("../models/Attendance");

const checkIn = async (req, res) => {
  try {
    const employeeId = req.employee.id;

    const today = new Date().toLocaleDateString("en-GB");

    // Check if already checked in today
    const existingAttendance = await Attendance.findOne({
      employee: employeeId,
      date: today,
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: "Already checked in today",
      });
    }

    const attendance = await Attendance.create({
      employee: employeeId,
      date: today,
      checkIn: new Date(),
      location: req.body.location,
    });

    res.status(201).json({
      success: true,
      message: "Check-In Successful",
      attendance,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const checkOut = async (req, res) => {
  try {
    const employeeId = req.employee.id;
    const today = new Date().toLocaleDateString("en-GB");

    const attendance = await Attendance.findOne({
      employee: employeeId,
      date: today,
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "No check-in found for today",
      });
    }

    if (attendance.checkOut) {
      return res.status(400).json({
        success: false,
        message: "Already checked out",
      });
    }

    attendance.checkOut = new Date();

    const hours =
      (attendance.checkOut - attendance.checkIn) / (1000 * 60 * 60);

    attendance.totalHours = Number(hours.toFixed(2));

    await attendance.save();

    res.json({
      success: true,
      message: "Check-Out Successful",
      totalHours: attendance.totalHours,
      attendance,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAttendanceHistory = async (req, res) => {
  try {
    const employeeId = req.employee.id;

   const attendance = await Attendance.find()
.populate("employee")
.sort({ createdAt: -1 });

const filteredAttendance = attendance.filter(
    (record) => record.employee !== null
);

res.json({
    success: true,
    attendance: filteredAttendance
});

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getTodayAttendance = async (req, res) => {
  try {
    const employeeId = req.employee.id;
    const today = new Date().toLocaleDateString("en-GB");

    const attendance = await Attendance.findOne({
      employee: employeeId,
      date: today,
    });

    res.status(200).json({
      success: true,
      attendance,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const Employee = require("../models/Employee");


const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("employee", "fullName employeeId department")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      attendance,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  checkIn,
  checkOut,
  getTodayAttendance,
  getAttendanceHistory,
  getAllAttendance,
};