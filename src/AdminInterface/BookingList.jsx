import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingListPanel() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/admin/bookings");
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Failed to load bookings", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const getStatusBadge = (status) => {
    const statusClass = status?.toLowerCase() === 'completed' ? 'status-completed' : 
                       status?.toLowerCase() === 'active' ? 'status-active' : 'status-pending';
    return <span className={`status-badge ${statusClass}`}>{status || 'Pending'}</span>;
  };

  return (
    <div className="panel">
      <h2>Booking List</h2>
      
      {loading ? (
        <div className="loading-state">Loading bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="empty-state">
          <h3>No Bookings</h3>
          <p>There are no bookings in the system.</p>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Passenger</th>
              <th>Driver</th>
              <th>Pickup</th>
              <th>Dropoff</th>
              <th>Date</th>
              <th>Time</th>
              <th>Vehicle</th>
              <th>Fare</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.BookingID}>
                <td>#{b.BookingID}</td>
                <td><strong>{b.PassengerName || b.PassengerID}</strong></td>
                <td>{b.DriverName || b.DriverID || "—"}</td>
                <td>
                  <div style={{ fontSize: '0.9rem' }}>
                    <strong>{b.PickupArea}</strong>
                    {b.PickupFullAddress && <div style={{ color: '#666', fontSize: '0.8rem' }}>{b.PickupFullAddress}</div>}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.9rem' }}>
                    <strong>{b.DropoffArea}</strong>
                    {b.DropoffFullAddress && <div style={{ color: '#666', fontSize: '0.8rem' }}>{b.DropoffFullAddress}</div>}
                  </div>
                </td>
                <td>{new Date(b.RideDate).toLocaleDateString('en-PH', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}</td>

                <td>{b.RideTime}</td>
                <td>{b.VehicleType}</td>
                <td><strong>₱{b.Fare}</strong></td>
                <td>{getStatusBadge(b.Status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}