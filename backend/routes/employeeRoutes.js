const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { body } = require("express-validator");
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },
});

module.exports = loginLimiter;
const {
  registerEmployee,
  loginEmployee,
} = require("../controllers/employeeController");

const protect = require("../middleware/authMiddleware");

router.post("/register", registerEmployee);
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  loginLimiter,
  loginEmployee
);

router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    employee: req.employee,
  });
});

module.exports = router;