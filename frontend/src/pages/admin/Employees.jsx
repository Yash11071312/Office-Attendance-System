import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/admin.css";
import AppLayout from "../../components/AppLayout";
import toast from "react-hot-toast";

import { FaFileImport } from "react-icons/fa";
function Employees() {
  const [deleteId, setDeleteId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [search, setSearch] = useState("");
const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    email: "",
    password: "",
    department: "",
    designation: "",
    role: "employee",
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await api.get("/admin/employees");
      setEmployees(res.data.employees);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const saveEmployee = async () => {
  try {
    if (editingId) {
      await api.put(`/admin/employee/${editingId}`, {
        fullName: formData.fullName,
        employeeId: formData.employeeId,
        email: formData.email,
        department: formData.department,
        designation: formData.designation,
        role: formData.role,
      });

    toast.success("Employee Updated");
    } else {
      await api.post("/admin/employee", formData);

      toast.success("Employee Added Successfully");
    }

    setEditingId(null);

    setFormData({
      fullName: "",
      employeeId: "",
      email: "",
      password: "",
      department: "",
      designation: "",
      role: "employee",
    });

    setShowModal(false);

    loadEmployees();
  } catch (err) {
 toast.error(
  err.response?.data?.message ||
  "Something went wrong"
);
  }
};

 const deleteEmployee = async () => {
  try {
    await api.delete(`/admin/employee/${deleteId}`);

    toast.success("Employee Deleted Successfully");

    setDeleteId(null);

    loadEmployees();
  } catch (err) {
    toast.error("Unable to delete employee.");
  }
};
const downloadEmployees = async () => {
  try {
    const res = await api.get(
      "/admin/employees/export",
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([res.data])
    );

    const link =
      document.createElement("a");

    link.href = url;
    link.download = "Employees.xlsx";

    document.body.appendChild(link);

    link.click();

    link.remove();

    toast.success("Employees Exported");
  } catch (err) {
    toast.error("Export failed");
  }
};
const handleImport = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    await api.post("/import/employees", formData);

    toast.success("Employees Imported Successfully");

    loadEmployees();
  } catch (err) {
    console.log(err);
    toast.error("Import Failed");
  }
};
const editEmployee = (emp) => {
  setEditingId(emp._id);

  setFormData({
    fullName: emp.fullName,
    employeeId: emp.employeeId,
    email: emp.email,
    password: "",
    department: emp.department,
    designation: emp.designation,
    role: emp.role,
  });

  setShowModal(true);
};
  return (
    <AppLayout>
    <div className="admin-page">
    <div className="page-header">
 <div className="employee-top">

<h1 className="employee-title">
  Employees
</h1>

<div className="employee-actions">
      <button
        className="add-btn"
        onClick={() => setShowModal(true)}
      >
        + Add Employee
      </button>

      <button
        className="add-btn"
        onClick={downloadEmployees}
      >
        Export Excel
      </button>

      <button
        className="add-btn"
        onClick={() =>
          document.getElementById("excelUpload").click()
        }
      >
        <FaFileImport />
        &nbsp; Import Excel
      </button>
    </div>


  <div className="employee-stats">
    <div className="stat-card">
      <h2>{employees.length}</h2>
      <p>Total Employees</p>
    </div>

    <div className="stat-card">
      <h2>
        {employees.filter(
          e => e.role === "admin"
        ).length}
      </h2>
      <p>Admins</p>
    </div>

    <div className="stat-card">
      <h2>
        {new Set(
          employees.map(
            e => e.department
          )
        ).size}
      </h2>
      <p>Departments</p>
    </div>
  </div>

  <input
    className="search-box"
    type="text"
    placeholder="🔍 Search Employee..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />

</div>
</div>


<div className="table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.filter(
    (emp) =>
      emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
  ).map((emp) => (
            <tr key={emp._id}>
              <td>{emp.fullName}</td>
              <td>{emp.employeeId}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>
              <td>{emp.role}</td>

              <td className="action-buttons">
  <button
    className="edit-btn"
    onClick={() => editEmployee(emp)}
  >
    Edit
  </button>

  <button
    className="delete-btn"
  onClick={() => setDeleteId(emp._id)}
  >
    Delete
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-box">
           <h2>
{editingId ? "Edit Employee" : "Add Employee"}
</h2>

            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />

            <input
              name="employeeId"
              placeholder="Employee ID"
              value={formData.employeeId}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <input
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
            />

            <input
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>

            <div className="modal-buttons">
              <button
                className="add-btn"
          onClick={saveEmployee}
              >
              {editingId ? "Update" : "Create"}
              </button>

              <button
                className="delete-btn"
               onClick={() => {
  setShowModal(false);

  setEditingId(null);

  setFormData({
    fullName: "",
    employeeId: "",
    email: "",
    password: "",
    department: "",
    designation: "",
    role: "employee",
  });
  
}}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    {deleteId && (
  <div className="modal">
    <div className="modal-box">
      <h2>Delete Employee?</h2>

      <p style={{ margin: "15px 0", color: "#94a3b8" }}>
        This action cannot be undone.
      </p>

      <div className="modal-buttons">
        <button
          className="delete-btn"
          onClick={deleteEmployee}
        >
          Delete
        </button>

        <button
          className="add-btn"
          onClick={() => setDeleteId(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </AppLayout>
  );
}

export default Employees;