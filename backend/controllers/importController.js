const XLSX = require("xlsx");
const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");

const importEmployees = async (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);

    const sheetName = workbook.SheetNames[0];

    const employees = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );

    let count = 0;

    for (const emp of employees) {
      const existing = await Employee.findOne({
        $or: [
          { email: emp.email },
          { employeeId: emp.employeeId },
        ],
      });

      if (existing) continue;

     const password = String(emp.password || "123456");

const hashedPassword = await bcrypt.hash(
  password,
  10
);

      await Employee.create({
        fullName: emp.fullName,
        employeeId: emp.employeeId,
        email: emp.email,
        password: hashedPassword,
        department: emp.department,
        designation: emp.designation,
        role: emp.role || "employee",
      });

      count++;
    }

    res.json({
      success: true,
      imported: count,
      message: `${count} employees imported`,
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
  importEmployees,
};