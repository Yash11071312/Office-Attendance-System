import { useState } from "react";
import {
  FaHome,
  FaClipboardList,
  FaHistory,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./../styles/sidebar.css";
import { FaFileExport } from "react-icons/fa";
const employee = JSON.parse(localStorage.getItem("employee"));

function Sidebar({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeSidebar = () => setMenuOpen(false);

const navItems =
  employee?.role === "admin"
    ? [
        { to: "/admin", icon: <FaHome />, label: "Dashboard" },
        { to: "/admin/employees", icon: <FaUser />, label: "Employees" },
        { to: "/admin/attendance", icon: <FaClipboardList />, label: "Attendance" },
        { to: "/admin/reports", icon: <FaFileExport />, label: "Reports" },
        { to: "/settings", icon: <FaCog />, label: "Settings" },
      ]
    : [
        { to: "/dashboard", icon: <FaHome />, label: "Dashboard" },
        { to: "/attendance", icon: <FaClipboardList />, label: "Attendance" },
        { to: "/history", icon: <FaHistory />, label: "History" },
        { to: "/profile", icon: <FaUser />, label: "Profile" },
        { to: "/settings", icon: <FaCog />, label: "Settings" },
      ];
  return (
    <>
      <button
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : <FaBars />}
      </button>

      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside className={`sidebar ${menuOpen ? "show" : ""}`}>
        <div>
          <div className="sidebar-logo">
            <span>🏢</span>
            <h2>Office Attendance</h2>
          </div>

          <nav className="sidebar-menu">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
                onClick={closeSidebar}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <button
          className="sidebar-logout-btn"
          onClick={onLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}

export default Sidebar;