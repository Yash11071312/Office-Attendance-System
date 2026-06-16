const express = require("express");
const router = express.Router();

const {
  registerEmployee,
  loginEmployee,
} = require("../controllers/employeeController");

const protect = require("../middleware/authMiddleware");

router.post("/register", registerEmployee);
router.post("/login", loginEmployee);

router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    employee: req.employee,
  });
});

module.exports = router;