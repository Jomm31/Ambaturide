import { useState } from 'react';
import './DriverSignUp.css';
import Header from '../../Header';
import profilePlaceholder from '../../assets/CEO.jpg';
import philippinesFlag from '../../assets/Philippines.png';
import carPlaceholder from '../../assets/homepage-pic.png';

function DriverSignUp() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    contactNo: '',
    birthdate: '',
    gender: 'Male',
    email: '',
    licenseNo: '',
    carBrand: '',
    plateNo: ''
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLicenseFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLicenseFile(file.name);
    }
  };

  const handleVehicleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVehicleImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="driver-signup-page">
      <Header />
      
      <div className="signup-container">
        <h1 className="signup-title">Create Account</h1>
        
        <div className="driver-badge">Driver</div>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-layout">
            {/* Left Section - Profile & Personal Info */}
            <div className="left-section">
              <div className="profile-upload">
                <div className="profile-circle">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="profile-img" />
                  ) : (
                    <img src={profilePlaceholder} alt="Profile placeholder" className="profile-img" />
                  )}
                </div>
                <label className="profile-label">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 15.75C18 17.4833 17.3917 18.9583 16.175 20.175C14.9583 21.3917 13.4833 22 11.75 22C10.0167 22 8.54167 21.3917 7.325 20.175C6.10833 18.9583 5.5 17.4833 5.5 15.75V6.5C5.5 5.25 5.9375 4.1875 6.8125 3.3125C7.6875 2.4375 8.75 2 10 2C11.25 2 12.3125 2.4375 13.1875 3.3125C14.0625 4.1875 14.5 5.25 14.5 6.5V15.25C14.5 16.0167 14.2333 16.6667 13.7 17.2C13.1667 17.7333 12.5167 18 11.75 18C10.9833 18 10.3333 17.7333 9.8 17.2C9.26667 16.6667 9 16.0167 9 15.25V6H11V15.25C11 15.4667 11.0708 15.6458 11.2125 15.7875C11.3542 15.9292 11.5333 16 11.75 16C11.9667 16 12.1458 15.9292 12.2875 15.7875C12.4292 15.6458 12.5 15.4667 12.5 15.25V6.5C12.4833 5.8 12.2375 5.20833 11.7625 4.725C11.2875 4.24167 10.7 4 10 4C9.3 4 8.70833 4.24167 8.225 4.725C7.74167 5.20833 7.5 5.8 7.5 6.5V15.75C7.48333 16.9333 7.89167 17.9375 8.725 18.7625C9.55833 19.5875 10.5667 20 11.75 20C12.9167 20 13.9083 19.5875 14.725 18.7625C15.5417 17.9375 15.9667 16.9333 16 15.75V6H18V15.75Z" fill="#1D1B20"/>
                  </svg>
                  Profile
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleProfileImageChange}
                    className="file-input"
                  />
                </label>
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Contact No.</label>
                <div className="phone-input">
                  <div className="phone-prefix">
                    <img src={philippinesFlag} alt="PH" className="flag-icon" />
                    <span>+63</span>
                  </div>
                  <input 
                    type="tel" 
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    className="form-input phone-number"
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            {/* Right Section - Additional Info */}
            <div className="right-section">
              <div className="form-group">
                <label>Birthdate</label>
                <div className="date-input-wrapper">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="calendar-icon">
                    <rect width="48" height="48" fill="black"/>
                    <path d="M32 4V12M16 4V12M6 20H42M10 8H38C40.2091 8 42 9.79086 42 12V40C42 42.2091 40.2091 44 38 44H10C7.79086 44 6 42.2091 6 40V12C6 9.79086 7.79086 8 10 8Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input 
                    type="date" 
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    className="form-input date-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Gender</label>
                <div className="gender-select-wrapper">
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="gender-select"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="dropdown-arrow">
                    <path d="M13.5478 24.0291L0.0941271 0.834167L26.8582 0.751645L13.5478 24.0291Z" fill="white"/>
                  </svg>
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Vehicle & Driver Details Section */}
          <div className="vehicle-section">
            <h2 className="section-title">Vehicle & Driver's Details</h2>
            
            <div className="vehicle-layout">
              <div className="vehicle-left">
                <div className="form-group">
                  <label>License No.</label>
                  <input 
                    type="text" 
                    name="licenseNo"
                    value={formData.licenseNo}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Attach your Driver's License Here</label>
                  <label className="attach-button">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M33.0002 28.875C33.0002 32.0527 31.8849 34.7569 29.6543 36.9875C27.4238 39.218 24.7196 40.3333 21.5418 40.3333C18.3641 40.3333 15.6599 39.218 13.4293 36.9875C11.1988 34.7569 10.0835 32.0527 10.0835 28.875V11.9166C10.0835 9.62496 10.8856 7.67704 12.4897 6.07288C14.0939 4.46871 16.0418 3.66663 18.3335 3.66663C20.6252 3.66663 22.5731 4.46871 24.1772 6.07288C25.7814 7.67704 26.5835 9.62496 26.5835 11.9166V27.9583C26.5835 29.3638 26.0946 30.5555 25.1168 31.5333C24.1391 32.5111 22.9474 33 21.5418 33C20.1363 33 18.9446 32.5111 17.9668 31.5333C16.9891 30.5555 16.5002 29.3638 16.5002 27.9583V11H20.1668V27.9583C20.1668 28.3555 20.2967 28.684 20.5564 28.9437C20.8161 29.2034 21.1446 29.3333 21.5418 29.3333C21.9391 29.3333 22.2675 29.2034 22.5272 28.9437C22.787 28.684 22.9168 28.3555 22.9168 27.9583V11.9166C22.8863 10.6333 22.4356 9.54857 21.5647 8.66246C20.6939 7.77635 19.6168 7.33329 18.3335 7.33329C17.0502 7.33329 15.9654 7.77635 15.0793 8.66246C14.1932 9.54857 13.7502 10.6333 13.7502 11.9166V28.875C13.7196 31.0444 14.4682 32.8854 15.996 34.3979C17.5238 35.9104 19.3724 36.6666 21.5418 36.6666C23.6807 36.6666 25.4988 35.9104 26.996 34.3979C28.4932 32.8854 29.2724 31.0444 29.3335 28.875V11H33.0002V28.875Z" fill="white"/>
                    </svg>
                    Attach Here
                    <input 
                      type="file" 
                      onChange={handleLicenseFileChange}
                      className="file-input"
                    />
                  </label>
                  {licenseFile && <p className="file-name">{licenseFile}</p>}
                </div>

                <div className="form-group">
                  <label>Car Brand & Model</label>
                  <input 
                    type="text" 
                    name="carBrand"
                    value={formData.carBrand}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Plate No.</label>
                  <input 
                    type="text" 
                    name="plateNo"
                    value={formData.plateNo}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="vehicle-right">
                <label className="vehicle-photo-label">Photo of Your Vehicle</label>
                <div className="vehicle-photo-box">
                  {vehicleImage ? (
                    <img src={vehicleImage} alt="Vehicle" className="vehicle-img" />
                  ) : (
                    <img src={carPlaceholder} alt="Vehicle placeholder" className="vehicle-img" />
                  )}
                  <label className="attach-photo-button">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M33.0002 28.8751C33.0002 32.0529 31.8849 34.757 29.6543 36.9876C27.4238 39.2181 24.7196 40.3334 21.5418 40.3334C18.3641 40.3334 15.6599 39.2181 13.4293 36.9876C11.1988 34.757 10.0835 32.0529 10.0835 28.8751V11.9167C10.0835 9.62508 10.8856 7.67716 12.4897 6.073C14.0939 4.46883 16.0418 3.66675 18.3335 3.66675C20.6252 3.66675 22.5731 4.46883 24.1772 6.073C25.7814 7.67716 26.5835 9.62508 26.5835 11.9167V27.9584C26.5835 29.364 26.0946 30.5556 25.1168 31.5334C24.1391 32.5112 22.9474 33.0001 21.5418 33.0001C20.1363 33.0001 18.9446 32.5112 17.9668 31.5334C16.9891 30.5556 16.5002 29.364 16.5002 27.9584V11.0001H20.1668V27.9584C20.1668 28.3556 20.2967 28.6841 20.5564 28.9438C20.8161 29.2036 21.1446 29.3334 21.5418 29.3334C21.9391 29.3334 22.2675 29.2036 22.5272 28.9438C22.787 28.6841 22.9168 28.3556 22.9168 27.9584V11.9167C22.8863 10.6334 22.4356 9.54869 21.5647 8.66258C20.6939 7.77647 19.6168 7.33341 18.3335 7.33341C17.0502 7.33341 15.9654 7.77647 15.0793 8.66258C14.1932 9.54869 13.7502 10.6334 13.7502 11.9167V28.8751C13.7196 31.0445 14.4682 32.8855 15.996 34.398C17.5238 35.9105 19.3724 36.6667 21.5418 36.6667C23.6807 36.6667 25.4988 35.9105 26.996 34.398C28.4932 32.8855 29.2724 31.0445 29.3335 28.8751V11.0001H33.0002V28.8751Z" fill="white"/>
                    </svg>
                    Attach Here
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleVehicleImageChange}
                      className="file-input"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default DriverSignUp;
