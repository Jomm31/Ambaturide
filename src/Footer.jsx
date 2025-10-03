import Logo from "./assets/ambaturide-logo.png";
import SocialMedia from "./assets/social-media.png";
import PhoneIcon from "./assets/phone-call.png";
import QRCode from "./assets/qr-code.png";
import './Footer.css'
function Footer(){
    return(
        <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={Logo} alt="AmbatuRIDE" className="footer-logo" />
              <p>Your reliable ride-hailing partner</p>
              <img src={SocialMedia} alt="Follow us" className="social-icons" />
            </div>
            
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Book a Ride</a></li>
                <li><a href="#">Login</a></li>
                <li><a href="#">Sign Up</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">About Us</a></li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <div className="phone-contact">
                <img src={PhoneIcon} alt="Call" />
                <span>+63 920 401 4206</span>
              </div>
            </div>
            
            <div className="footer-qr">
              <h4>Download App</h4>
              <div className="qr-container">
                <img src={QRCode} alt="Scan QR Code" />
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 AmbatuRIDE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
}

export default Footer