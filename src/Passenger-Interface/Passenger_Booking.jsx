import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header_Login from "../../src/Header.jsx";
import "./Css/Passenger_Booking.css";

// Import icons
import DateIcon from "../assets/Date.png";
import TimeIcon from "../assets/Time.png";
import Car4Icon from "../assets/4_Seaters.png";
import Car6Icon from "../assets/6_Seaters.png";

function Passenger_Booking() {
  const navigate = useNavigate();
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

  // Local distance matrix (km) between major areas — add / tweak values as needed.
  const distanceMatrix = {
    "Toril": { "Mintal": 8, "Catalunan": 12, "Bago Gallera": 5, "Ulas": 15, "Lanang": 25, "Maa": 18 },
    "Mintal": { "Toril": 8, "Catalunan": 6, "Ulas": 12, "Roxas": 18, "Lanang": 22 },
    "Catalunan": { "Mintal": 6, "Maa": 10, "Ecoland": 13, "Lanang": 20 },
    "Bago Gallera": { "Toril": 5, "Ulas": 10, "Maa": 13 },
    "Ulas": { "Matina Crossing": 5, "Maa": 6, "Ecoland": 8, "Lanang": 15 },
    "Matina Crossing": { "Maa": 3, "Ecoland": 4, "Roxas": 6, "Lanang": 12 },
    "Maa": { "Ecoland": 5, "Roxas": 7, "Lanang": 10, "Sasa": 12 },
    "Ecoland": { "Roxas": 5, "Agdao": 8, "Lanang": 10 },
    "Roxas": { "Magsaysay": 2, "Agdao": 4, "Buhangin": 6 },
    "Magsaysay": { "Agdao": 3, "Buhangin": 5 },
    "Agdao": { "Buhangin": 4, "Lanang": 6, "Sasa": 8 },
    "Buhangin": { "Lanang": 5, "Sasa": 7 },
    "Lanang": { "Sasa": 3, "Toril": 25 },
    "Sasa": { "Lanang": 3 },
    // add more if needed
  };

  // helper: get local YYYY-MM-DD (avoid timezone shift)
  const getTodayLocal = () => {
    const t = new Date();
    const y = t.getFullYear();
    const m = String(t.getMonth() + 1).padStart(2, "0");
    const d = String(t.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  const todayMin = getTodayLocal();

  // calculate fare using distance matrix
  const getDistance = () => {
    if (!pickup || !dropoff || pickup === dropoff) return 0;
    return (
      distanceMatrix[pickup]?.[dropoff] ||
      distanceMatrix[dropoff]?.[pickup] ||
      10
    ); // default km when unknown
  };

  const calculateTotal = () => {
    const baseFare = 50;
    const ratePerKm = selectedVehicle === "6-seater" ? 20 : 15;

    const dist = getDistance();
    if (dist === 0) return baseFare;

    const distanceFare = Math.round(dist * ratePerKm);
    return baseFare + distanceFare;
  };

  const handleConfirmBooking = async () => {
    const savedPassenger = JSON.parse(localStorage.getItem("passenger"));
    if (!savedPassenger || !savedPassenger.PassengerID) {
      alert("Please log in first.");
      return;
    }

    // client-side validation: all fields required
    if (!pickup) { alert("Please select Pickup Area."); return; }
    if (!dropoff) { alert("Please select Dropoff Area."); return; }
    if (pickup === dropoff) { alert("Pickup and Dropoff cannot be the same."); return; }
    if (!pickupAddress.trim()) { alert("Please enter the full pickup address."); return; }
    if (!dropoffAddress.trim()) { alert("Please enter the full dropoff address."); return; }
    if (!date) { alert("Please choose a ride date."); return; }
    if (!time) { alert("Please choose a ride time."); return; }
    if (!selectedVehicle) { alert("Please choose a vehicle type."); return; }

    // Prevent multiple active bookings: check existing booking first
    try {
      const checkRes = await fetch(
        `http://localhost:5000/api/passenger/${savedPassenger.PassengerID}/booking`
      );
      const checkData = await checkRes.json();
      const existing = checkData.booking;

      // treat these statuses as "active" bookings that block new bookings
      const activeStatuses = ["pending", "accepted", "assigned", "active"];
      if (existing && activeStatuses.includes((existing.Status || "").toLowerCase())) {
        alert("You already have an active booking. Please cancel it first to book another.");
        // redirect to booking status so user can cancel/view it
        navigate("/PassengerBookingStatus", { state: { booking: existing } });
        return;
      }
    } catch (err) {
      console.warn("Could not verify existing booking, proceeding with booking attempt:", err);
      // optionally: return here to be safe. Currently we proceed.
    }

    const bookingData = {
      PassengerID: savedPassenger.PassengerID,
      PickupArea: pickup,
      DropoffArea: dropoff,
      PickupFullAddress: pickupAddress,
      DropoffFullAddress: dropoffAddress,
      RideDate: date, // keep as YYYY-MM-DD string to avoid timezone shifting on server
      RideTime: time,
      VehicleType: selectedVehicle === "4-seater" ? "4 Seaters" : "6 Seaters",
      Fare: calculateTotal()
    };

    try {
      const response = await fetch("http://localhost:5000/api/passenger/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();
      if (data.success) {
        navigate("/PassengerBookingStatus", { state: { booking: data.booking || null } });
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
                  <input 
                    type="date" 
                    value={date}
                    min={todayMin}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Time</label>
                <div className="icon-input">
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
                  <span>₱15/km</span>
                </div>

                {pickup && dropoff && pickup !== dropoff && (
                  <>
                    <div className="price-row">
                      <span>{pickup} - {dropoff}</span>
                      <span>₱{Math.round(getDistance() * (selectedVehicle === "6-seater" ? 20 : 15))}</span>
                    </div>

                    <div className="price-row">
                      <span>Distance</span>
                      <span>{getDistance()} km</span>
                    </div>
                  </>
                )}

                {selectedVehicle && (
                  <div className="price-row">
                    <span>Vehicle</span>
                    <span>{selectedVehicle === "6-seater" ? "6 Seaters (₱20/km)" : "4 Seaters (₱15/km)"}</span>
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
                  <span className="vehicle-price">₱15/km</span>
                </button>
                <button 
                  className={`vehicle-btn ${selectedVehicle === '6-seater' ? 'selected six' : 'six'}`}
                  onClick={() => setSelectedVehicle('6-seater')}
                >
                  <img src={Car6Icon} alt="6 Seaters" className="car-icon" />
                  <span className="vehicle-name">6 Seaters</span>
                  <span className="vehicle-price">₱20/km</span>
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