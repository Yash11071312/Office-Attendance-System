import "./../styles/topbar.css";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Topbar() {
  const employee =
    JSON.parse(localStorage.getItem("employee")) || {};

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <header className="topbar">
      <div>
        <h2>
          👋 {greeting}, {employee.fullName || "User"}
        </h2>

        <p>Welcome back!</p>
      </div>

      <div className="topbar-right">
        <FaBell className="top-icon" />

        <div className="profile-box">
          <FaUserCircle />

          <span>{employee.designation || employee.role}</span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;