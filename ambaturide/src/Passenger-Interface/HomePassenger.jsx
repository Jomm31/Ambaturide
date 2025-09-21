import React from "react";
import "./HomePassenger.css";

import homepageImg from "../assets/Homepage pic (1).png";
import ambatuLogo from "../assets/AmbatuRIDE LOGO.png";
import dateIcon from "../assets/Date.png";
import timeIcon from "../assets/Time.png";
import Header from "../Header";

// New images
import how1 from "../assets/How it Works(1).png";
import how2 from "../assets/How it Works(2).png";
import how3 from "../assets/How it Works(3).png";
import cityIllustration from "../assets/Homepage pic(2).png";
import ceoImg from "../assets/CEO.jpg";
import historyBg from "../assets/Homepage(3).png";
import phFlag from "../assets/Philippines.png";
import Logo from "../assets/AmbatuRIDE Logo.png";
import SocialMedia from "../assets/SocialMedia.png";
import PhoneIcon from "../assets/Phone call.png";
import QRCode from "../assets/QRCODE.png";

function HomePassenger() {
  return (
    <>
      <Header />

      {/* Top Hero Section */}
      <div className="home-container">
        {/* Left Section */}
        <div className="form-section">
          <h1 className="headline">Go Anywhere</h1>
          <p className="with-text">
            with{" "}
            <img src={ambatuLogo} alt="AmbatuRIDE Logo" className="mini-logo" />
            <span className="logo-text">AmbatuRIDE</span>
          </p>

          <input type="text" placeholder="Pickup Location" className="input-box" />
          <input type="text" placeholder="Dropoff Location" className="input-box" />

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

          <button className="see-prices-btn">See Prices</button>
        </div>

        {/* Right Section */}
        <div className="image-section">
          <img src={homepageImg} alt="Homepage Illustration" className="homepage-img" />
        </div>
      </div>

      {/* How it Works Section */}
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

      {/* About AmbatuRIDE Section */}
      <section className="about-section">
        <div className="about-left">
          <h2>
            About <span className="highlight">Ambatu</span>RIDE
          </h2>
        </div>
        <div className="about-right">
          <img src={ceoImg} alt="CEO" className="ceo-img" />
          <div className="ceo-info">
            <h3>Mr. Perell Brown</h3>
            <p>CEO and Founder of AmbatuRIDE</p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <div className="history-section">
        <div className="history-overlay">
          <h2>
            History of <span className="highlight">AmbatuRIDE</span>
          </h2>
          <p>Long ago, in the year of legends, one man had a dream…</p>
          <p>
            Mr Perell "Dreamybull" Brown saw the struggles of everyday commuters: waiting in the heat,
            waving at taxis that never stopped, and walking miles just to get home.
          </p>
          <p>
            He said one line that changed everything: <br />
            <em>"Ambatu… give these people a ride."</em>
          </p>
          <p>
            From that moment, AmbatuRIDE was born — a ride-hailing service built with passion and determination.
          </p>
        </div>

        <div className="history-image">
          <img src={historyBg} alt="AmbatuRIDE History" />
        </div>
      </div>

      {/* Contact Number Input with Flag */}

 <div className="contact-container">
  <h1 className="contact-title">Help/Contact Us</h1>
  <form className="contact-form">
    {/* Left side */}
    <div className="form-left">
      <label>Last Name</label>
      <input type="text" className="input-field" />

      <label>First Name</label>
      <input type="text" className="input-field" />

      <label>Contact No.</label>
      <div className="contact-field">
        <img src={phFlag} alt="Philippines Flag" className="flag-icon" />
        <span className="country-code">+63</span>
        <input type="text" className="contact-input" />
      </div>

      <label>Email Address</label>
      <input type="email" className="input-field" />

      <button type="submit" className="confirm-btn">Confirm</button>
    </div>

    {/* Right side */}
    <div className="form-right">
      <label>Message Here</label>
      <textarea className="message-box"></textarea>

      <label>Attachment</label>
      <div className="attachment-field">
        <input type="file" className="file-input" />
      </div>
    </div>
  </form>
</div>


    <footer className="footer">
      {/* Left: Logo and Socials */}
      <div className="footer-left">
        <img src={Logo} alt="AmbatuRIDE Logo" className="footer-logo" />
        <img src={SocialMedia} alt="Social Media" className="footer-socials" />
      </div>

      {/* Center: Nav + Auth + Phone */}
      <div className="footer-center">
  <div className="footer-links-auth">
    <ul className="footer-links">
      <li>Book a Ride</li>
      <li>Login</li>
      <li>Sign Up</li>
      <li>Contact Us / Help</li>
      <li>Profile</li>
      <li>About Us</li>
    </ul>
  </div>
  <div className="footer-contact">
    <img src={PhoneIcon} alt="Phone" className="footer-phone-icon" />
    <span className="footer-phone-number">63+ 920 401 4206</span>
  </div>
</div>

      {/* Right: QR Code */}
      <div className="footer-right">
        <div className="footer-qr-bg">
          <img src={QRCode} alt="QR Code" className="footer-qr" />
        </div>
      </div>
    </footer>

    </>
  );
}

export default HomePassenger;
