import { useState } from 'react';
import './PassengerHeader.css';
import darkLogo from '../../assets/ambaturide-dark-logo.png';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function PassengerHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="logo-container">
        <img src={darkLogo} alt="Ambaturide Logo" className="logo" />
        <h1 className="brand"><span>Ambatu</span>RIDE</h1>
      </div>

      {/* Burger Icon */}
      <div 
        className={`burger ${menuOpen ? 'open' : ''}`} 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation */}
      <nav className={menuOpen ? 'menu-open' : ''}>
        <ul>
          <li><Link to={"/admin"}>Admin Page</Link></li>
          <li><a href="">Book a Ride</a></li>
          <li><a href="">About Us</a></li>
          <li><a href="">Help</a></li>
        </ul>
        <div className="auth-buttons">
          <button className="login" onClick={() => navigate("/login")}>LOG IN</button>
          <button className="register">REGISTER</button>
        </div>
      </nav>
    </header>
  );
}

export default PassengerHeader;