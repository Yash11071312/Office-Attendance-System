import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
const employee = JSON.parse(localStorage.getItem("employee"));

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🏢 Office Attendance
      </div>

      <div className="nav-right">

        <FaBell className="nav-icon"/>

        <div className="profile">
          <FaUserCircle />
       <span>{employee?.fullName}</span>
        </div>

        <button className="logout-btn">
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;