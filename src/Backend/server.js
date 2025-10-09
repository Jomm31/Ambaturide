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
ensureDir(path.join(__dirname, "uploads/profile-pictures"));


const app = express();


app.use("/uploads", express.static(path.join(__dirname, "uploads")));




 






const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
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

    // Return driver data in consistent format
    res.json({ 
      message: "Login successful", 
      driver: {
        DriverID: driver.DriverID,
        FirstName: driver.FirstName,
        LastName: driver.LastName,
        Email: driver.Email,
        PhoneNumber: driver.PhoneNumber,
        ProfilePicture: driver.ProfilePicture,
        VehicleBrand: driver.VehicleBrand,
        VehicleType: driver.VehicleType,
        PlateNumber: driver.PlateNumber,
        Status: driver.Status
      }
    });
  });
});
app.get("/api/driver/login", (req, res) => {
  res.send("✅ You reached the Driver SignUp route! Use POST to submit data.");
});

// ✅ Get full passenger profile by ID
app.get("/api/passenger/profile/:id", (req, res) => {
  const passengerId = req.params.id;

  const sql = `
    SELECT PassengerID, FirstName, LastName, Email, PhoneNumber, Address, BirthDate, Gender, ProfilePicture, Status
    FROM passengers
    WHERE PassengerID = ?
  `;

  db.query(sql, [passengerId], (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Passenger not found" });
    }

    res.json(results[0]);
  });
});

// ✅ Passenger Profile Picture Upload & Update
const profileStorage = multer.diskStorage({
  destination: path.join(__dirname, "uploads/profile-pictures"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const profileUpload = multer({ storage: profileStorage });

app.post("/api/passenger/profile-picture/:id", profileUpload.single("profile"), (req, res) => {
  const passengerId = req.params.id;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imagePath = `/uploads/profile-pictures/${req.file.filename}`;

  const sql = "UPDATE passengers SET ProfilePicture = ? WHERE PassengerID = ?";
  db.query(sql, [imagePath, passengerId], (err, result) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ success: true, imagePath, message: "Profile picture updated successfully" });
  });
});

// ✅ Update Passenger Info (Name, Gender, Birthdate, etc.)
app.put("/api/passenger/update/:id", (req, res) => {
  const passengerId = req.params.id;
  const { firstName, lastName, gender, birthdate } = req.body;

  const sql = `
    UPDATE passengers 
    SET FirstName = ?, LastName = ?, Gender = ?, BirthDate = ?
    WHERE PassengerID = ?
  `;

  db.query(sql, [firstName, lastName, gender, birthdate, passengerId], (err, result) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ success: true, message: "Profile updated successfully!" });
  });
});
// ✅ Update Passenger Contact and Email
app.put("/api/passenger/update-contact/:id", (req, res) => {
  const passengerId = req.params.id;
  const { contactNo, email } = req.body;

  if (!contactNo || !email) {
    return res.status(400).json({ success: false, message: "Contact number and email are required" });
  }

  const sql = `
    UPDATE passengers 
    SET PhoneNumber = ?, Email = ?
    WHERE PassengerID = ?
  `;

  db.query(sql, [contactNo, email, passengerId], (err, result) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    res.json({ success: true, message: "Contact info updated successfully!" });
  });
});



// ✅ Change Passenger Password
app.put("/api/passenger/change-password/:id", async (req, res) => {
  const passengerId = req.params.id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ success: false, message: "Both old and new passwords are required" });
  }

  // Get the current password hash from the DB
  const getSql = `SELECT Password FROM passengers WHERE PassengerID = ?`;
  db.query(getSql, [passengerId], async (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Passenger not found" });
    }

    const storedHash = results[0].Password;
    const isMatch = await bcrypt.compare(oldPassword, storedHash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Old password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateSql = `UPDATE passengers SET Password = ? WHERE PassengerID = ?`;

    db.query(updateSql, [hashedPassword, passengerId], (err) => {
      if (err) {
        console.error("❌ Database error:", err);
        return res.status(500).json({ success: false, message: "Failed to update password" });
      }

      res.json({ success: true, message: "Password changed successfully!" });
    });
  });
});


