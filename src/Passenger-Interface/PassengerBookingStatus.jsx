import { useState } from "react";
import "./Css/PassengerBookingStatus.css";
import Header_Login from "./Header/Header_Login";
import carIcon from "../assets/4_Seaters.png";

function PassengerBookingStatus() {
  const [hasDriver, setHasDriver] = useState(false); // Toggle between pending and driver assigned

  return (
    <div className="booking-status-page">
      <Header_Login />

      {/* Dev Toggle - Remove in production */}
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <button
          onClick={() => setHasDriver(!hasDriver)}
          style={{
            background: '#FCD223',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Toggle State: {hasDriver ? 'Driver Assigned' : 'Pending'}
        </button>
      </div>

      <div className="booking-status-container">
        {/* Left Panel */}
        <div className={`left-panel ${hasDriver ? 'has-driver' : 'pending'}`}>
          {!hasDriver ? (
            <div className="pending-state">
              <h2 className="status-title">Wait for your Driver</h2>
              <div className="status-badge">Pending</div>
              <div className="logo-container">
                <span className="logo-text-ambatu">Ambatu</span>
                <span className="logo-text-ride">RIDE</span>
              </div>
            </div>
          ) : (
            <div className="driver-state">
              <h2 className="driver-panel-title">Your Driver</h2>
              
              <div className="driver-card">
                <div className="driver-photo">
                  <img src={carIcon} alt="Driver" className="driver-img" />
                </div>
                
                <h3 className="driver-name">Obguia, Earl Lawrence</h3>
                
                <div className="driver-contact">
                  <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5583 7.5C18.6979 7.78585 19.7451 8.50239 20.5661 9.5579C21.387 10.6134 21.9443 11.9599 22.1667 13.425M17.5583 1.5C19.9258 1.83815 22.1335 3.20126 23.819 5.36551C25.5044 7.52976 26.5673 10.3665 26.8333 13.41M25.6667 25.38V29.88C25.668 30.2978 25.6014 30.7113 25.4713 31.094C25.3411 31.4768 25.1502 31.8204 24.9108 32.1028C24.6713 32.3852 24.3887 32.6002 24.0809 32.7341C23.7731 32.8679 23.4469 32.9176 23.1233 32.88C19.5333 32.3785 16.0848 30.8012 13.055 28.275C10.2361 25.972 7.84623 22.8993 6.055 19.275C4.08331 15.3618 2.85629 10.9065 2.47334 6.27C2.44418 5.8552 2.48252 5.43714 2.58592 5.04244C2.68932 4.64773 2.8555 4.28503 3.0739 3.97743C3.29229 3.66983 3.55811 3.42406 3.85443 3.25578C4.15074 3.0875 4.47107 3.00039 4.795 3H8.295C8.86119 2.99284 9.41009 3.25062 9.83939 3.7253C10.2687 4.19998 10.5491 4.85917 10.6283 5.58C10.7761 7.0201 11.05 8.43409 11.445 9.795C11.602 10.3319 11.6359 10.9154 11.5429 11.4763C11.4498 12.0373 11.2337 12.5522 10.92 12.96L9.43834 14.865C11.0992 18.6203 13.5175 21.7297 16.4383 23.865L17.92 21.96C18.2372 21.5567 18.6377 21.2788 19.074 21.1591C19.5103 21.0395 19.9641 21.0832 20.3817 21.285C21.4402 21.7928 22.5399 22.1451 23.66 22.335C24.2267 22.4378 24.7443 22.8048 25.1143 23.3662C25.4843 23.9277 25.6809 24.6444 25.6667 25.38Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="phone-number">09011234578</span>
                </div>

                <div className="car-details">
                  <div className="car-section">
                    <span className="car-label">Car</span>
                    <img src={carIcon} alt="Car" className="car-image" />
                    <div className="car-zoom-icon">
                      <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.625 28.875L24.2812 22.8937M16.0417 11V19.25M11.6667 15.125H20.4167M27.7083 15.125C27.7083 21.2001 22.485 26.125 16.0417 26.125C9.59834 26.125 4.375 21.2001 4.375 15.125C4.375 9.04987 9.59834 4.125 16.0417 4.125C22.485 4.125 27.7083 9.04987 27.7083 15.125Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="car-name">Nissan Almera</p>
                  </div>

                  <div className="plate-section">
                    <span className="plate-label">Plate Number</span>
                    <div className="plate-number">CUM - 69420</div>
                  </div>
                </div>

                <button className="report-driver-btn">
                  <svg width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 5L25 15L35 16.5L27.5 23.5L29 33.5L20 28.5L11 33.5L12.5 23.5L5 16.5L15 15L20 5Z" fill="#8F1F1F"/>
                  </svg>
                  <span>Report Driver</span>
                </button>

                <div className="rating-section">
                  <h4 className="rating-title">Rate the Driver</h4>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 4L30.18 16.52L44 18.54L34 28.28L36.36 42.04L24 35.54L11.64 42.04L14 28.28L4 18.54L17.82 16.52L24 4Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ))}
                  </div>
                  <div className="comments-section">
                    <label className="comments-label">Comments</label>
                    <textarea className="comments-textarea" placeholder="Write your feedback..."></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="booking-details">
            <div className="address-section">
              <h3 className="address-title">
                <span className="location-dot"></span>
                Pickup Full Address
              </h3>
              <p className="address-text">Purok Pagkakaisa, Lubogan, Toril, Davao City</p>
            </div>

            <div className="address-divider"></div>

            <div className="address-section">
              <h3 className="address-title">
                <span className="location-square"></span>
                Dropoff Full Address
              </h3>
              <p className="address-text">Davao Airport Rd, Sasa, Davao City</p>
            </div>

            <div className="datetime-vehicle-section">
              <div className="datetime-group">
                <div className="datetime-item">
                  <label className="datetime-label">
                    <svg width="41" height="38" viewBox="0 0 41 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M27.3333 3.16675V9.50008M13.6667 3.16675V9.50008M5.125 15.8334H35.875M8.54167 6.33341H32.4583C34.3453 6.33341 35.875 7.75118 35.875 9.50008V31.6667C35.875 33.4156 34.3453 34.8334 32.4583 34.8334H8.54167C6.65469 34.8334 5.125 33.4156 5.125 31.6667V9.50008C5.125 7.75118 6.65469 6.33341 8.54167 6.33341Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Date
                  </label>
                  <div className="datetime-value">Sept. 13, 2025</div>
                </div>

                <div className="datetime-item">
                  <label className="datetime-label">
                    <svg width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.0002 9.50008V19.0001L26.6668 22.1667M36.6668 19.0001C36.6668 27.7446 29.2049 34.8334 20.0002 34.8334C10.7954 34.8334 3.3335 27.7446 3.3335 19.0001C3.3335 10.2556 10.7954 3.16675 20.0002 3.16675C29.2049 3.16675 36.6668 10.2556 36.6668 19.0001Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Time
                  </label>
                  <div className="datetime-value">9:30 AM</div>
                </div>
              </div>

              <div className="vehicle-section">
                <label className="vehicle-label">Type of Vehicle</label>
                <img src={carIcon} alt="Vehicle" className="vehicle-icon" />
                <p className="vehicle-type">4 Seaters</p>
              </div>
            </div>

            <div className="total-amount-section">
              <h3 className="total-title">Total Amount</h3>
              <div className="amount-breakdown">
                <div className="breakdown-row">
                  <span>Base.: Php 50</span>
                </div>
                <div className="breakdown-row">
                  <span>Toril - Sasa: Php 450</span>
                </div>
                <div className="breakdown-divider"></div>
                <div className="breakdown-row total-row">
                  <span>TOTAL:</span>
                  <span className="total-price">Php 500</span>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="cancel-btn">Cancel Booking</button>
              <button className="home-btn">Back to Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassengerBookingStatus;