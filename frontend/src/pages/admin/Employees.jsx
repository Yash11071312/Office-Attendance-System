import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/admin.css";
import AppLayout from "../../components/AppLayout";

function Employees() {
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

      alert("Employee Updated");
    } else {
      await api.post("/admin/employee", formData);

      alert("Employee Added");
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
    alert(err.response?.data?.message || "Something went wrong");
  }
};

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/employee/${id}`);

      alert("Employee Deleted");

      loadEmployees();
    } catch (err) {
      console.log(err);
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
        <h1>Employees</h1>

        <button
          className="add-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Employee
        </button>
      </div>
<input
  className="search-box"
  type="text"
  placeholder="🔍 Search Employee..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
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
    onClick={() => deleteEmployee(emp._id)}
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
    </AppLayout>
  );
}

export default Employees;