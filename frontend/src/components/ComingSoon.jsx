import { Link } from "react-router-dom";
import AppLayout from "./AppLayout";
import "./../styles/comingSoon.css";

function ComingSoon({ title }) {
  return (
    <AppLayout>
      <div className="coming-page">

        <div className="coming-card">

          <div className="coming-icon">🚧</div>

          <h1>{title}</h1>

          <p>
            This feature is currently under development.
          </p>

          <p>Coming Soon in Version 2.0</p>

          <Link to="/dashboard">
            <button className="back-btn">
              ← Back to Dashboard
            </button>
          </Link>

        </div>

      </div>
    </AppLayout>
  );
}

export default ComingSoon;