import React, { useState } from "react";
import "./Css/PassengerProfile.css";
import Header from "../Header";

function PassengerProfile() {
  const [activeSection, setActiveSection] = useState("profile");
  const [formData, setFormData] = useState({
    lastName: "Tingson",
    firstName: "Carlos John",
    gender: "Male",
    birthdate: "Dec. 25, 2004",
    contactNo: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setActiveSection("success");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setActiveSection("passwordSuccess");
  };

  return (
    <>
      <Header />
      
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <h1 className="profile-title">Profile</h1>
          <div className="passenger-badge">Passenger</div>
        </div>

        {/* Main Profile Content */}
        {activeSection === "profile" && (
          <div className="profile-content">
            {/* Personal Info Section */}
            <div className="personal-info-section">
              <div className="info-left">
                <div className="info-row">
                  <span className="info-label">Last Name</span>
                  <span className="info-value">{formData.lastName}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">First Name</span>
                  <span className="info-value">{formData.firstName}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Gender</span>
                  <span className="gender-badge">{formData.gender}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Birthdate</span>
                  <span className="birthdate-value">
                    <span className="calendar-icon">📅</span>
                    {formData.birthdate}
                  </span>
                </div>
              </div>
              
              <div className="profile-picture-section">
                <div className="profile-picture">
                  <span className="profile-number">8</span>
                </div>
                <span className="profile-label">Profile</span>
              </div>
            </div>

            {/* Main Content - Two Columns */}
            <div className="main-content">
              {/* Privacy Panel - Left */}
              <div className="privacy-panel">
                <h2 className="panel-title">Privacy</h2>
                
                <div className="form-group">
                  <label className="form-label">Contact No.</label>
                  <div className="phone-input-container">
                    <div className="country-flag">🇵🇭</div>
                    <span className="country-code">+63</span>
                    <input 
                      type="tel"
                      className="phone-input"
                      value={formData.contactNo}
                      onChange={handleInputChange}
                      name="contactNo"
                    />
                    <span className="edit-icon">✏️</span>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="email-input-container">
                    <input 
                      type="email"
                      className="email-input"
                      value={formData.email}
                      onChange={handleInputChange}
                      name="email"
                      placeholder="Enter email address"
                    />
                    <span className="edit-icon">✏️</span>
                  </div>
                </div>
                
                <button className="yellow-btn confirm-change-btn" onClick={handleSaveChanges}>
                  Confirm Change
                </button>
              </div>

              {/* Vertical Divider */}
              <div className="vertical-divider"></div>

              {/* Change Password Panel - Right */}
              <div className="password-panel">
                <h2 className="panel-title">Change Password</h2>
                
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input 
                    type="password"
                    className="password-input"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    name="currentPassword"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input 
                    type="password"
                    className="password-input"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    name="newPassword"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input 
                    type="password"
                    className="password-input"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    name="confirmPassword"
                  />
                </div>
                
                <button className="yellow-btn confirm-password-btn" onClick={handlePasswordChange}>
                  Confirm New Password
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modals */}
        {activeSection === "success" && (
          <div className="modal-overlay">
            <div className="success-modal">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Success!</h2>
              <p className="success-message">Your Email / Contact No. successfully changed</p>
              <button 
                className="yellow-btn back-home-btn"
                onClick={() => setActiveSection("profile")}
              >
                Back to Home
              </button>
            </div>
          </div>
        )}

        {activeSection === "passwordSuccess" && (
          <div className="modal-overlay">
            <div className="success-modal">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Password Changed!</h2>
              <p className="success-message">Your password successfully changed</p>
              <button 
                className="yellow-btn back-home-btn"
                onClick={() => setActiveSection("profile")}
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PassengerProfile;