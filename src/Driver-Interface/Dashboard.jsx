import { Outlet, Link } from "react-router-dom";
import "./Dashboard.css";

import DashboardHeader from "./Header/DashboardHeader.jsx";

export default function Dashboard() {
  return (
    <div className="Outer_Div">

      <DashboardHeader />

      
      <div className="Inner_Div">

        <div className="Sidebar_Container">
          <div className="Sidebar_Btn">
            <Link to="account" className="menu-item">Account</Link>
            <Link to="bookings" className="menu-item">Bookings</Link>
            <Link to="earnings" className="menu-item">Earnings</Link>
            <Link to="reviews" className="menu-item">Reviews</Link>
          </div>
        </div>


        <div className="main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
