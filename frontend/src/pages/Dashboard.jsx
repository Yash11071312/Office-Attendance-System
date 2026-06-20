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
import toast from "react-hot-toast";
import AttendanceChart from "../components/AttendanceChart";
import "../styles/chart.css";

function Dashboard() {
  const navigate = useNavigate();
  const employee = JSON.parse(localStorage.getItem("employee"));

  const [today, setToday] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

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
  setLoading(true);

  try {
    await api.post("/attendance/checkin", {
      location: {},
    });

    loadDashboard();

    toast.success("Checked In Successfully");
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Unable to Check In"
    );
  } finally {
    setLoading(false);
  }
};

 const handleCheckOut = async () => {
  setLoading(true);

  try {
    await api.post("/attendance/checkout");

    loadDashboard();

    toast.success("Checked Out Successfully");
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Unable to Check Out"
    );
  } finally {
    setLoading(false);
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
  disabled={loading || today}
>
  {loading ? "Checking In..." : "Check In"}
</button>

   <button
  className="checkout"
  onClick={handleCheckOut}
  disabled={loading || !today || today.checkOut}
>
  {loading ? "Checking Out..." : "Check Out"}
</button>
      </div>

      <AttendanceTable attendance={history} />
      <AttendanceChart attendance={history} />
    </AppLayout>
  );
}

export default Dashboard;