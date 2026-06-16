const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Employee
const registerEmployee = async (req, res) => {
  try {
    const {
      fullName,
      employeeId,
      email,
      password,
      department,
      designation,
    } = req.body;

    const existingEmployee = await Employee.findOne({
      $or: [{ email }, { employeeId }],
    });

    if (existingEmployee) {
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
    });

    res.status(201).json({
      success: true,
      message: "Employee Registered Successfully",
      employee,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Login Employee
const loginEmployee = async (req, res) => {
  try {
    console.log("Login route reached");

    const { email, password } = req.body;
console.log("Searching for:", email);

   
    const employee = await Employee.findOne({ email });
    console.log(await Employee.find());
    console.log("Found employee:", employee);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: employee._id,
        role: employee.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      employee: {
        id: employee._id,
        fullName: employee.fullName,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  registerEmployee,
  loginEmployee,
};