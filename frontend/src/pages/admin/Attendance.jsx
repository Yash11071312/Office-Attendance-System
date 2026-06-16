import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/admin.css";
import AppLayout from "../../components/AppLayout";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const res = await api.get("/attendance/all");
      setAttendance(res.data.attendance);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
return (
  <AppLayout>
    <div className="admin-page">
      <div className="page-header">
        <h1>Attendance</h1>
      </div>

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Hours</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((item) => (
                <tr key={item._id}>
                  <td>{item.employee?.fullName}</td>

                  <td>{item.employee?.employeeId}</td>

                  <td>{item.date}</td>

                  <td>
                    {item.checkIn
                      ? new Date(item.checkIn).toLocaleTimeString()
                      : "--"}
                  </td>

                  <td>
                    {item.checkOut
                      ? new Date(item.checkOut).toLocaleTimeString()
                      : "--"}
                  </td>

                  <td>{item.totalHours}</td>

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </AppLayout>
);
  
 
}

export default Attendance;