import React, { useState } from "react";
import Header_Login from "../../src/Header.jsx";
import "./Css/Passenger_Booking.css";

// Import icons
import DateIcon from "../assets/Date.png";
import TimeIcon from "../assets/Time.png";
import Car4Icon from "../assets/4_Seaters.png";
import Car6Icon from "../assets/6_Seaters.png";

function Passenger_Booking() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const areas = [
    "Toril", "Mintal", "Catalunan", "Bago Gallera", "Ulas",
    "Bankal", "Matina Crossing", "Maa", "Ecoland", "Roxas",
    "Magsaysay", "Agdao", "Buhangin", "Lanang", "Sasa"
  ];

  const calculateTotal = () => {
    const baseFare = 50;
    const distanceFare = pickup && dropoff ? 450 : 0;
    return baseFare + distanceFare;
  };

  const handleConfirmBooking = async () => {
  const savedPassenger = JSON.parse(localStorage.getItem("passenger"));
  if (!savedPassenger || !savedPassenger.PassengerID) {
    alert("Please log in first.");
    return;
  }

  const bookingData = {
    PassengerID: savedPassenger.PassengerID,
    PickupArea: pickup,
    DropoffArea: dropoff,
    PickupFullAddress: pickupAddress,
    DropoffFullAddress: dropoffAddress,
    RideDate: date,
    RideTime: time,
    VehicleType: selectedVehicle === "4-seater" ? "4 Seaters" : "6 Seaters",
    Fare: selectedVehicle === "4-seater" ? 500 : 600
  };

  try {
    const response = await fetch("http://localhost:5000/api/passenger/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    });

    const data = await response.json();
    if (data.success) {
      alert("✅ Booking confirmed!");
      // optionally reset fields
      setPickup("");
      setDropoff("");
      setPickupAddress("");
      setDropoffAddress("");
      setDate("");
      setTime("");
      setSelectedVehicle("");
    } else {
      alert("❌ " + data.message);
    }
  } catch (err) {
    console.error("Error submitting booking:", err);
    alert("Something went wrong.");
  }
};


  return (
    <>
      <Header_Login />
      <div className="booking-container">
        <div className="booking-card">
          {/* LEFT SIDE */}
          <div className="left-section">
            <div className="section-header">
              <h1 className="main-title">Book a Ride</h1>
              <p className="subtitle">Get where you need to go with AmbatuRIDE</p>
            </div>

            {/* Pickup Area */}
            <div className="form-group">
              <label className="form-label">Pickup Area</label>
              <div className="select-wrapper">
                <select 
                  value={pickup} 
                  onChange={(e) => setPickup(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select pickup area</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">▼</div>
              </div>
            </div>

            {/* Dropoff Area */}
            <div className="form-group">
              <label className="form-label">Dropoff Area</label>
              <div className="select-wrapper">
                <select 
                  value={dropoff} 
                  onChange={(e) => setDropoff(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select dropoff area</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">▼</div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="datetime-section">
              <div className="form-group">
                <label className="form-label">Date</label>
                <div className="icon-input">
                  <img src={DateIcon} alt="Date" className="input-icon" />
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Time</label>
                <div className="icon-input">
                  <img src={TimeIcon} alt="Time" className="input-icon" />
                  <input 
                    type="time" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Total Amount */}
            <div className="total-box">
              <h3 className="total-title">Trip Summary</h3>
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Base Fare</span>
                  <span>₱50</span>
                </div>
                {pickup && dropoff && (
                  <div className="price-row">
                    <span>{pickup} - {dropoff}</span>
                    <span>₱450</span>
                  </div>
                )}
                <div className="price-divider"></div>
                <div className="price-row total">
                  <span>TOTAL</span>
                  <span className="total-amount">₱{calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="right-section">
            <div className="address-section">
              <div className="form-group">
                <label className="form-label">Pickup Full Address</label>
                <input 
                  type="text" 
                  placeholder="Enter full pickup address (street, building, landmark)"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Dropoff Full Address</label>
                <input 
                  type="text" 
                  placeholder="Enter full dropoff address (street, building, landmark)"
                  value={dropoffAddress}
                  onChange={(e) => setDropoffAddress(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="vehicle-section">
              <h3 className="section-title">Choose Your Vehicle</h3>
              <div className="vehicle-options">
                <button 
                  className={`vehicle-btn ${selectedVehicle === '4-seater' ? 'selected four' : 'four'}`}
                  onClick={() => setSelectedVehicle('4-seater')}
                >
                  <img src={Car4Icon} alt="4 Seaters" className="car-icon" />
                  <span className="vehicle-name">4 Seaters</span>
                  <span className="vehicle-price">₱500</span>
                </button>
                <button 
                  className={`vehicle-btn ${selectedVehicle === '6-seater' ? 'selected six' : 'six'}`}
                  onClick={() => setSelectedVehicle('6-seater')}
                >
                  <img src={Car6Icon} alt="6 Seaters" className="car-icon" />
                  <span className="vehicle-name">6 Seaters</span>
                  <span className="vehicle-price">₱600</span>
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="back-btn">
                <span className="btn-text">Back</span>
              </button>
              <button className="confirm-btn" onClick={handleConfirmBooking}>
                <span className="btn-text">Confirm Booking</span>
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Passenger_Booking;