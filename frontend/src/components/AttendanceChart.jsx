import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AttendanceChart({ attendance }) {
  const labels = attendance.map((item) => item.date);

  const hours = attendance.map((item) => item.totalHours);

  const data = {
    labels,
    datasets: [
      {
        label: "Working Hours",
        data: hours,
        backgroundColor: "#6366f1",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="chart-box">
      <h2>Weekly Attendance</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default AttendanceChart;