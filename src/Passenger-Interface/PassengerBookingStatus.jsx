// PassengerBookingStatus.jsx
import "./Css/PassengerBookingStatus.css";

function PassengerBookingStatus() {
  return (
    <div className="booking-status-container">
      <h1 className="page-title">Booking Passenger Status</h1>
      
      <div className="content-wrapper">
        {/* Left Section */}
        <div className="left-section">
          <h2 className="section-title">Your Driver</h2>
          
          <div className="driver-info">
            <div className="profile-picture">
              <span>Driver Photo</span>
            </div>
            <div className="driver-name">Obgula, Earl Lawrence</div>
            <div className="driver-phone">09011234578</div>
          </div>
          
          <div className="car-info">
            <div className="car-detail">
              <span className="car-label">Car:</span>
              <span>Nissan Almera</span>
            </div>
            <div className="car-detail">
              <span className="car-label">Plate Number:</span>
              <span>CUM - 69420</span>
            </div>
            <div className="status-badge status-active">Active</div>
          </div>
          
          <div className="report-section">
            <h3>Rate the Driver</h3>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <span key={star} className="star">★</span>
              ))}
            </div>
            <textarea 
              className="comments-input" 
              placeholder="Add your comments here..."
            ></textarea>
          </div>
        </div>
        
        {/* Right Section */}
        <div className="right-section">
          <h2 className="section-title">Trip Details</h2>
          
          <div className="address-info">
            <div className="info-group">
              <div className="info-label">Pickup Full Address</div>
              <div className="info-value">Purok Pagkakaisa, Lubogan, Torli, Davao City</div>
            </div>
            
            <div className="info-group">
              <div className="info-label">Dropoff Full Address</div>
              <div className="info-value">Davao Airport Rd, Sasa, Davao City</div>
            </div>
          </div>
          
          <div className="datetime-info">
            <div className="datetime-details">
              <div className="datetime-item">
                <div className="info-label">Date</div>
                <div className="info-value">Sept. 13, 2025</div>
              </div>
              
              <div className="datetime-item">
                <div className="info-label">Time</div>
                <div className="info-value">9:30 AM</div>
              </div>
            </div>
            
            <div className="info-group">
              <div className="info-label">Type of Vehicle</div>
              <div className="info-value">4 Seaters</div>
            </div>
          </div>
          
          <div className="payment-info">
            <div className="info-group">
              <div className="info-label">Total Amount</div>
              <div className="total-amount">Php 500</div>
              <div className="breakdown">
                <div className="breakdown-item">
                  <span>Base:</span>
                  <span>Php 50</span>
                </div>
                <div className="breakdown-item">
                  <span>Torli - Sasa:</span>
                  <span>Php 450</span>
                </div>
                <div className="breakdown-item">
                  <span>TOTAL:</span>
                  <span>Php 500</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="button-group">
            <button className="btn btn-cancel">Cancel Booking</button>
            <button className="btn btn-home">Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassengerBookingStatus;