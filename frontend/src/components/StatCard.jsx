import "./../styles/statcard.css";

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-info">
        <p className="stat-title">{title}</p>
        <h2 className="stat-value">{value}</h2>
      </div>

    </div>
  );
}

export default StatCard;