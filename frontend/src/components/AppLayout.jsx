import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import "./../styles/layout.css";

function AppLayout({ children }) {
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employee");
    navigate("/login");
  };

  return (
    <div className="app-layout">
      <Sidebar onLogout={() => setShowLogout(true)} />

      <main className="app-content">
        <Topbar />
        {children}
      </main>

      {showLogout && (
        <div className="modal">
          <div className="modal-box">
            <h2>Logout?</h2>

            <p style={{ margin: "15px 0", color: "#94a3b8" }}>
              Are you sure you want to logout?
            </p>

            <div className="modal-buttons">
              <button className="delete-btn" onClick={logout}>
                Logout
              </button>

              <button
                className="add-btn"
                onClick={() => setShowLogout(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppLayout;