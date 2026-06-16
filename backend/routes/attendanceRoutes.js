const express = require("express");
const router = express.Router();

const {
  checkIn,
  checkOut,
  getAttendanceHistory,
  getTodayAttendance,
    getAllAttendance,
} = require("../controllers/attendanceController");

const authMiddleware = require("../middleware/authMiddleware");


router.post("/checkin", authMiddleware, checkIn);
router.post("/checkout", authMiddleware, checkOut);
router.get("/history", authMiddleware, getAttendanceHistory);
router.get("/today", authMiddleware, getTodayAttendance);
router.get("/all", getAllAttendance);

module.exports = router;