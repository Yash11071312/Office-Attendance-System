import { Link } from "react-router-dom";
import "../styles/notfound.css";

function NotFound() {
  return (
    <div className="notfound">
      <h1>404</h1>

      <h2>Oops!</h2>

      <p>The page you're looking for doesn't exist.</p>

      <Link to="/dashboard" className="home-btn">
        ← Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;