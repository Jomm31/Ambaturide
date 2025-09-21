import React from "react";
import "./HomePassenger.css";

import homepageImg from "../assets/Homepage pic (1).png";
import ambatuLogo from "../assets/AmbatuRIDE LOGO.png";
import dateIcon from "../assets/Date.png";
import timeIcon from "../assets/Time.png";
import Header from "../Header";

// New images for How it Works + City Illustration
import how1 from "../assets/How it Works(1).png";
import how2 from "../assets/How it Works(2).png";
import how3 from "../assets/How it Works(3).png";
import cityIllustration from "../assets/Homepage pic(2).png";

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

      {/* This is How it Works Section */}
      <div className="how-it-works-section">
        <h2 className="how-headline">This is how it works</h2>

        <div className="how-step">
          <img src={how1} alt="Book a Ride" className="how-img" />
          <div className="how-text">
            <h3>Book a Ride</h3>
            <p>
              Open AmbatuRIDE, choose your destination, and request a driver with just a few taps.
            </p>
          </div>
        </div>

        <div className="how-step">
          <img src={how2} alt="Wait for your Driver" className="how-img" />
          <div className="how-text">
            <h3>Wait for your Driver</h3>
            <p>
              A nearby driver will accept your request and pick you up at your chosen location.
            </p>
          </div>
        </div>

        <div className="how-step">
          <img src={how3} alt="Arrive with Satisfaction" className="how-img" />
          <div className="how-text">
            <h3>Arrive with Satisfaction</h3>
            <p>
              Enjoy a safe and comfortable ride until you reach your destination with ease.
            </p>
          </div>
        </div>
      </div>

      {/* City Illustration */}
      <div className="city-illustration">
        <img src={cityIllustration} alt="City Illustration" />
      </div>
    </>
  );
}

export default HomePassenger;
