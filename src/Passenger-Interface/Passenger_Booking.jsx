import React, { useState } from "react";
import Header_Login from "./Header/Header_Login";
import "./Css/Passenger_Booking.css";

// Import icons
import DateIcon from "../assets/Date.png";
import TimeIcon from "../assets/Time.png";
import Car4Icon from "../assets/4_Seaters.png";
import Car6Icon from "../assets/6_Seaters.png";

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
        {/* LEFT SIDE */}
        <div className="left-section">
          <h1>Book a Ride</h1>

          {/* Pickup Area */}
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

          {/* Dropoff Area */}
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

          {/* Date & Time */}
          <div className="date-time">
            <div className="form-group icon-input">
              <img src={DateIcon} alt="Date" className="icon" />
              <input type="date" />
            </div>
            <div className="form-group icon-input">
              <img src={TimeIcon} alt="Time" className="icon" />
              <input type="time" />
            </div>
          </div>

          {/* Total Amount */}
          <div className="total-box">
            <h3>Total Amount</h3>
            <p>Base: Php 50</p>
            {pickup && dropoff && (
              <p>
                {pickup} - {dropoff}: Php 450
              </p>
            )}
            <h2>
              TOTAL: <span>Php 500</span>
            </h2>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-section">
          <div className="form-group">
            <label>Pickup Full Address</label>
            <input type="text" placeholder="Enter full pickup address" />
          </div>
          <div className="form-group">
            <label>Dropoff Full Address</label>
            <input type="text" placeholder="Enter full dropoff address" />
          </div>

          <h3 className="vehicle-title">Type of Vehicles</h3>
<div className="vehicle-options">
  <button className="vehicle-btn four">
    <img src={Car4Icon} alt="4 Seaters" className="car-icon" />
    <span>4 Seaters</span>
  </button>
  <button className="vehicle-btn six">
    <img src={Car6Icon} alt="6 Seaters" className="car-icon" />
    <span>6 Seaters</span>
  </button>
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
