import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import HomePassenger from "./Passenger-Interface/HomePassenger.jsx";
import Login from "./Login/Login.jsx";
import Admin from "./Admin-Interface/Admin.jsx";
import SignUp_Driver from "./Driver-Interface/SignUp_Driver.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Show SignUp_Driver when visiting "/" */}
      <Route path="/" element={<SignUp_Driver />} />

      {/* If you want HomePassenger, give it a different path */}
  
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>
);
