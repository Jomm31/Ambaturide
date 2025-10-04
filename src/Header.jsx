import { useState } from 'react';
import './Header.css';
import darkLogo from '../public/ambaturide-darklogo.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // close menu when a nav link is clicked (mobile)
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="header">
      {/* Logo + Brand */}
      <div className="header-left">
        <img src={darkLogo} alt="Ambaturide Logo" className="logo" />
        <h1 className="brand"><span>Ambatu</span>RIDE</h1>
      </div>

      {/* Burger Icon */}
      <div
        className={`burger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation */}
      <nav className={`header-right ${menuOpen ? 'open' : ''}`}>
        <a href="#" onClick={handleNavClick}>Book a Ride</a>
        <a href="#" onClick={handleNavClick}>About Us</a>
        <a href="#" onClick={handleNavClick}>Help</a>
        <div className="auth-buttons">
          <button className="login">LOG-IN</button>
          <button className="register">REGISTER</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
