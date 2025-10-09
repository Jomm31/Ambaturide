import { useState } from "react";
import axios from "axios";

export function UsersPanel({ rows, onGenerate, onView }) {
  return (
    <div className="panel">
      <table className="usersTable">
        <thead>
          <tr>
            <th>ID</th><th>Email</th><th>Name</th><th>Password</th>
            <th>Age</th><th>Gender</th><th>Type</th><th>Offenses</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>{row.id}</td>
              <td>{row.email}</td>
              <td>{row.name}</td>
              <td>{row.password}</td>
              <td>{row.age}</td>
              <td>{row.gender}</td>
              <td>{row.type}</td>
              <td><button className="green">{row.offenses}</button></td>
              <td>
                <button className="red" onClick={() => onView(i)}>View</button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="9">
              <button onClick={() => onGenerate(1)}>Add Row</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function TransactionsPanel({ rows, onGenerate, onView }) {
  return (
    <div className="panel">
      <table className="usersTable">
        <thead>
          <tr>
            <th>Transaction ID</th><th>Driver ID</th><th>Passenger ID</th>
            <th>Location</th><th>Fare</th><th>Date</th><th>Status</th><th>Report</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
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
                <button className="red" onClick={() => onView(i)}>View</button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="9">
              <button onClick={() => onGenerate(1)}>Add Row</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function AdminPanel() {
  const [rows, setRows] = useState([]);

  async function generateTable(count) {
    const newRows = Array(count).fill({
      id: "Description", email: "Description", name: "Description",
      password: "Description", age: "Description", gender: "Description",
      type: "Description", offenses: "Description",
    });
    setRows(prev => [...prev, ...newRows]);
  }

  function getTableRow(id) {
    alert(id);
  }

  return (
    <UsersPanel rows={rows} onGenerate={generateTable} onView={getTableRow} />
  );
}
