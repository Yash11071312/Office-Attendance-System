const express = require("express");
const router = express.Router();

const {
  getDashboard,
  getEmployees,
  deleteEmployee,
  addEmployee,
  updateEmployee,
} = require("../controllers/adminController");

router.get("/dashboard", getDashboard);
router.get("/employees", getEmployees);
router.delete("/employee/:id", deleteEmployee);
router.post("/employee", addEmployee);
router.put("/employee/:id", updateEmployee);

module.exports = router;