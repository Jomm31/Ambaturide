import React, { useState } from "react";
import "./DriverProfile.css";
import Header from "../Header";

function DriverProfile() {
  const [activeSection, setActiveSection] = useState("profile");
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    lastName: "Tingson",
    firstName: "Carlos John",
    gender: "Male",
    birthdate: "2004-12-25",
    contactNo: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    carBrand: "Toyota",
    carModel: "Vios",
    carColor: "White",
    plateNumber: "ABC123"
  });

  const [tempData, setTempData] = useState({ ...formData });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTempChange = (e) => {
    setTempData({
      ...tempData,
      [e.target.name]: e.target.value
    });
  };

  const startEditing = (fieldName) => {
    setEditingField(fieldName);
    setTempData({ ...formData });
  };

  const saveEdit = (fieldName) => {
    setFormData({ ...tempData });
    setEditingField(null);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempData({ ...formData });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setActiveSection("success");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setActiveSection("passwordSuccess");
  };

  const handleCarInfoChange = (e) => {
    e.preventDefault();
    setActiveSection("carSuccess");
  };

  const handleProfilePictureChange = (e) => {
    // Handle profile picture upload logic here
    console.log("Profile picture changed");
  };

  return (
    <>
      <Header />
      
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <h1 className="profile-title">Profile</h1>
          <div className="passenger-badge">Driver</div>
        </div>

        {/* Main Profile Content */}
        {activeSection === "profile" && (
          <div className="profile-content">
            {/* Personal Info Section */}
            <div className="personal-info-section">
              <div className="info-left">
                {/* Last Name */}
                <div className="info-row">
                  <span className="info-label">Last Name</span>
                  <div className="info-value-container">
                    {editingField === 'lastName' ? (
                      <div className="edit-mode">
                        <input
                          type="text"
                          className="edit-input"
                          value={tempData.lastName}
                          onChange={handleTempChange}
                          name="lastName"
                        />
                        <div className="edit-actions">
                          <button className="save-btn" onClick={() => saveEdit('lastName')}>✓</button>
                          <button className="cancel-btn" onClick={cancelEdit}>✕</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="info-value">{formData.lastName}</span>
                        <span className="edit-icon" onClick={() => startEditing('lastName')}>✏️</span>
                      </>
                    )}
                  </div>
                </div>

                {/* First Name */}
                <div className="info-row">
                  <span className="info-label">First Name</span>
                  <div className="info-value-container">
                    {editingField === 'firstName' ? (
                      <div className="edit-mode">
                        <input
                          type="text"
                          className="edit-input"
                          value={tempData.firstName}
                          onChange={handleTempChange}
                          name="firstName"
                        />
                        <div className="edit-actions">
                          <button className="save-btn" onClick={() => saveEdit('firstName')}>✓</button>
                          <button className="cancel-btn" onClick={cancelEdit}>✕</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="info-value">{formData.firstName}</span>
                        <span className="edit-icon" onClick={() => startEditing('firstName')}>✏️</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Gender */}
                <div className="info-row">
                  <span className="info-label">Gender</span>
                  <div className="info-value-container">
                    {editingField === 'gender' ? (
                      <div className="edit-mode">
                        <select
                          className="edit-input"
                          value={tempData.gender}
                          onChange={handleTempChange}
                          name="gender"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="edit-actions">
                          <button className="save-btn" onClick={() => saveEdit('gender')}>✓</button>
                          <button className="cancel-btn" onClick={cancelEdit}>✕</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="gender-badge">{formData.gender}</span>
                        <span className="edit-icon" onClick={() => startEditing('gender')}>✏️</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Birthdate */}
                <div className="info-row">
                  <span className="info-label">Birthdate</span>
                  <div className="info-value-container">
                    {editingField === 'birthdate' ? (
                      <div className="edit-mode">
                        <input
                          type="date"
                          className="edit-input"
                          value={tempData.birthdate}
                          onChange={handleTempChange}
                          name="birthdate"
                        />
                        <div className="edit-actions">
                          <button className="save-btn" onClick={() => saveEdit('birthdate')}>✓</button>
                          <button className="cancel-btn" onClick={cancelEdit}>✕</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="birthdate-value">
                          <span className="calendar-icon">📅</span>
                          {new Date(formData.birthdate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="edit-icon" onClick={() => startEditing('birthdate')}>✏️</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="profile-picture-section">
                <div className="profile-picture-container">
                  <div className="profile-picture">
                    <span className="profile-number">8</span>
                  </div>
                  <label className="profile-edit-label">
                    <span className="edit-icon profile-edit-icon">✏️</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="profile-file-input"
                    />
                  </label>
                </div>
                <span className="profile-label">Profile</span>
              </div>
            </div>

            {/* Main Content - Three Columns */}
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

              {/* Car Information Panel - Middle */}
              <div className="car-panel">
                <h2 className="panel-title">Car Information</h2>
                
                <div className="form-group">
                  <label className="form-label">Car Brand</label>
                  <div className="car-input-container">
                    {editingField === 'carBrand' ? (
                      <div className="edit-mode">
                        <input
                          type="text"
                          className="edit-input"
                          value={tempData.carBrand}
                          onChange={handleTempChange}
                          name="carBrand"
                        />
                        <div className="edit-actions">
                          <button className="save-btn" onClick={() => saveEdit('carBrand')}>✓</button>
                          <button className="cancel-btn" onClick={cancelEdit}>✕</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="info-value">{formData.carBrand}</span>
                        <span className="edit-icon" onClick={() => startEditing('carBrand')}>✏️</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Car Model</label>
                  <div className="car-input-container">
                    {editingField === 'carModel' ? (
                      <div className="edit-mode">
                        <input
                          type="text"
                          className="edit-input"
                          value={tempData.carModel}
                          onChange={handleTempChange}
                          name="carModel"
                        />
                        <div className="edit-actions">
                          <button className="save-btn" onClick={() => saveEdit('carModel')}>✓</button>
                          <button className="cancel-btn" onClick={cancelEdit}>✕</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="info-value">{formData.carModel}</span>
                        <span className="edit-icon" onClick={() => startEditing('carModel')}>✏️</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Car Color</label>
                  <div className="car-input-container">
                    {editingField === 'carColor' ? (
                      <div className="edit-mode">
                        <input
                          type="text"
                          className="edit-input"
                          value={tempData.carColor}
                          onChange={handleTempChange}
                          name="carColor"
                        />
                        <div className="edit-actions">
                          <button className="save-btn" onClick={() => saveEdit('carColor')}>✓</button>
                          <button className="cancel-btn" onClick={cancelEdit}>✕</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="info-value">{formData.carColor}</span>
                        <span className="edit-icon" onClick={() => startEditing('carColor')}>✏️</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Plate Number</label>
                  <div className="car-input-container">
                    {editingField === 'plateNumber' ? (
                      <div className="edit-mode">
                        <input
                          type="text"
                          className="edit-input"
                          value={tempData.plateNumber}
                          onChange={handleTempChange}
                          name="plateNumber"
                        />
                        <div className="edit-actions">
                          <button className="save-btn" onClick={() => saveEdit('plateNumber')}>✓</button>
                          <button className="cancel-btn" onClick={cancelEdit}>✕</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="info-value">{formData.plateNumber}</span>
                        <span className="edit-icon" onClick={() => startEditing('plateNumber')}>✏️</span>
                      </>
                    )}
                  </div>
                </div>
                
                <button className="yellow-btn confirm-car-btn" onClick={handleCarInfoChange}>
                  Update Car Info
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

        {activeSection === "carSuccess" && (
          <div className="modal-overlay">
            <div className="success-modal">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Car Info Updated!</h2>
              <p className="success-message">Your car information successfully updated</p>
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

export default DriverProfile;