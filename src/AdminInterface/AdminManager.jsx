import React from "react";
import { NavLink } from "react-router-dom";
import "./Admin.css";

export default function AdminManager() {
  return (
    <aside className="admin-sidebar">
      <ul>
        <li>
          <NavLink to="/admin" end className={({ isActive }) => (isActive ? "active" : "")}>
            🏠 Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/new-drivers" className={({ isActive }) => (isActive ? "active" : "")}>
            👤 New Drivers
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/drivers" className={({ isActive }) => (isActive ? "active" : "")}>
            🚗 Drivers List
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/inquiries" className={({ isActive }) => (isActive ? "active" : "")}>
            📝 Inquiries
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/bookings" className={({ isActive }) => (isActive ? "active" : "")}>
            📋 Booking List
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/DriverReports" className={({ isActive }) => (isActive ? "active" : "")}>
            ⚠️ Driver Reports
          </NavLink>
        </li>
        <li>
          <NavLink to="/">🚪 Exit Admin</NavLink>
        </li>
      </ul>
    </aside>
  );
}
