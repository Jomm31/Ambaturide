

export default function Bookings() {
  const bookings = []; // empty for now

  return (
    <div>
      <h2>Bookings</h2>
      {bookings.length === 0 ? (
        <p className="empty-message">No bookings available</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="booking-card">
            <div>
              <p><b>Passenger:</b> {b.passenger}</p>
              <p><b>From:</b> {b.from}</p>
              <p><b>To:</b> {b.to}</p>
            </div>
            <div className="buttons">
              <button className="accept">Accept</button>
              <button className="decline">Decline</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
