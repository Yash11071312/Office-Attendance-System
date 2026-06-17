import "./../styles/table.css";

function AttendanceTable({ attendance }) {

  return (

    <div className="table-box">

      <h2>Recent Attendance</h2>

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

      <td>
  <span
    className={`status-badge ${
      item.status === "Present"
        ? "present"
        : item.status === "Late"
        ? "late"
        : "absent"
    }`}
  >
    {item.status}
  </span>
</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AttendanceTable;