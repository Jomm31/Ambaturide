import { useState } from 'react';
import manDrivingIMG from '../../assets/driving-homepage.jpg';
import './DriverSignUp.css';
import DriverHeader from '../../Driver-Interface/Header/DriverHeader'

function DriverSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <>
    <DriverHeader/>
    <div className="app-container">
      <div className="homepage-container">
        <div className="homepage-left">
          <div className="login-header">
            <h2>Driver Sign up</h2>
            <p>Sign up to access your account</p>
          </div>
          
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
              <label htmlFor="password">Confirm Password</label>
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
            
            <div className="form-options">
              <div className="remember-me">
                <input 
                  type="checkbox" 
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            
            <button type="submit" className="login-btn">Sign Up</button>
            
            <div className="divider">
              <span>or</span>
            </div>
            
            <button type="button" className="create-account-btn">
              Login
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