import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DriverSignUp.css';
import DriverHeader from '../../../src/DriverHeader.jsx'

function DriverSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    vehicleType: '',
    vehiclePlate: ''
  });
  const [licenseImage, setLicenseImage] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLicenseImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLicenseImage(file);
    }
  };

  const handleVehicleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVehicleImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password, confirmPassword, licenseNumber, vehicleType, vehiclePlate } = formData;

    if (!email || !password || !confirmPassword || !licenseNumber || !vehicleType || !vehiclePlate) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!licenseImage || !vehicleImage) {
      setError('Please upload both images');
      return;
    }

    try {
      const data = new FormData();
      data.append("firstName", "Driver");
      data.append("lastName", "User");
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("licenseNumber", formData.licenseNumber);
      data.append("vehicleType", formData.vehicleType); // Now sending the actual value directly
      data.append("plateNumber", formData.vehiclePlate);
      data.append("licenseImage", licenseImage);
      data.append("vehicleImage", vehicleImage);

      console.log("📤 Sending data:", {
        email: formData.email,
        vehicleType: formData.vehicleType,
        plateNumber: formData.vehiclePlate
      });

      const res = await fetch("http://localhost:5000/api/driver/signup", {
        method: "POST",
        body: data
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Failed to register driver");
        return;
      }

      alert("✅ Driver registered successfully!");
      navigate("/DriverLogin");

    } catch (err) {
      console.error(err);
      setError("Server error occurred");
    }
  };

  return (
    <>
      <DriverHeader/>
      <div className="app-container">
        <div className="homepage-container">
          <div className="form-content">
            <div className="login-header">
              <h2>Become a Driver</h2>
              <p>Create your driver account and start earning</p>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-columns">
                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="email">Email or Phone Number</label>
                    <input 
                      type="text" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email or phone number"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-input-container">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                      />
                      <button 
                        type="button" 
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="password-input-container">
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        required
                      />
                      <button 
                        type="button" 
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  {/* Driver License Information */}
                  <div className="form-group">
                    <label htmlFor="licenseNumber">Driver's License Number</label>
                    <input 
                      type="text" 
                      id="licenseNumber"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your driver's license number"
                      required
                    />
                  </div>
                </div>

                <div className="form-column">
                  {/* Vehicle Information */}
                  <div className="form-group">
                    <label htmlFor="vehicleType">Vehicle Type</label>
                    <select 
                      id="vehicleType"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleInputChange}
                      required
                      className="select-input"
                    >
                      <option value="">Select vehicle type</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Van">Van</option>
                      <option value="Motorcycle">Motorcycle</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vehiclePlate">Vehicle Plate Number</label>
                    <input 
                      type="text" 
                      id="vehiclePlate"
                      name="vehiclePlate"
                      value={formData.vehiclePlate}
                      onChange={handleInputChange}
                      placeholder="Enter your vehicle plate number"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="licenseImage">Driver's License Image</label>
                    <input 
                      type="file" 
                      id="licenseImage"
                      accept="image/*"
                      onChange={handleLicenseImageChange}
                      required
                      className="file-input"
                    />
                    {licenseImage && (
                      <div className="file-preview">
                        <span>Selected: {licenseImage.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="vehicleImage">Vehicle Image</label>
                    <input 
                      type="file" 
                      id="vehicleImage"
                      accept="image/*"
                      onChange={handleVehicleImageChange}
                      required
                      className="file-input"
                    />
                    {vehicleImage && (
                      <div className="file-preview">
                        <span>Selected: {vehicleImage.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <button type="submit" className="login-btn">Sign Up as Driver</button>
              
              <div className="divider">
                <span>Already have an account?</span>
              </div>
              
              <button 
                type="button" 
                className="create-account-btn"
                onClick={() => navigate('/DriverLogin')}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverSignUp;