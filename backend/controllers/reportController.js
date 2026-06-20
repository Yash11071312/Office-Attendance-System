const ExcelJS = require("exceljs");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
const PDFDocument = require("pdfkit");
const downloadExcel = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Attendance Report");

    sheet.columns = [
      { header: "Employee", key: "employee", width: 25 },
      { header: "Employee ID", key: "employeeId", width: 15 },
      { header: "Department", key: "department", width: 20 },
      { header: "Date", key: "date", width: 15 },
      { header: "Check In", key: "checkIn", width: 15 },
      { header: "Check Out", key: "checkOut", width: 15 },
      { header: "Hours", key: "hours", width: 10 },
      { header: "Status", key: "status", width: 12 },
    ];

    const attendance = await Attendance.find().populate("employee");

    attendance.forEach((item) => {
      sheet.addRow({
        employee: item.employee?.fullName || "",
        employeeId: item.employee?.employeeId || "",
        department: item.employee?.department || "",
        date: item.date,
        checkIn: item.checkIn
          ? new Date(item.checkIn).toLocaleTimeString()
          : "--",
        checkOut: item.checkOut
          ? new Date(item.checkOut).toLocaleTimeString()
          : "--",
        hours: item.totalHours,
        status: item.status,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Attendance_Report.xlsx"'
    );

    await workbook.xlsx.write(res);

    res.end();

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const downloadPDF = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate("employee");

    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Attendance_Report.pdf"'
    );

    doc.pipe(res);

    doc
      .fontSize(22)
      .text("Office Attendance System", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(16)
      .text("Attendance Report", {
        align: "center",
      });

    doc.moveDown(2);

    attendance.forEach((item) => {
      doc.fontSize(12).text(
        `Employee : ${item.employee?.fullName || ""}`
      );

      doc.text(
        `Employee ID : ${item.employee?.employeeId || ""}`
      );

      doc.text(
        `Department : ${item.employee?.department || ""}`
      );

      doc.text(`Date : ${item.date}`);

      doc.text(
        `Check In : ${
          item.checkIn
            ? new Date(item.checkIn).toLocaleTimeString()
            : "--"
        }`
      );

      doc.text(
        `Check Out : ${
          item.checkOut
            ? new Date(item.checkOut).toLocaleTimeString()
            : "--"
        }`
      );

      doc.text(`Hours : ${item.totalHours}`);

      doc.text(`Status : ${item.status}`);

      doc.moveDown();

      doc.moveTo(40, doc.y)
        .lineTo(550, doc.y)
        .stroke();

      doc.moveDown();
    });

    doc.end();

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  downloadPDF,
  downloadExcel,
};