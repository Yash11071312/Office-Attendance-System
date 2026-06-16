import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/history.css";
import AppLayout from "../components/AppLayout";
function History() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/attendance/history");

      setAttendance(res.data.attendance);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <AppLayout>
    <div className="history-page">

      <h1>Attendance History</h1>

      {attendance.length === 0 ? (

        <p>No attendance found.</p>

      ) : (
<div className="table-container">
        <table>

          <thead>

            <tr>
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

                <td>{item.date}</td>

                <td>
                  {item.checkIn
                    ? new Date(item.checkIn).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "--"}
                </td>

                <td>
                  {item.checkOut
                    ? new Date(item.checkOut).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "--"}
                </td>

                <td>{item.totalHours}</td>

                <td>{item.status}</td>

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

export default History;