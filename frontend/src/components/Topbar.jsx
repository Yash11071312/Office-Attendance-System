import "./../styles/topbar.css";
import { FaBell, FaUserCircle } from "react-icons/fa";
const employee = JSON.parse(localStorage.getItem("employee"));

function Topbar() {
  return (
    <header className="topbar">

      <div>

        <h2>👋 Good Evening, {employee?.name}</h2>

        <p>Welcome back!</p>

      </div>

      <div className="topbar-right">

        <FaBell className="top-icon"/>

        <div className="profile-box">

          <FaUserCircle />

          <span>Employee</span>

        </div>

      </div>

    </header>
  );
}

export default Topbar;