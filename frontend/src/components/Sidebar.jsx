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
import { NavLink, useNavigate } from "react-router-dom";
import "./../styles/sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employee");
    navigate("/login");
  };

  const closeSidebar = () => setMenuOpen(false);

  const navItems = [
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
        ></div>
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

  <button className="sidebar-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}

export default Sidebar;