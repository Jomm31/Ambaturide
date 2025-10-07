import { useEffect, useState } from "react";
import "./Earnings.css";

export default function Earnings() {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("daily"); // "daily" or "weekly"

  useEffect(() => {
    // Replace with your backend endpoint, e.g. `/api/earnings?view=${view}`
    fetch(`/api/earnings?view=${view}`)
      .then((res) => res.json())
      .then((data) => {
        setEarnings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [view]);

  return (
    <div>
      <div className="earnings-toggle-group">
        <button
          className={`earnings-toggle-btn${view === "daily" ? " active" : ""}`}
          onClick={() => setView("daily")}
        >
          Daily Income
        </button>
        <button
          className={`earnings-toggle-btn${view === "weekly" ? " active" : ""}`}
          onClick={() => setView("weekly")}
        >
          Weekly Income
        </button>
      </div>

      <h2 style={{ textAlign: "center" }}>Earnings</h2>

      <div className="earnings-header">
        <span>Date</span>
        <span>Trip</span>
        <span>Amount</span>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : earnings.length === 0 ? (
        <div className="empty-message">No earnings data available</div>
      ) : (
        earnings.map((row, idx) => (
          <div className="earnings-row" key={idx}>
            <span>{row.date}</span>
            <span>{row.trip}</span>
            <span>₱{row.amount}</span>
          </div>
        ))
      )}
    </div>
  );
}
