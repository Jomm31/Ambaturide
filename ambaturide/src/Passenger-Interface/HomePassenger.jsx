import React from "react";
import "./HomePassenger.css";

import homepageImg from "../assets/Homepage pic (1).png";
import ambatuLogo from "../assets/AmbatuRIDE LOGO.png";
import dateIcon from "../assets/Date.png";
import timeIcon from "../assets/Time.png";
import Header from "../Header";

function HomePassenger() {
  return (
    <>
      <Header />

      <div className="home-container">
        {/* Left Section */}
        <div className="form-section">
          <h1 className="headline">Go Anywhere</h1>
          <p className="with-text">
            with <img src={ambatuLogo} alt="AmbatuRIDE Logo" className="mini-logo" />
            <span className="logo-text">AmbatuRIDE</span>
          </p>

          {/* Pickup & Dropoff */}
          <input type="text" placeholder="Pickup Location" className="input-box" />
          <input type="text" placeholder="Dropoff Location" className="input-box" />

          {/* Date & Time */}
          <div className="date-time-row">
            <button className="date-btn">
              <img src={dateIcon} alt="Date" className="icon-img" />
              Today?
            </button>
            <button className="time-btn">
              <img src={timeIcon} alt="Time" className="icon-img" />
              Now?
            </button>
          </div>

          {/* See Prices */}
          <button className="see-prices-btn">See Prices</button>
        </div>

        {/* Right Section */}
        <div className="image-section">
          <img src={homepageImg} alt="Homepage Illustration" className="homepage-img" />
        </div>
      </div>
    </>
  );
}

export default HomePassenger;