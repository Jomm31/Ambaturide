import { useState } from 'react';
import './DriverHeader.css';
import darkLogo from '../../assets/ambaturide-dark-logo.png';
import { Link } from 'react-router-dom';

function DriverHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header>
      {/* Left Logo & Brand */}
      <div className="logo-container">
        <img src={darkLogo} alt="Ambaturide Logo" className="logo" />
        <h1 className="brand">AmbatuRIDE</h1>
      </div>

      {/* Right Navigation */}
      <nav>
        <ul className="nav-links">
          <li><Link to="/passengers">Passenger's</Link></li>
          <li><Link to="/time">Time In/Out</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
          <li><Link to="/feedbacks">Feedbacks</Link></li>
        </ul>

        {/* User Profile Dropdown */}
        <div 
          className="user-menu" 
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span className="user-icon">👤</span>
          <span className="username">Eulo Icon Sexcion</span>
          {dropdownOpen && (
            <div className="dropdown">
              <Link to="/profile">Profile</Link>
              <Link to="/logout">Log-out</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default DriverHeader;
