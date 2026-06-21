import { useState } from "react";
import AppLayout from "../../components/AppLayout";
import "../../styles/admin.css";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { FaFilePdf, FaFileExcel, FaEye } from "react-icons/fa";
function Reports() {
 

  // ==========================
  // FILTER STATES
  // ==========================

  const [employee, setEmployee] = useState("all");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // ==========================
  // REPORT STATES
  // ==========================

  const [fileName, setFileName] = useState("Attendance_Report");

  const [summary, setSummary] = useState({
    employees: 0,
    present: 0,
    late: 0,
    absent: 0,
    hours: 0,
    pages: 1,
  });

  // ==========================
  // DROPDOWNS
  // ==========================

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  // ==========================
  // LOAD EMPLOYEES
  // ==========================

  useEffect(() => {
    loadFilters();
  }, []);

  const loadFilters = async () => {
    try {
      const res = await api.get("/admin/employees");

      setEmployees(res.data.employees);

      const uniqueDepartments = [
        ...new Set(
          res.data.employees.map((e) => e.department)
        ),
      ];

      setDepartments(uniqueDepartments);

    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // UPDATE SUMMARY + FILE NAME
  // ==========================
const loadSummary = async () => {
  try {
    const res = await api.get("/admin/report/summary", {
      params: {
        employee,
        department,
        status,
        from,
        to,
      },
    });

    setSummary(res.data);
  } catch (err) {
    console.log(err);
  }
};
  useEffect(() => {
    updateSummary();
  }, [employee, department, status, from, to, employees]);

  const updateSummary = () => {

    const filteredEmployees =
      employee === "all"
        ? employees.length
        : 1;

    setSummary({
      employees: filteredEmployees,
      present: 0,
      late: 0,
      absent: 0,
      hours: 0,
      pages: 1,
    });

    let name = "Attendance_Report";

    if (employee !== "all") {
      const emp = employees.find(
        (e) => e._id === employee
      );

      if (emp) {
        name = `Attendance_${emp.fullName}`;
      }
    }

    if (department !== "all") {
      name += `_${department}`;
    }

    if (from && to) {
      name += `_${from}_to_${to}`;
    }

    setFileName(name);
  };
    const downloadExcel = async () => {
  try {
 const res = await api.get("/admin/report/excel", {
  params: {
    employee,
    department,
    status,
    from,
    to,
  },
  responseType: "blob",
});

    const url = window.URL.createObjectURL(
      new Blob([res.data])
    );

    const link = document.createElement("a");

    link.href = url;
   link.download = `${fileName}.xlsx`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    toast.success("Excel Downloaded");
  } catch (err) {
  console.log(err);
  console.log(err.response);

  toast.error(err.response?.data?.message || "Download Failed");
}
};

const downloadPDF = async () => {
  try {
    const res = await api.get("/admin/report/pdf", {
  params: {
    employee,
    department,
    status,
    from,
    to,
  },
  responseType: "blob",
});

    const url = window.URL.createObjectURL(
      new Blob([res.data])
    );

    const link = document.createElement("a");

    link.href = url;
link.download = `${fileName}.pdf`;
    document.body.appendChild(link);

    link.click();

    link.remove();

    toast.success("PDF Downloaded");
  } catch (err) {
    console.log(err);

    toast.error("Download Failed");
  }
};
  return (
    
    <AppLayout>
        
      <div className="admin-page">

     <h1>📄 Attendance Report Builder</h1>

<p className="report-subtitle">
Generate professional attendance reports with filters and export them as PDF or Excel.
</p>

        <div className="report-card">

          <div className="report-grid">

            <div>
              <label>Employee</label>

              <select
  value={employee}
  onChange={(e) => setEmployee(e.target.value)}
>
<option value="all">All Employees</option>

{employees.map((emp) => (
  <option key={emp._id} value={emp._id}>
    {emp.fullName}
  </option>
))}
</select>
            </div>

            <div>
              <label>Department</label>

             <select
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
>
<option value="all">All Departments</option>

{departments.map((dept) => (
  <option key={dept} value={dept}>
    {dept}
  </option>
))}
</select>
            </div>
  <div>
    <label>Status</label>

    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="all">All Status</option>
      <option value="Present">Present</option>
      <option value="Late">Late</option>
      <option value="Absent">Absent</option>
    </select>
  </div>
            <div>
              <label>From</label>

        <input
  type="date"
  value={from}
  onChange={(e) => setFrom(e.target.value)}
/>
            </div>

            <div>
              <label>To</label>

          <input
  type="date"
  value={to}
  onChange={(e) => setTo(e.target.value)}
/>
            </div>

          </div>
<div className="report-summary">

  <h2>📊 Report Summary</h2>

  <div className="summary-grid">

    <div className="summary-card">
      👥
      <h3>{summary.employees}</h3>
      <p>Employees</p>
    </div>

    <div className="summary-card">
      🟢
      <h3>{summary.present}</h3>
      <p>Present</p>
    </div>

    <div className="summary-card">
      🟡
      <h3>{summary.late}</h3>
      <p>Late</p>
    </div>

    <div className="summary-card">
      🔴
      <h3>{summary.absent}</h3>
      <p>Absent</p>
    </div>

    <div className="summary-card">
      ⏰
      <h3>{summary.hours}</h3>
      <p>Total Hours</p>
    </div>

    <div className="summary-card">
      📄
      <h3>{summary.pages}</h3>
      <p>Pages</p>
    </div>

  </div>

  <div className="filename-box">

    <label>📄 File Name</label>

    <input
      value={fileName}
      onChange={(e)=>setFileName(e.target.value)}
    />

  </div>

</div>
          <div className="report-buttons">

   <button
className="download-btn"
onClick={downloadPDF}
>
<FaFilePdf />
&nbsp;
Download PDF
</button>

<button
className="download-btn excel"
onClick={downloadExcel}
>
<FaFileExcel />
&nbsp;
Download Excel
</button>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}

export default Reports;