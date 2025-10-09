import { useState, useEffect, useMemo } from "react";
import "./DriverBooking.css";
import DriverHeader from "../../src/DriverHeader.jsx";

function DriverBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  // ✅ Fetch bookings when component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/driver/bookings");
        const data = await response.json();

        if (data.success) {
          setBookings(data.bookings);
        } else {
          console.error("No bookings found");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ✅ Filter pending bookings by location or name
  const filteredBookings = useMemo(() => {
    const q = (searchLocation || "").toLowerCase().trim();

    return bookings
      .filter((booking) => (booking.Status || "").toLowerCase() === "pending")
      .filter((booking) => {
        // normalize values with fallbacks from backend aliases
        const pickup = (booking.PickupFullAddress || booking.Origin || "").toString().toLowerCase();
        const dropoff = (booking.DropoffFullAddress || booking.Destination || "").toString().toLowerCase();
        const passenger = (booking.PassengerName || "").toString().toLowerCase();

        if (!q) return true;
        return (
          pickup.includes(q) ||
          dropoff.includes(q) ||
          passenger.includes(q)
        );
      });
  }, [bookings, searchLocation]);

  // ✅ Accept ride
  const handleAccept = async (id) => {
    setLoadingId(id);
    try {
      const response = await fetch(`http://localhost:5000/api/driver/bookings/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "accepted" }),
      });
      const data = await response.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.BookingID === id ? { ...b, Status: "accepted" } : b))
        );
      }
    } catch (err) {
      console.error("Accept error:", err);
    }
    setLoadingId(null);
  };

  // ✅ Reject ride
  const handleReject = async (id) => {
    setLoadingId(id);
    try {
      const response = await fetch(`http://localhost:5000/api/driver/bookings/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });
      const data = await response.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.BookingID === id ? { ...b, Status: "cancelled" } : b))
        );
      }
    } catch (err) {
      console.error("Reject error:", err);
    }
    setLoadingId(null);
  };

  const clearSearch = () => setSearchLocation("");

  const getInitials = (name) =>
    name
      ?.split(", ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();

  if (loading) return <p>Loading bookings...</p>;

  return (
    <>
      <DriverHeader />
      <div className="driver-booking-container">
        <div className="booking-content">
          <div className="search-header">
            <div className="location-title">
              <div className="location-badge">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <h1>Toril Area</h1>
              </div>
              <span className="booking-count">
                {filteredBookings.length} pending{" "}
                {filteredBookings.length === 1 ? "request" : "requests"}
              </span>
            </div>

            <div className="search-bar">
              <div className="search-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by location, destination, or passenger name..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="search-input"
              />
              {searchLocation && (
                <button className="clear-search" onClick={clearSearch}>
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="bookings-list">
            {filteredBookings.map((booking) => {
              const pickup = booking.PickupFullAddress || booking.Origin || "Unknown pickup";
              const dropoff = booking.DropoffFullAddress || booking.Destination || "Unknown dropoff";
              const passengerImage = booking.PassengerImage || booking.ProfilePicture || "/default-avatar.jpg";

              return (
                <div key={booking.BookingID} className="booking-card">
                  <div className="booking-header">
                    <div className="passenger-info">
                      <div className="avatar-container">
                        <img
                          src={passengerImage}
                          alt={booking.PassengerName}
                          className="passenger-image"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="avatar-fallback">
                          {getInitials(booking.PassengerName)}
                        </div>
                      </div>
                      <div className="passenger-details">
                        <span className="label">Passenger</span>
                        <h3 className="passenger-name">{booking.PassengerName}</h3>
                      </div>
                    </div>
                    <div className="booking-badge pending">Pending</div>
                  </div>

                  <div className="trip-details">
                    <div className="route-info">
                      <div className="route-item">
                        <span className="route-label">From</span>
                        <p className="route-text">{booking.PickupFullAddress}</p>
                      </div>
                      <div className="route-item">
                        <span className="route-label">To</span>
                        <p className="route-text">{booking.DropoffFullAddress}</p>
                      </div>
                    </div>

                    <div className="datetime-info">
                      <span>{booking.RideDate}</span> | <span>{booking.RideTime}</span>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button
                      className="btn-reject"
                      onClick={() => handleReject(booking.BookingID)}
                      disabled={loadingId !== null}
                    >
                      Decline
                    </button>
                    <button
                      className="btn-accept"
                      onClick={() => handleAccept(booking.BookingID)}
                      disabled={loadingId !== null}
                    >
                      Accept Ride
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredBookings.length === 0 && (
            <div className="no-bookings">
              <h3>No pending requests</h3>
              <p>
                {searchLocation
                  ? `No bookings found for "${searchLocation}"`
                  : "All booking requests have been processed"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DriverBooking;
