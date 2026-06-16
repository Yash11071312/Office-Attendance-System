import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "../../styles/admin.css";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    lateToday: 0,
    recentAttendance: [],
  });

useEffect(() => {
  const employee = JSON.parse(localStorage.getItem("employee"));

  if (!employee) {
    navigate("/login");
    return;
  }

  if (employee.role !== "admin") {
    navigate("/dashboard");
    return;
  }

  fetchDashboard();
}, [navigate]); 

const fetchDashboard = async () => {
  try {
    const res = await api.get("/admin/dashboard");
    setStats(res.data);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <AppLayout>
    <div className="admin-page">

      <div className="page-header">
        <h1>📊 Admin Dashboard</h1>
      </div>

      {/* Stats */}

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h4>Total Employees</h4>
          <h1>{stats.totalEmployees}</h1>
        </div>

        <div className="dashboard-card">
          <h4>Present Today</h4>
          <h1>{stats.presentToday}</h1>
        </div>

        <div className="dashboard-card">
          <h4>Absent Today</h4>
          <h1>{stats.absentToday}</h1>
        </div>

        <div className="dashboard-card">
          <h4>Late Today</h4>
          <h1>{stats.lateToday}</h1>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="quick-actions">

        <Link to="/admin/employees">
          <button className="add-btn">
            👥 Manage Employees
          </button>
        </Link>

        <Link to="/admin/attendance">
          <button className="add-btn">
            📅 Attendance
          </button>
        </Link>

      </div>

      {/* Recent Attendance */}

      <div className="recent-box">

        <h2>Recent Attendance</h2>
<div className="table-container">
        <table className="employee-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Hours</th>
            </tr>
          </thead>

          <tbody>

            {stats.recentAttendance?.length > 0 ? (

              stats.recentAttendance.map((item) => (

                <tr key={item._id}>

                  <td>
                    {item.employee?.fullName || "Deleted Employee"}
                  </td>

                  <td>{item.date}</td>

                  <td>

                    <span
                      className={
                        item.status === "Present"
                          ? "present"
                          : item.status === "Late"
                          ? "late"
                          : "absent"
                      }
                    >
                      {item.status}
                    </span>

                  </td>

                  <td>{item.totalHours}</td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No Attendance Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>
      </div>

    </div>
    </AppLayout>
  );
}

export default AdminDashboard;