const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getDashboard,
  getEmployees,
  deleteEmployee,
  addEmployee,
  updateEmployee,
  exportEmployees,
} = require("../controllers/adminController");
router.get("/dashboard", getDashboard);
router.get("/employees", getEmployees);
router.delete("/employee/:id", deleteEmployee);
router.post("/employee", addEmployee);
router.put("/employee/:id", updateEmployee);
router.get(
  "/employees/export",
  protect,
  exportEmployees
);
module.exports = router;