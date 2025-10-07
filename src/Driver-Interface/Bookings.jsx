import "./Bookings.css";

export default function Bookings() {
  const bookings = []; // replace with fetched data

  return (
    <div className="bookings-page">
      <h2 className="area-title">Matina Area</h2>

      {/* Table view (desktop) */}
      {bookings.length > 0 ? (
        <table className="booking-table" aria-label="Bookings table">
          <thead>
            <tr>
              <th>Passenger</th>
              <th>Contact</th>
              <th>Current Location</th>
              <th>Drop Off Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td className="td-passenger">
                  <img src={b.avatar || ""} alt="" className="profile-pic small" />
                  <div>
                    <div className="name">{b.name}</div>
                  </div>
                </td>
                <td>{b.contact}</td>
                <td>{b.from}</td>
                <td>{b.to}</td>
                <td>
                  <div className="buttons">
                    <button className="accept">Accept</button>
                    <button className="decline">Decline</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="empty-message">No bookings available</p>
      )}

      {/* Card/list view (mobile) */}
      {bookings.length > 0 && (
        <div className="booking-cards" aria-hidden={false}>
          {bookings.map((b) => (
            <div className="booking-card" key={b.id}>
              <div className="passenger-info">
                <img src={b.avatar || ""} alt="" className="profile-pic" />
                <div>
                  <strong className="name">{b.name}</strong>
                  <div className="contact">{b.contact}</div>
                </div>
              </div>

              <div className="locations">
                <div className="pickup">{b.from}</div>
                <div className="dropoff">{b.to}</div>
              </div>

              <div className="buttons">
                <button className="accept">Accept</button>
                <button className="decline">Decline</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

