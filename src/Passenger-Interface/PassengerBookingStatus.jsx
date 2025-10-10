import { useState, useEffect } from "react";
import axios from "axios";
import "./Css/PassengerBookingStatus.css";
import logo from "../assets/ambaturide-logo.png";
import Header from "../../src/Header.jsx"

function PassengerBookingStatus() {
  const [booking, setBooking] = useState(null);
  const [status, setStatus] = useState("none");
  const [rating, setRating] = useState(0);
  const [passengerProfile, setPassengerProfile] = useState(null);
  const [passengerPhone, setPassengerPhone] = useState("");
  const [driverProfile, setDriverProfile] = useState(null);
  
  // Read PassengerID from localStorage with fallbacks (normalized)
  const getSavedPassengerId = () => {
    try {
      const raw =
        localStorage.getItem("PassengerID") ||
        localStorage.getItem("passenger") ||
        localStorage.getItem("user");
      if (!raw) return null;
      // If raw is a JSON object string (passenger), parse and return id
      if (raw.startsWith ? raw.startsWith("{") : false) {
        const obj = JSON.parse(raw);
        return obj.PassengerID || obj.id || obj.UserID || obj.PassengerId || null;
      }
      return raw;
    } catch (err) {
      console.error("Error reading passenger id from storage:", err);
      return null;
    }
  };

  const passengerId = getSavedPassengerId();

  const sanitizePhone = (phone) => {
    if (!phone) return "";
    return phone.toString().replace(/[+\-\s()]/g, "");
  };

  useEffect(() => {
    if (!passengerId) return;

    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/passenger/${passengerId}/booking`);
        if (res.data.booking) {
          setBooking(res.data.booking);
          setStatus(res.data.booking.Status?.toLowerCase() || "pending");

          // Fetch passenger profile (to get profile picture / canonical phone)
          try {
            const p = await axios.get(`http://localhost:5000/api/passenger/profile/${passengerId}`);
            setPassengerProfile(p.data);
            setPassengerPhone(sanitizePhone(p.data.PhoneNumber));
          } catch (err) {
            console.warn("Failed to fetch passenger profile:", err);
          }

          // Fetch driver profile if a driver is assigned
          const driverId = res.data.booking.DriverID || res.data.booking.DriverId || res.data.booking.driverId;
          if (driverId) {
            try {
              const d = await axios.get(`http://localhost:5000/api/driver/profile/${driverId}`);
              setDriverProfile(d.data);
            } catch (err) {
              console.warn("Failed to fetch driver profile:", err);
            }
          }
        } else {
          setStatus("none");
        }
      } catch (err) {
        console.error("❌ Error fetching booking:", err);
      }
    };

    fetchBooking();
  }, [passengerId]);

  const formatDate = (iso) => {
    if (!iso) return "";
    // Use locale-aware date (may adjust for local timezone)
    const d = new Date(iso);
    if (isNaN(d)) return iso; // fallback if not a valid date
    return d.toLocaleDateString();
    // If you want the raw YYYY-MM-DD exactly as stored (no timezone shift), use:
    // return String(iso).split("T")[0];
  };

  const formatTime = (isoOrTime) => {
    if (!isoOrTime) return "";
    // If already a time like "07:35:00" return trimmed hh:mm
    if (/^\d{2}:\d{2}(:\d{2})?$/.test(isoOrTime)) {
      return isoOrTime.slice(0,5);
    }
    const d = new Date(isoOrTime);
    if (isNaN(d)) return isoOrTime;
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // if none
  if (status === "none") {
    return (
      <div className="booking-status-container">
        <div className="booking-card">
          <h2>No active bookings found</h2>
          <p>Book a ride to see your booking status here.</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header/>
      <div className="booking-status-container">
      <div className="booking-card">
        {/* Left Section */}
        <div className="left-section">
          {status === "pending" ? (
            <div className="pending-state">
              <h2 className="wait-title">Wait for your Driver</h2>
              <div className="status-badge-pending">Pending</div>
              <img src={logo} alt="AmbatURIDE" className="pending-logo" />
            </div>
          ) : (
            <>
              <div className="driver-assigned-header">
                <h2 className="section-title">Your Driver</h2>
              </div>

              <div className="driver-profile">
                <div className="profile-picture">
                  {/* Show driver profile picture (fallback to booking field or default) */}
                  <img
                    src={
                      driverProfile && driverProfile.ProfilePicture
                        ? `http://localhost:5000${driverProfile.ProfilePicture}`
                        : booking.DriverProfilePicture
                        ? `http://localhost:5000${booking.DriverProfilePicture}`
                        : "/profile-pictures/default.jpg"
                    }
                    alt={driverProfile?.FullName || booking.DriverName || "Driver"}
                    className="passenger-img"
                    onError={(e) => {
                      e.target.src = "/profile-pictures/default.jpg";
                    }}
                  />
                </div>
                <div className="driver-details">
                  <h3>{booking.DriverName}</h3>
                  <p>📞 {sanitizePhone(booking.DriverPhone)}</p>
                </div>
              </div>

              <div className="vehicle-info">
                <div className="car-image">
                  <div className="car-img-placeholder">🚗</div>
                </div>
                <div className="car-details">
                  <div className="detail-row">
                    <span className="label">Plate Number:</span>
                    <span className="value">{booking.PlateNumber}</span>
                    
                  </div>
                  <div className="detail-row">
                    <span className="label">Model:</span>
                    <span className="value">{booking.VehicleBrand}</span>
                  </div>
                  <div className="vehicle-row">
                    <span className="label">Type of vehicle:</span>
                    <span className="value">{booking.VehicleType}</span>
                  </div>
                </div>
                <div className="status-indicator">
                  <span className="status-badge-active">✔️ Driver Assigned</span>
                </div>
              </div>

              <div className="rating-section">
                <h4>Rate the Driver</h4>
                <div className="stars-container">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`star-btn ${rating >= star ? "filled" : ""}`}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <div className="comments-section">
                  <label>Comments</label>
                  <textarea
                    className="comments-input"
                    placeholder="Share your experience..."
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Section - Trip Details */}
        {booking && (
          <div className="right-section">


            <div className="address-section">
              <div className="address-group">
                <div className="address-label">📍 Pickup Full Address</div>
                <div className="address-value">
                  <strong>{booking.PickupArea || "Unknown area"}</strong>
                  {booking.PickupFullAddress ? ` — ${booking.PickupFullAddress}` : ""}
                </div>
              </div>
              <div className="address-group">
                <div className="address-label">🎯 Dropoff Full Address</div>
                <div className="address-value">
                  <strong>{booking.DropoffArea || "Unknown area"}</strong>
                  {booking.DropoffFullAddress ? ` — ${booking.DropoffFullAddress}` : ""}
                </div>
              </div>
            </div>

            <div className="trip-details">
              <div className="detail-grid">
                <div className="detail-item">
                  <div className="detail-label">📅 Date</div>
                  <div className="detail-value">{formatDate(booking.RideDate)}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">🕐 Time</div>
                  <div className="detail-value">{formatTime(booking.RideTime || booking.RideDate)}</div>
                </div>
              </div>
            </div>

            <div className="payment-section">
              <h3>Total Amount</h3>
              <div className="amount-breakdown">
                <div className="breakdown-row total">
                  <span>TOTAL:</span>
                  <span className="total-amount">₱{booking.Fare}</span>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn home-btn">Back to Home</button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default PassengerBookingStatus;
