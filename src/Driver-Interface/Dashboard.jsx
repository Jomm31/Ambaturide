import { Routes, Route, Link } from "react-router-dom";
import "./Dashboard.css";
import Account from "./Account.jsx";
import Bookings from "./Bookings.jsx";
import Earnings from "./Earnings.jsx";
import Reviews from "./Reviews.jsx";
import DashboardHeader from "./Header/DashboardHeader.jsx";

export default function Dashboard() {
  return (
    <div className="Outer_Div">

      
      <DashboardHeader />

      {/* Inner layout (Sidebar + Main content) */}
      <div className="Inner_Div">
        
        {/* Sidebar */}
        <div className="Sidebar_Container">
          <div className="Sidebar_Btn">
            <Link to="account" className="menu-item">Account</Link>
            <Link to="bookings" className="menu-item">Bookings</Link>
            <Link to="earnings" className="menu-item">Earnings</Link>
            <Link to="reviews" className="menu-item">Reviews</Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="main">
          <h2>Matina Area</h2>

          {/* Header Row */}
          <div className="booking-header">
            <span>Passenger</span>
            <span>Current Location</span>
            <span>Drop Off Location</span>
            <span>Action</span>
          </div>

          {/* Example Booking Card */}
          <div className="booking-card">
            <div className="passenger-info">
              <img src="" alt="Profile" className="profile-pic" />
              <div>
                <strong>Last_Name First_Name</strong><br />
                Contact_Number
              </div>
            </div>

            <div className="pickup">Pickup_Location</div>
            <div className="dropoff">Dropoff_Location</div>

            <div className="buttons">
              <button className="accept">Accept</button>
              <button className="decline">Decline</button>
            </div>
          </div>

          {/* Routes */}
          <Routes>
            <Route path="account" element={<Account />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="reviews" element={<Reviews />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
