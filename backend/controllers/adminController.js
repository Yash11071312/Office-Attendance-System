const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const XLSX = require("xlsx");
const getDashboard = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();

    const today = new Date().toLocaleDateString("en-GB");

    const presentToday = await Attendance.countDocuments({
      date: today,
      status: "Present",
    });

    const lateToday = await Attendance.countDocuments({
      date: today,
      status: "Late",
    });

    const absentToday = totalEmployees - presentToday - lateToday;

    const recentAttendance = await Attendance.find()
      .populate("employee", "fullName")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      totalEmployees,
      presentToday,
      lateToday,
      absentToday,
      recentAttendance,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().select("-password");

    res.json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Employee Deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const bcrypt = require("bcryptjs");

const addEmployee = async (req, res) => {
  try {
    const {
      fullName,
      employeeId,
      email,
      password,
      department,
      designation,
      role,
    } = req.body;

    const exists = await Employee.findOne({
      $or: [{ email }, { employeeId }],
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      fullName,
      employeeId,
      email,
      password: hashedPassword,
      department,
      designation,
      role,
    });

    res.status(201).json({
      success: true,
      employee,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    employee.fullName = req.body.fullName;
    employee.employeeId = req.body.employeeId;
    employee.email = req.body.email;
    employee.department = req.body.department;
    employee.designation = req.body.designation;
    employee.role = req.body.role;

    await employee.save();

    res.json({
      success: true,
      employee,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
 
};
const exportEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .select("-password");

    const workbook = XLSX.utils.book_new();

    const worksheet =
      XLSX.utils.json_to_sheet(employees);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Employees"
    );

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=employees.xlsx"
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = {
  getDashboard,
  getEmployees,
  deleteEmployee,
  addEmployee,
  updateEmployee,
  exportEmployees,
};
