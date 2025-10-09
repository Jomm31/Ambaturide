// backend/server.js
import express from "express";
import mysql from "mysql2";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from 'bcryptjs';
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};


ensureDir(path.join(__dirname, "uploads/driver-license"));
ensureDir(path.join(__dirname, "uploads/vehicle-images"));


const app = express();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads/profile-pictures"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage });

app.post("/api/passenger/upload-profile", upload.single("profile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imagePath = `/uploads/profile-pictures/${req.file.filename}`;
  res.json({ success: true, imagePath });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));




 






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

// ✅ Passenger signup endpoint
app.post('/api/passenger/signup', async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, address, birthDate } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO passengers 
      (FirstName, LastName, Email, Password, PhoneNumber, Address, BirthDate)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [firstName || 'Passenger', lastName || 'User', email, hashedPassword, phoneNumber || '', address || '', birthDate || null],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Email already registered' });
          }
          console.error('❌ Error inserting passenger:', err);
          return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({ success: true, message: 'Passenger registered successfully!' });

      }
    );
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
  console.log("📥 Signup data:", req.body);

});

app.get("/api/passenger/signup", (req, res) => {
  res.send("✅ You reached the Passenger SignUp route! Use POST to submit data.");
});



// Passenger Login Route
app.post('/api/passenger/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Please fill in all fields' });

  const sql = `SELECT * FROM passengers WHERE Email = ?`;

  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const passenger = results[0];
    const passwordMatch = await bcrypt.compare(password, passenger.Password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Save session (optional)
    req.session.user = {
      id: passenger.PassengerID,
      email: passenger.Email,
      firstName: passenger.FirstName,
      lastName: passenger.LastName,
    };

    res.json({
      message: 'Login successful',
      passenger: {
        PassengerID: passenger.PassengerID,
        FirstName: passenger.FirstName,
        LastName: passenger.LastName,
        Email: passenger.Email,
      },
    });
  });
});




// Default route
app.get("/", (req, res) => {
  res.send("✅ Backend API is running!");
});





// ✅ Driver Signup Route
const driverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/driver-license";
    if (file.fieldname === "vehicleImage") {
      folder = "uploads/vehicle-images";
    }
    cb(null, path.join(__dirname, folder));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const driverUpload = multer({ storage: driverStorage });

app.post("/api/driver/signup", driverUpload.fields([
  { name: "licenseImage", maxCount: 1 },
  { name: "vehicleImage", maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      licenseNumber,
      vehicleType,
      plateNumber,
      vehicleBrand
    } = req.body;

    // Required validation
    if (!email || !password || !licenseNumber || !vehicleType || !plateNumber) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const licenseImagePath = req.files?.licenseImage
      ? `/uploads/driver-license/${req.files.licenseImage[0].filename}`
      : null;

    const vehicleImagePath = req.files?.vehicleImage
      ? `/uploads/vehicle-images/${req.files.vehicleImage[0].filename}`
      : null;

    const sql = `
      INSERT INTO drivers 
      (FirstName, LastName, Email, Password, PhoneNumber, Address, 
      LicenseNumber, LicenseImage, VehicleType, PlateNumber, VehicleBrand, VehiclePicture, Status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `;

    db.query(
      sql,
      [
        firstName || "Driver",
        lastName || "User",
        email,
        hashedPassword,
        phoneNumber || "",
        address || "",
        licenseNumber,
        licenseImagePath,
        vehicleType,
        plateNumber,
        vehicleBrand || "",
        vehicleImagePath
      ],
      (err, result) => {
        if (err) {
          console.error("❌ DB Error:", err);
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Email already registered" });
          }
          return res.status(500).json({ message: "Database error" });
        }

        res.status(201).json({
          success: true,
          message: "Driver registered successfully!",
          driverID: result.insertId
        });
      }
    );
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/api/driver/signup", (req, res) => {
  res.send("✅ You reached the Driver SignUp route! Use POST to submit data.");
});



app.post("/api/driver/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Missing email or password" });

  const query = "SELECT * FROM drivers WHERE Email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0)
      return res.status(401).json({ message: "Driver not found" });

    const driver = results[0];
    const isMatch = await bcrypt.compare(password, driver.Password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", driver });
  });
});
app.get("/api/driver/login", (req, res) => {
  res.send("✅ You reached the Driver SignUp route! Use POST to submit data.");
});





// Handle all other undefined routes safely
app.use((req, res) => {
  res.status(404).send("❌ Route not found");
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));


