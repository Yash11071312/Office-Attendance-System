import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaBusinessTime,
} from "react-icons/fa";

import api from "../services/api";
import AppLayout from "../components/AppLayout";
import StatCard from "../components/StatCard";
import AttendanceTable from "../components/AttendanceTable";

import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const employee = JSON.parse(localStorage.getItem("employee"));

  const [today, setToday] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!employee) {
      navigate("/login");
      return;
    }

    loadDashboard();
  }, [employee, navigate]);

  const loadDashboard = async () => {
    try {
      const todayRes = await api.get("/attendance/today");
      const historyRes = await api.get("/attendance/history");

      setToday(todayRes.data.attendance);
      setHistory(historyRes.data.attendance);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckIn = async () => {
    try {
      await api.post("/attendance/checkin", {
        location: {},
      });

      await loadDashboard();
      alert("Checked In Successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Check In Failed");
    }
  };

  const handleCheckOut = async () => {
    try {
      await api.post("/attendance/checkout");

      await loadDashboard();
      alert("Checked Out Successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Check Out Failed");
    }
  };

  return (
    <AppLayout>
      <div className="cards">
        <StatCard
          title="Status"
          value={today ? today.status : "Absent"}
          icon={<FaCheckCircle />}
        />

        <StatCard
          title="Check In"
          value={
            today?.checkIn
              ? new Date(today.checkIn).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "--:--"
          }
          icon={<FaClock />}
        />

        <StatCard
          title="Hours"
          value={today?.totalHours || 0}
          icon={<FaBusinessTime />}
        />

        <StatCard
          title="Records"
          value={history.length}
          icon={<FaCalendarAlt />}
        />
      </div>

      <div className="button-row">
        <button
          className="checkin"
          onClick={handleCheckIn}
          disabled={!!today}
        >
          Check In
        </button>

        <button
          className="checkout"
          onClick={handleCheckOut}
          disabled={!today || !!today.checkOut}
        >
          Check Out
        </button>
      </div>

      <AttendanceTable attendance={history} />
    </AppLayout>
  );
}

export default Dashboard;