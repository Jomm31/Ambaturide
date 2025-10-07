import { useState } from 'react';
import './Header.css';
import darkLogo from './assets/ambaturide-dark-logo.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // close menu when nav link is clicked
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="header">
      {/* Logo + Brand */}
      <div className="header-left">
        <img src={darkLogo} alt="Ambaturide Logo" className="logo" />
        <h1 className="brand"><span>Ambatu</span>RIDE</h1>
      </div>

      {/* Burger / X button */}
      <div
        className={`burger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Slide-in Navigation */}
      <nav className={`header-right ${menuOpen ? 'open' : ''}`}>
        <a href="#" onClick={handleNavClick}>Book a Ride</a>
        <a href="#" onClick={handleNavClick}>About Us</a>
        <a href="#" onClick={handleNavClick}>Help</a>
        <div className="auth-buttons">
          <button className="login" onClick={handleNavClick}>LOG-IN</button>
          <button className="register" onClick={handleNavClick}>REGISTER</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
