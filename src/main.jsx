import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import PassengerHomepage from "./Passenger-Interface/PassengerHomepage.jsx";
import Admin from "./AdminInterface/Admin.jsx";
import DriverSignUp from "./Login/DriverLogin/DriverSignUp.jsx";
import LoginHomepage from "./Login/LoginHomepage.jsx"
import PassengerLogin from "./Login/PassengerLogin/PassengerLogin.jsx"
import PassengerSignUp from "./Login/PassengerLogin/PassengerSignUp.jsx";
import DriverLogin from "./Login/DriverLogin/DriverLogin.jsx"
import Dashboard from "./Driver-Interface/Dashboard.jsx"; 
import PassengerProfile from "./Passenger-Interface/PassengerProfile.jsx"

import Passenger_Booking from "./Passenger-Interface/Passenger_Booking.jsx";
import PassengerBookingStatus from "./Passenger-Interface/PassengerBookingStatus.jsx";


// Import dashboard subpages
import Account from "./Driver-Interface/Account.jsx";
import Bookings from "./Driver-Interface/Bookings.jsx";
import Earnings from "./Driver-Interface/Earnings.jsx";
import Reviews from "./Driver-Interface/Reviews.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/*Passenger Homepage, Login, Signup*/}
        <Route path="/" element={<LoginHomepage />} />
        <Route path="/PassengerHomepage" element={<PassengerHomepage />} />
        <Route path="/PassengerLogin" element={<PassengerLogin/>}/>
        <Route path="/PassengerSignUp" element={<PassengerSignUp/>}/>
        <Route path="/Passenger_Booking" element={<Passenger_Booking/>}/>

        <Route path="/PassengerProfile" element={<PassengerProfile/>}/>
        <Route path="/PassengerBookingStatus" element={<PassengerBookingStatus/>}/>
        
        {/*Driver Login, Signup*/}
        <Route path="/DriverSignUp " element={<DriverSignUp />} />
        <Route path="/DriverLogin" element={<DriverLogin />} />

        {/*Driver Dashboard, Sidebar with nested routes*/}
        <Route path="/Dashboard/*" element={<Dashboard />}>
          <Route index element={<Bookings />} />
          <Route path="account" element={<Account />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
