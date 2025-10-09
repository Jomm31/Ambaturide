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
            <Link to="/Dashboard/DriverBooking" className="menu-item">DriverBooking</Link>
            <Link to="/Dashboard/DriverProfile" className="menu-item">DriverProfile</Link>
            <Link to="/Dashboard/Reviews" className="menu-item">Reviews</Link>
          </div>
       
       </div>

        <div className="main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
