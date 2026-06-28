import { useState } from "react";
import "./../styles/topbar.css";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Topbar() {
  const employee =
    JSON.parse(localStorage.getItem("employee")) || {};

  const [showNotifications, setShowNotifications] =
    useState(false);

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const notifications = [
    "✅ Rahul checked in",
    "📤 Priya checked out",
    "👤 New employee added",
    "📥 Employees imported",
  ];

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2>
          👋 {greeting},{" "}
          {employee.fullName || "User"}
        </h2>

        <p>Welcome back!</p>
      </div>

      <div className="topbar-right">

     <div
  className="notification-icon"
  onClick={() =>
    setShowNotifications(!showNotifications)
  }
>
  <FaBell />

  <span className="notification-badge">
    {notifications.length}
  </span>

          {showNotifications && (
            <div className="notification-panel">
              <h4>Notifications</h4>

              {notifications.map(
                (item, index) => (
                  <p key={index}>
                    {item}
                  </p>
                )
              )}
            </div>
          )}
        </div>

        <div className="profile-box">
          <FaUserCircle />

          <span>
            {employee.designation ||
              employee.role}
          </span>
        </div>

      </div>
    </header>
  );
}

export default Topbar;