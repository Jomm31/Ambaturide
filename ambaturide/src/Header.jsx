import { useState } from 'react';
import './Header.css';
import darkLogo from '../public/ambaturide-darklogo.png';

function Header() {
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
          <li><a href="">Book a Ride</a></li>
          <li><a href="">Solutions</a></li>
          <li><a href="">Community</a></li>
          <li><a href="">Resources</a></li>
        </ul>
        <div className="auth-buttons">
          <button className="login">LOG-IN</button>
          <button className="register">REGISTER</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
