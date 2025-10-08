import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import manDrivingIMG from '../../assets/driving-homepage.jpg';
import './DriverSignUp.css';
import DriverHeader from '../../Driver-Interface/Header/DriverHeader'

function DriverSignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // TODO: Backend registration will go here
    console.log('Driver sign up attempt:', { email, password });
    
    // Temporary: Navigate to login (will be replaced with real auth)
    navigate('/DriverLogin');
  };

  return (
    <>
    <DriverHeader/>
    <div className="app-container">
      <div className="homepage-container">
        <div className="homepage-left">
          <div className="login-header">
            <h2>Become a Driver</h2>
            <p>Create your driver account and start earning</p>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email or Phone Number</label>
              <input 
                type="text" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
            
            <button type="submit" className="login-btn">Sign Up</button>
            
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

        <div className="homepage-right">
          <div className="image-container">
            <img src={manDrivingIMG} alt="Person driving" className="login-image" />
            <div className="image-overlay">
              <h3>Ride with Confidence</h3>
              <p>Safe, reliable transportation at your fingertips</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
}

export default DriverSignUp;