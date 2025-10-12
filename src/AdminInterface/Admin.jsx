import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminManager from "./AdminManager.jsx";
import "./Admin.css";

function Admin() {
  useEffect(() => {
    document.title = "Admin Dashboard";
  }, []);

  return (
    <div className="admin-main-container">
      {/* Sidebar */}
      <AdminManager />

      {/* Dynamic content area */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
