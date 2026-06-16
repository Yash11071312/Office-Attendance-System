require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Employee = require("./models/Employee");
const Attendance = require("./models/Attendance");

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    // Delete old data
    await Attendance.deleteMany({});
    await Employee.deleteMany({});

    console.log("🗑 Old Data Deleted");

    // Hash passwords
    const adminPassword = await bcrypt.hash("admin@123", 10);
    const employeePassword = await bcrypt.hash("123456", 10);

    // Create Admin
    await Employee.create({
      fullName: "Admin",
      employeeId: "ADM001",
      email: "admin123@gmail.com",
      password: adminPassword,
      department: "Administration",
      designation: "System Administrator",
      role: "admin",
    });

    // Create Employee
    await Employee.create({
      fullName: "Yash",
      employeeId: "EMP001",
      email: "yash123@gmail.com",
      password: employeePassword,
      department: "Computer Science",
      designation: "Software Engineer",
      role: "employee",
    });

    console.log("✅ Database Seeded Successfully");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedDatabase();