// backend/server.js
import express from "express";
import mysql from "mysql2";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // your React frontend
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: "ambaturide_secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // secure: true only if using https
}));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ambaturide_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected!");
});

// Login route (for example)
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM passengers WHERE Email = ? AND Password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (result.length > 0) {
      req.session.user = result[0];
      res.json({ success: true, user: result[0] });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

// Check login status
app.get("/api/check-auth", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// Logout route
app.post("/api/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