// ✅ Get full driver profile by ID
app.get("/api/driver/profile/:id", (req, res) => {
  const driverId = req.params.id;

  const sql = `
    SELECT DriverID, FirstName, LastName, Email, PhoneNumber, Address, BirthDate, Gender, ProfilePicture, 
           VehicleBrand, VehicleType, PlateNumber, Status
    FROM drivers
    WHERE DriverID = ?
  `;

  db.query(sql, [driverId], (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json(results[0]);
  });
});

// ✅ Driver Profile Picture Upload & Update
app.post("/api/driver/profile-picture/:id", profileUpload.single("profile"), (req, res) => {
  const driverId = req.params.id;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imagePath = `/uploads/profile-pictures/${req.file.filename}`;

  const sql = "UPDATE drivers SET ProfilePicture = ? WHERE DriverID = ?";
  db.query(sql, [imagePath, driverId], (err, result) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ success: true, imagePath, message: "Profile picture updated successfully" });
  });
});

// ✅ Update Driver Info (Name, Gender, Birthdate, etc.)
app.put("/api/driver/update/:id", (req, res) => {
  const driverId = req.params.id;
  const { firstName, lastName, gender, birthdate } = req.body;

  const sql = `
    UPDATE drivers 
    SET FirstName = ?, LastName = ?, Gender = ?, BirthDate = ?
    WHERE DriverID = ?
  `;

  db.query(sql, [firstName, lastName, gender, birthdate, driverId], (err, result) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ success: true, message: "Profile updated successfully!" });
  });
});

// ✅ Update Driver Contact and Email
app.put("/api/driver/update-contact/:id", (req, res) => {
  const driverId = req.params.id;
  const { contactNo, email } = req.body;

  if (!contactNo || !email) {
    return res.status(400).json({ success: false, message: "Contact number and email are required" });
  }

  const sql = `
    UPDATE drivers 
    SET PhoneNumber = ?, Email = ?
    WHERE DriverID = ?
  `;

  db.query(sql, [contactNo, email, driverId], (err, result) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    res.json({ success: true, message: "Contact info updated successfully!" });
  });
});

// ✅ Update Driver Vehicle Information
app.put("/api/driver/update-vehicle/:id", (req, res) => {
  const driverId = req.params.id;
  const { vehicleBrand, vehicleType, plateNumber } = req.body;

  const sql = `
    UPDATE drivers 
    SET VehicleBrand = ?, VehicleType = ?, PlateNumber = ?
    WHERE DriverID = ?
  `;

  db.query(sql, [vehicleBrand, vehicleType, plateNumber, driverId], (err, result) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    res.json({ success: true, message: "Vehicle information updated successfully!" });
  });
});

// ✅ Change Driver Password
app.put("/api/driver/change-password/:id", async (req, res) => {
  const driverId = req.params.id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ success: false, message: "Both old and new passwords are required" });
  }

  // Get the current password hash from the DB
  const getSql = `SELECT Password FROM drivers WHERE DriverID = ?`;
  db.query(getSql, [driverId], async (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Driver not found" });
    }

    const storedHash = results[0].Password;
    const isMatch = await bcrypt.compare(oldPassword, storedHash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Old password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateSql = `UPDATE drivers SET Password = ? WHERE DriverID = ?`;

    db.query(updateSql, [hashedPassword, driverId], (err) => {
      if (err) {
        console.error("❌ Database error:", err);
        return res.status(500).json({ success: false, message: "Failed to update password" });
      }

      res.json({ success: true, message: "Password changed successfully!" });
    });
  });
});

// Handle all other undefined routes safely
app.use((req, res) => {
  res.status(404).send("❌ Route not found");
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));


