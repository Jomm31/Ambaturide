import React, { useState } from "react";
import Header_Login from "./Header/Header_Login";
import "./Css/Passenger_Booking.css";

function Passenger_Booking() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const areas = [
    "Toril",
    "Mintal",
    "Catalunan",
    "Bago Gallera",
    "Ulas",
    "Bankal",
    "Matina Crossing",
    "Maa",
    "Ecoland",
    "Roxas",
    "Magsaysay",
    "Agdao",
    "Buhangin",
    "Lanang",
    "Sasa",
  ];

  return (
    <>
      <Header_Login />
      <div className="booking-container">
        {/* Left Side */}
        <div className="left-section">
          <h1>Book a Ride</h1>

          <div className="form-group">
            <select value={pickup} onChange={(e) => setPickup(e.target.value)}>
              <option value="">Pickup Area</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select value={dropoff} onChange={(e) => setDropoff(e.target.value)}>
              <option value="">Dropoff Area</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="date-time">
            <div className="form-group">
              <label>Date</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="time" />
            </div>
          </div>

          <div className="total-box">
            <h3>Total Amount</h3>
            <p>Base: Php 50</p>
            <p>Toril - Sasa: Php 450</p>
            <h2>TOTAL: Php 500</h2>
          </div>
        </div>

        {/* Right Side */}
        <div className="right-section">
          <div className="form-group">
            <label>Pickup Full Address</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Dropoff Full Address</label>
            <input type="text" />
          </div>

          <div className="vehicle-options">
            <button className="vehicle-btn four">🚗 4 Seaters</button>
            <button className="vehicle-btn six">🚙 6 Seaters</button>
          </div>

          <div className="action-buttons">
            <button className="back-btn">Back</button>
            <button className="confirm-btn">Confirm</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Passenger_Booking;
