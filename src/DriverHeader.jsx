import { useEffect, useState } from "react";
import "./DriverHeader.css";
import darkLogo from "../public/ambaturide-darklogo.png";
import defaultProfile from "../public/profile-pictures/default.jpg";

function DriverHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
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
        <a href="/DriverBooking">PassengersBookings</a>
        <a href="/">Transactions</a>
        <a href="/Reviews">Reviews</a>

        {user ? (
          <div className="auth-buttons">
            <img
              src={user.profilePicture ? `http://localhost:5000${user.profilePicture}` : defaultProfile}
              alt="Profile"
              className="profile-pic"
              onClick={() => window.location.href = "/PassengerProfile"}
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

export default DriverHeader;
