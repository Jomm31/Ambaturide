import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Inquiries() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/inquiries");
        setItems(res.data.inquiries || []);
      } catch (err) {
        console.warn("Failed to fetch inquiries", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="panel loading-state">Loading inquiries…</div>;
  if (items.length === 0) return <div className="panel empty-state">No inquiries found.</div>;

  return (
    <div className="panel">
      <h2>Inquiries</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((q) => (
          <li key={q.id} style={{ padding: 12, borderBottom: "1px solid #eee" }}>
            <strong>{q.subject || "No subject"}</strong>
            <div style={{ color: "#666", fontSize: 13 }}>{q.message}</div>
            <div style={{ marginTop: 8, fontSize: 12, color: "#999" }}>{q.email || q.contact}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}