import { useEffect, useState } from "react";
import axios from "axios";

export default function DriverListPanel() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActiveDrivers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/admin/drivers?status=active");
      const list = res.data.drivers || [];
      
      const driversWithRating = await Promise.all(list.map(async (drv) => {
        try {
          const r = await axios.get(`http://localhost:5000/api/driver/${drv.DriverID}/ratings`);
          const ratings = r.data.ratings || [];
          const avg = ratings.length ? (ratings.reduce((s, it) => s + Number(it.Rating), 0) / ratings.length) : 0;
          return { ...drv, avgRating: Number(avg.toFixed(2)), ratingCount: ratings.length };
        } catch (err) {
          return { ...drv, avgRating: 0, ratingCount: 0 };
        }
      }));
      
      setDrivers(driversWithRating);
    } catch (err) {
      console.error("Failed to fetch drivers", err);
      setDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchActiveDrivers(); }, []);

  return (
    <div className="panel">
      <h2>Active Drivers</h2>
      
      {loading ? (
        <div className="loading-state">Loading drivers...</div>
      ) : drivers.length === 0 ? (
        <div className="empty-state">
          <h3>No Active Drivers</h3>
          <p>There are no active drivers at the moment.</p>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Vehicle</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map(d => (
              <tr key={d.DriverID}>
                <td>#{d.DriverID}</td>
                <td><strong>{d.FirstName} {d.LastName}</strong></td>
                <td>{d.Email}</td>
                <td>{d.PhoneNumber}</td>
                <td>{d.VehicleBrand} ({d.PlateNumber})</td>
                <td>
                  <strong>{d.avgRating}</strong>
                  <span style={{color: '#666', fontSize: '0.85rem', marginLeft: '8px'}}>
                    ({d.ratingCount} reviews)
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}