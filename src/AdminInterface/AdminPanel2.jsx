import { useState, useEffect } from "react";
import axios from "axios";

// Users Table Component
export function UsersPanel({ rows, onRefresh, onView }) {
  return (
    <div className="panel">
      <h2>Users Table</h2>
      <table className="usersTable">
        <thead>
          <tr>
            <th>ID</th><th>Email</th><th>Name</th><th>Password</th>
            <th>Age</th><th>Gender</th><th>Type</th><th>Offenses</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>No users available</td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i}>
                <td>{row.id}</td>
                <td>{row.email}</td>
                <td>{row.name}</td>
                <td>{row.password}</td>
                <td>{row.age}</td>
                <td>{row.gender}</td>
                <td>{row.type}</td>
                <td>{row.offenses}</td>
                <td>
                  <button className="red" onClick={() => onView(row)}>View</button>
                </td>
              </tr>
            ))
          )}
          <tr>
            <td colSpan="9" style={{ textAlign: "center" }}>
              <button onClick={onRefresh}>Refresh Data</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Transactions Table Component
export function TransactionsPanel({ rows, onRefresh, onView }) {
  return (
    <div className="panel">
      <h2>Transactions Table</h2>
      <table className="usersTable">
        <thead>
          <tr>
            <th>Transaction ID</th><th>Driver ID</th><th>Passenger ID</th>
            <th>Location</th><th>Fare</th><th>Date</th><th>Status</th><th>Report</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>No transactions available</td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i}>
                <td>{row.transactionId}</td>
                <td>{row.driverId}</td>
                <td>{row.passengerId}</td>
                <td>{row.location}</td>
                <td>{row.fare}</td>
                <td>{row.date}</td>
                <td>{row.status}</td>
                <td>{row.report}</td>
                <td>
                  <button className="red" onClick={() => onView(row)}>View</button>
                </td>
              </tr>
            ))
          )}
          <tr>
            <td colSpan="9" style={{ textAlign: "center" }}>
              <button onClick={onRefresh}>🔄 Refresh Data</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Main Admin Panel
export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    setLoadingTransactions(true);
    try {
      const res = await axios.get("http://localhost:5000/api/transactions");
      setTransactions(res.data || []);
    } catch (err) {
      console.error(err);
      setTransactions([]);
    } finally {
      setLoadingTransactions(false);
    }
  };

  // View row details
  const viewRow = (row) => {
    alert(JSON.stringify(row, null, 2));
  };

  useEffect(() => {
    fetchUsers();
    fetchTransactions();
  }, []);

  if (loadingUsers || loadingTransactions) return <div>Loading...</div>;

  return (
    <>
      <UsersPanel rows={users} onRefresh={fetchUsers} onView={viewRow} />
    </>
  );
}
