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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/*Passenger Homepage, Login, Signup*/}
        <Route path="/" element={<LoginHomepage />} />
        <Route path="/PassengerHomepage" element={<PassengerHomepage />} />
        <Route path="/PassengerLogin" element={<PassengerLogin/>}/>
        <Route path="/PassengerSignUp" element={<PassengerSignUp/>}/>

        <Route path="/PassengerProfile" element={<PassengerProfile/>}/>
        
        {/*Driver Login, Signup*/}
        <Route path="/DriverSignUp " element={<DriverSignUp />} />
        <Route path="/DriverLogin" element={<DriverLogin />} />

        {/*Driver Dashboard, Sidebar*/}
        <Route path="/Dashboard/*" element={<Dashboard />} />

        
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

