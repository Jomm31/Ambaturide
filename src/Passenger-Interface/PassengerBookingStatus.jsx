import { useState } from "react";
import "./Css/PassengerBookingStatus.css";
import logo from "../assets/ambaturide-logo.png";

function PassengerBookingStatus() {
  const [bookingStatus, setBookingStatus] = useState("assigned"); // "pending" or "assigned"
  const [rating, setRating] = useState(0);

  return (
    <div className="booking-status-container">
      <div className="booking-card">
        {/* Left Section - Status or Driver Info */}
        <div className="left-section">
          {bookingStatus === "pending" ? (
            // Pending State
            <div className="pending-state">
              <h2 className="wait-title">Wait for your Driver</h2>
              <div className="status-badge-pending">Pending</div>
              <img src={logo} alt="AmbatURIDE" className="pending-logo" />
            </div>
          ) : (
            // Driver Assigned State
            <>
              <div className="driver-assigned-header">
                <h2 className="section-title">Your Driver</h2>
              </div>
              
              <div className="driver-profile">
                <div className="profile-picture">
                  <div className="driver-img-placeholder">👤</div>
                </div>
                <div className="driver-details">
                  <h3>Obguia, Earl Lawrence</h3>
                  <p>📞 09011234578</p>
                </div>
              </div>

              <div className="vehicle-info">
                <div className="car-image">
                  <div className="car-img-placeholder">🚗</div>
                </div>
                <div className="car-details">
                  <div className="detail-row">
                    <span className="label">Plate Number:</span>
                    <span className="value">CUM - 69420</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Model:</span>
                    <span className="value">Nissan Almera</span>
                  </div>
                </div>
                <div className="status-indicator">
                  <span className="status-badge-active">⚠️ Restricted Level</span>
                </div>
              </div>

              <div className="rating-section">
                <h4>Rate the Driver</h4>
                <div className="stars-container">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      className={`star-btn ${rating >= star ? 'filled' : ''}`}
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
        <div className="right-section">
          <div className="address-section">
            <div className="address-group">
              <div className="address-label">📍 Pickup Full Address</div>
              <div className="address-value">
                Purok Pagkakaisa, Lubogan, Torli, Davao City
              </div>
            </div>
            
            <div className="address-group">
              <div className="address-label">🎯 Dropoff Full Address</div>
              <div className="address-value">
                Davao Airport Rd, Sasa, Davao City
              </div>
            </div>
          </div>

          <div className="trip-details">
            <div className="detail-grid">
              <div className="detail-item">
                <div className="detail-label">📅 Date</div>
                <div className="detail-value">Sept. 13, 2025</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">🕐 Time</div>
                <div className="detail-value">9:30 AM</div>
              </div>
              <div className="detail-item full-width">
                <div className="detail-label">🚗 Type of Vehicle</div>
                <div className="detail-value">4 Seaters</div>
              </div>
            </div>
          </div>

          <div className="payment-section">
            <h3>Total Amount</h3>
            <div className="amount-breakdown">
              <div className="breakdown-row">
                <span>Base:</span>
                <span>Php 50</span>
              </div>
              <div className="breakdown-row">
                <span>Torli - Sasa:</span>
                <span>Php 450</span>
              </div>
              <div className="breakdown-row total">
                <span>TOTAL:</span>
                <span className="total-amount">Php 500</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            {bookingStatus === "pending" ? (
              <button className="btn confirm-btn">Confirm Booking</button>
            ) : (
              <button className="btn home-btn">Back to Home</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassengerBookingStatus;