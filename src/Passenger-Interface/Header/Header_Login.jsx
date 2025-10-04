import React, { useState } from "react";
import "./Header_Login.css";
import logo from "../../assets/ambaturide-logo.png";
import profileIcon from "../../assets/CEO.jpg";

function Header_Login() {
  const [dropdown, setDropdown] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="logo" className="logo" />
        <span className="brand">AmbatuRIDE</span>
      </div>

      <nav className="header-right">
        <div className="profile-menu" onClick={() => setDropdown(!dropdown)}>
          <img src={profileIcon} alt="profile" className="profile-icon" />
          <span className="profile-name">Eulo Icon Sexcion</span>
          {dropdown && (
            <div className="dropdown">
              <p>Profile</p>
              <p>Log Out</p>
            </div>
          )}
        </div>

        <a href="#">Book a Ride</a>
        <a href="#">Booking Status</a>
        <a href="#">Profile</a>
        <a href="#">About Us</a>
        <a href="#">Help</a>
      </nav>
    </header>
  );
}

export default Header_Login;
