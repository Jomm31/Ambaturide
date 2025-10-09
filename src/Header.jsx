import { useEffect, useState } from "react";
import "./Header.css";
import darkLogo from "../public/ambaturide-darklogo.png";
import defaultProfile from "../public/profile-pictures/default.jpg";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateUserFromStorage = () => {
      // Try to get user from 'user' localStorage first, then fallback to 'passenger'
      const savedUser = localStorage.getItem("user");
      const savedPassenger = localStorage.getItem("passenger");
      
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else if (savedPassenger) {
        // If passenger exists but user doesn't, sync them
        const passengerData = JSON.parse(savedPassenger);
        setUser(passengerData);
        localStorage.setItem("user", JSON.stringify(passengerData));
      }
    };

    // Initial load
    updateUserFromStorage();

    // Listen for storage changes (when profile picture is updated in another tab/component)
    const handleStorageChange = (e) => {
      if (e.key === "user" || e.key === "passenger") {
        updateUserFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event listener for same-tab updates
    const handleUserUpdate = () => {
      updateUserFromStorage();
    };
    
    window.addEventListener('userUpdated', handleUserUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("passenger");
    setUser(null);
    window.location.href = "/";
  };

  // Function to get profile picture URL with cache busting
  const getProfilePictureUrl = (profilePicture) => {
    if (!profilePicture) return defaultProfile;
    
    // If it's already a full URL or data URL, return as is
    if (profilePicture.startsWith('http') || profilePicture.startsWith('data:')) {
      return profilePicture;
    }
    
    // If it's a path, construct the full URL with cache busting
    return `http://localhost:5000${profilePicture}?t=${Date.now()}`;
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={darkLogo} alt="Ambaturide Logo" className="logo" />
        <h1 className="brand"><span>Ambatu</span>RIDE</h1>
      </div>

      <div
        className={`burger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span><span></span><span></span>
      </div>

      <nav className={`header-right ${menuOpen ? "open" : ""}`}>
        <a href="/">Book a Ride</a>
        <a href="/">About Us</a>
        <a href="#">Help</a>

        {user ? (
          <div className="auth-buttons">
            <img
              src={getProfilePictureUrl(user.ProfilePicture)}
              alt="Profile"
              className="profile-pic"
              onClick={() => window.location.href = "/PassengerProfile"}
              onError={(e) => {
                e.target.src = defaultProfile;
              }}
            />
            <button className="logout" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <button className="login" onClick={() => window.location.href = "/LoginHomepage"}>LOG-IN</button>
            <button className="register" onClick={() => window.location.href = "/LoginHomepage"}>REGISTER</button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;