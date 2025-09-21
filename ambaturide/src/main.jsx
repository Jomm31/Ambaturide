import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePassenger from "./Passenger-Interface/HomePassenger.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HomePassenger />
  </StrictMode>
);
