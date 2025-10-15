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
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};


ensureDir(path.join(__dirname, "uploads/driver-license"));
ensureDir(path.join(__dirname, "uploads/vehicle-images"));
ensureDir(path.join(__dirname, "uploads/profile-pictures"));
// ensure inquiries upload folder exists
ensureDir(path.join(__dirname, "uploads/inquiries"));

const app = express();
app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production"
        ? {
            directives: {
              defaultSrc: ["'self'"],
              baseUri: ["'self'"],
              frameAncestors: ["'none'"],
              objectSrc: ["'none'"],
              imgSrc: ["'self'", "data:"],
              styleSrc: ["'self'", "'unsafe-inline'"],
              scriptSrc: ["'self'"],
              connectSrc: ["'self'", process.env.CLIENT_ORIGIN || "http://localhost:5173"],
            },
          }
        : false,
    crossOriginResourcePolicy: { policy: "same-origin" },
    referrerPolicy: { policy: "no-referrer" },
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token", "X-Requested-With"],
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: true, limit: "200kb" }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// basic request logger to help debug 404s
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

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
// Passenger Login Route - FIXED VERSION
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
        PassengerID: passenger.PassengerID, // ✅ Make sure this line exists and is correct
        FirstName: passenger.FirstName,
        LastName: passenger.LastName,
        Email: passenger.Email,
        PhoneNumber: passenger.PhoneNumber || "", // Add other fields if needed
        ProfilePicture: passenger.ProfilePicture || "", // Add other fields if needed
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


app.get("/api/driver/profile/:id", (req, res) => {
  const driverId = req.params.id;

  const sql = `
    SELECT 
      DriverID,
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      Address,
      BirthDate,
      Gender,
      ProfilePicture,
      LicenseImage,
      VehiclePicture,
      VehicleBrand,
      VehicleType,
      PlateNumber,
      Status
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

    // Send profile with image paths
    res.json({ success: true, driver: results[0] });
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

// ✅ Driver License Image Upload & Update
app.post("/api/driver/license-image/:id", driverUpload.single("license"), (req, res) => {
  const driverId = req.params.id;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imagePath = `/uploads/driver-license/${req.file.filename}`;

  const sql = "UPDATE drivers SET LicenseImage = ? WHERE DriverID = ?";
  db.query(sql, [imagePath, driverId], (err, result) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ success: true, imagePath, message: "License image updated successfully" });
  });
});

// ✅ Driver Vehicle Image Upload & Update
// Multer storage for vehicle images
const vehicleStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads", "vehicle-images"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, name);
  },
});
const uploadVehicle = multer({ storage: vehicleStorage });

// Route: upload vehicle image & save to DB
app.post("/api/driver/vehicle-image/:id", uploadVehicle.single("vehicle"), async (req, res) => {
  try {
    const driverId = req.params.id;
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const imagePath = `/uploads/vehicle-images/${req.file.filename}`;

    // Update drivers.VehiclePicture so subsequent profile fetches include the image
    const sql = "UPDATE drivers SET VehiclePicture = ? WHERE DriverID = ?";
    db.query(sql, [imagePath, driverId], (err, result) => {
      if (err) {
        console.error("❌ DB error updating VehiclePicture:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }

      // Return the saved path so client can update UI/localStorage immediately
      return res.json({
        success: true,
        imagePath,
        message: "Vehicle image uploaded and saved to database"
      });
    });
  } catch (err) {
    console.error("vehicle upload error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/passenger/book", (req, res) => {
  const {
    PassengerID,
    PickupArea,
    DropoffArea,
    PickupFullAddress,
    DropoffFullAddress,
    RideDate,
    RideTime,
    VehicleType,
    Fare
  } = req.body;

  if (!PassengerID) {
    return res.status(400).json({ success: false, message: "Missing PassengerID" });
  }

  const sql = `
    INSERT INTO bookings 
    (PassengerID, PickupArea, DropoffArea, PickupFullAddress, DropoffFullAddress, RideDate, RideTime, VehicleType, Fare)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    PassengerID,
    PickupArea,
    DropoffArea,
    PickupFullAddress,
    DropoffFullAddress,
    RideDate,
    RideTime,
    VehicleType,
    Fare
  ], (err, result) => {
    if (err) {
      console.error("Booking error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    res.json({ success: true, message: "Booking created successfully", bookingID: result.insertId });
  });
});

// ✅ Get all bookings (joined with driver details)
// ✅ Get bookings + passenger info
app.get("/api/driver/bookings", (req, res) => {
  const driverId = req.query.driverId; // optional

  // base select
  let sql = `
    SELECT 
      b.BookingID,
      b.PassengerID,
      b.DriverID,
      b.PickupFullAddress,
      b.DropoffFullAddress,
      b.PickupArea,
      b.DropoffArea,
      b.RideDate,
      b.RideTime,
      b.Status,
      b.VehicleType,
      b.Fare,
      CONCAT(p.FirstName, ' ', p.LastName) AS PassengerName,
      p.ProfilePicture AS PassengerImage,
      p.PhoneNumber,
      p.Gender
    FROM bookings AS b
    LEFT JOIN passengers AS p ON b.PassengerID = p.PassengerID
  `;

  const params = [];

  if (driverId) {
    // only pending bookings and exclude those this driver already declined
    sql += ` WHERE b.Status = 'pending' AND b.BookingID NOT IN (
      SELECT BookingID FROM booking_declines WHERE DriverID = ?
    )`;
    params.push(driverId);
  }

  sql += ` ORDER BY b.BookingID DESC`;

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("❌ Error fetching bookings:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    res.json({ success: true, bookings: results });
  });
});

// GET assigned bookings for a specific driver
app.get("/api/driver/assigned-bookings/:driverId", (req, res) => {
  const driverId = req.params.driverId;
  if (!driverId) return res.status(400).json({ success: false, message: "Missing driverId" });

  const sql = `
    SELECT b.*, 
           CONCAT(p.FirstName, ' ', p.LastName) AS PassengerName,
           p.ProfilePicture AS PassengerImage,
           p.PhoneNumber
    FROM bookings b
    LEFT JOIN passengers p ON b.PassengerID = p.PassengerID
    WHERE b.DriverID = ? 
      AND b.Status IN ('accepted', 'pending') 
    ORDER BY b.CreatedAt DESC
  `;
  db.query(sql, [driverId], (err, results) => {
    if (err) {
      console.error("DB error fetching assigned bookings:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    res.json({ success: true, bookings: results });
  });
});

// Update booking status (driver can set accepted/completed/cancelled)
app.put("/api/bookings/:id/status", (req, res) => {
  const bookingId = req.params.id;
  const { status, driverId } = req.body;
  if (!bookingId || !status) return res.status(400).json({ success: false, message: "Missing params" });

  // Only allow expected statuses
  const allowed = ["pending", "accepted", "completed", "cancelled"];
  if (!allowed.includes(status)) return res.status(400).json({ success: false, message: "Invalid status" });

  // If accepting, set DriverID as well and ensure booking is still pending to avoid race conditions
  if (status === "accepted") {
    const sql = "UPDATE bookings SET Status = ?, DriverID = ? WHERE BookingID = ? AND Status = 'pending'";
    db.query(sql, [status, driverId, bookingId], (err, result) => {
      if (err) return res.status(500).json({ success: false, message: "DB error" });
      if (result.affectedRows === 0) return res.status(409).json({ success: false, message: "Booking already taken or not pending" });
      return res.json({ success: true, message: "Assigned and accepted" });
    });
    return;
  }

  // other status updates
  const sql = "UPDATE bookings SET Status = ? WHERE BookingID = ?";
  db.query(sql, [status, bookingId], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Booking not found" });
    return res.json({ success: true, message: "Status updated" });
  });
});

// ✅ Get latest booking of a passenger with driver info
app.get("/api/passenger/:id/booking", (req, res) => {
  const passengerId = req.params.id;

  const sql = `
    SELECT 
      b.*,
      CONCAT(d.FirstName, ' ', d.LastName) AS DriverName,
      d.PhoneNumber AS DriverPhone,
      d.VehicleBrand,
      d.VehicleType,
      d.PlateNumber
    FROM bookings AS b
    LEFT JOIN drivers AS d ON b.DriverID = d.DriverID
    WHERE b.PassengerID = ?
    ORDER BY b.BookingID DESC
    LIMIT 1
  `;

  db.query(sql, [passengerId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching booking:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.json({ success: true, booking: null }); // No active booking
    }

    res.json({ success: true, booking: results[0] });
  });
});

// Add this route near other booking endpoints

app.post("/api/bookings/:id/rate", (req, res) => {
  const bookingId = req.params.id;
  const { rating, comment } = req.body;
  if (!bookingId || !rating) return res.status(400).json({ success: false, message: "Missing params" });

  // Get booking to find driver & passenger
  const getSql = "SELECT PassengerID, DriverID FROM bookings WHERE BookingID = ?";
  db.query(getSql, [bookingId], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    if (!results || results.length === 0) return res.status(404).json({ success: false, message: "Booking not found" });

    const booking = results[0];
    if (!booking.DriverID) return res.status(400).json({ success: false, message: "No driver assigned for this booking" });

    const insertSql = "INSERT INTO driver_ratings (BookingID, DriverID, PassengerID, Rating, Comment) VALUES (?, ?, ?, ?, ?)";
    db.query(insertSql, [bookingId, booking.DriverID, booking.PassengerID, rating, comment || null], (err2) => {
      if (err2) {
        console.error("DB error inserting rating:", err2);
        return res.status(500).json({ success: false, message: "DB error" });
      }
      return res.json({ success: true, message: "Rating saved" });
    });
  });
});

// Delete booking by BookingID (passenger can cancel)
// This permanently removes the row. If you prefer to keep history, change to update Status='cancelled'.
app.delete("/api/bookings/:id", (req, res) => {
  const bookingId = req.params.id;
  if (!bookingId) return res.status(400).json({ success: false, message: "Missing booking id" });

  const sql = "DELETE FROM bookings WHERE BookingID = ?";
  db.query(sql, [bookingId], (err, result) => {
    if (err) {
      console.error("DB error deleting booking:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    return res.json({ success: true, message: "Booking cancelled and deleted" });
  });
});

app.post("/api/driver/bookings/:id/decline", (req, res) => {
  const bookingId = req.params.id;
  const { driverId, reason } = req.body || {};
  if (!bookingId || !driverId) return res.status(400).json({ success: false, message: "Missing bookingId or driverId" });

  // record decline so same driver won't see it again
  const sql = "INSERT INTO booking_declines (BookingID, DriverID, Reason) VALUES (?, ?, ?)";
  db.query(sql, [bookingId, driverId, reason || null], (err) => {
    if (err) {
      console.error("DB error recording decline:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    // Optionally: return updated booking so client can refresh if needed
    return res.json({ success: true, message: "Recorded decline" });
  });
});

// Admin: list drivers by status
app.get("/api/admin/drivers", (req, res) => {
  const status = req.query.status || "active";
  const sql = "SELECT * FROM drivers WHERE Status = ?";
  db.query(sql, [status], (err, results) => {
    if (err) { console.error(err); return res.status(500).json({ success:false, message:"DB error" }); }
    res.json({ success:true, drivers: results || [] });
  });
});

// Admin: update driver status
app.put("/api/admin/drivers/:id/status", (req, res) => {
  const id = req.params.id;
  const { status } = req.body || {};
  if (!id || !status) return res.status(400).json({ success:false, message:"Missing params" });
  const allowed = ["pending","active","inactive","banned"];
  if (!allowed.includes(status)) return res.status(400).json({ success:false, message:"Invalid status" });

  const sql = "UPDATE drivers SET Status = ? WHERE DriverID = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) { console.error(err); return res.status(500).json({ success:false, message:"DB error" }); }
    if (result.affectedRows === 0) return res.status(404).json({ success:false, message:"Driver not found" });
    res.json({ success:true, message:"Status updated" });
  });
});

// Admin: bookings list (with passenger and driver names when available)
app.get("/api/admin/bookings", (req, res) => {
  const sql = `
    SELECT b.*, 
           CONCAT(p.FirstName, ' ', p.LastName) AS PassengerName,
           CONCAT(d.FirstName, ' ', d.LastName) AS DriverName
    FROM bookings b
    LEFT JOIN passengers p ON b.PassengerID = p.PassengerID
    LEFT JOIN drivers d ON b.DriverID = d.DriverID
    ORDER BY b.CreatedAt DESC
  `;
  db.query(sql, (err, results) => {
    if (err) { console.error(err); return res.status(500).json({ success:false, message:"DB error" }); }
    res.json({ success:true, bookings: results || [] });
  });
});

// (optional) ratings endpoint if not present
app.get("/api/driver/:id/ratings", (req, res) => {
  const driverId = req.params.id;
  const sql = `
    SELECT r.Rating, r.Comment, r.CreatedAt, p.FirstName, p.LastName, p.ProfilePicture AS PassengerPicture
    FROM driver_ratings r
    LEFT JOIN passengers p ON r.PassengerID = p.PassengerID
    WHERE r.DriverID = ?
    ORDER BY r.CreatedAt DESC
  `;
  db.query(sql, [driverId], (err, results) => {
    if (err) { console.error(err); return res.status(500).json({ success:false, message:"DB error" }); }
    res.json({ success:true, ratings: results || [] });
  });
});

// Passenger -> report a driver (called from PassengerBookingStatus)
app.post("/api/drivers/:id/report", (req, res) => {
  const driverId = Number(req.params.id);
  const { passengerId, bookingId, reason } = req.body || {};

  if (!driverId || !passengerId || !reason) {
    return res.status(400).json({ success: false, message: "Missing driverId, passengerId or reason" });
  }

  // limit reports per passenger -> driver to 2
  const countSql = "SELECT COUNT(*) AS cnt FROM driver_reports WHERE DriverID = ? AND PassengerID = ?";
  db.query(countSql, [driverId, passengerId], (errCount, rows) => {
    if (errCount) {
      console.error("DB error counting reports:", errCount);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    const cnt = (rows && rows[0] && rows[0].cnt) ? Number(rows[0].cnt) : 0;
    const LIMIT_PER_PASSENGER_DRIVER = 2;
    if (cnt >= LIMIT_PER_PASSENGER_DRIVER) {
      return res.status(429).json({
        success: false,
        message: `Report limit reached. You can only report the same driver ${LIMIT_PER_PASSENGER_DRIVER} times.`,
      });
    }

    const insertSql = "INSERT INTO driver_reports (DriverID, PassengerID, BookingID, Message) VALUES (?, ?, ?, ?)";
    db.query(insertSql, [driverId, passengerId, bookingId || null, reason], (err, result) => {
      if (err) {
        console.error("DB error inserting driver report:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }

      // increment driver's Reports counter
      const upd = "UPDATE drivers SET Reports = IFNULL(Reports,0) + 1 WHERE DriverID = ?";
      db.query(upd, [driverId], (err2) => {
        if (err2) {
          console.error("DB error incrementing report count:", err2);
          // Still return success for report insertion
        }
        return res.json({ success: true, message: "Report submitted" });
      });
    });
  });
});

// Admin: list driver reports with passenger & driver info
app.get("/api/admin/driver-reports", (req, res) => {
  const sql = `
    SELECT r.ReportID, r.DriverID, r.PassengerID, r.BookingID, r.Message, r.CreatedAt,
           CONCAT(d.FirstName, ' ', d.LastName) AS DriverName, d.ProfilePicture AS DriverPicture, d.Reports,
           CONCAT(p.FirstName, ' ', p.LastName) AS PassengerName, p.ProfilePicture AS PassengerPicture
    FROM driver_reports r
    LEFT JOIN drivers d ON r.DriverID = d.DriverID
    LEFT JOIN passengers p ON r.PassengerID = p.PassengerID
    ORDER BY r.CreatedAt DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB error fetching driver reports:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    res.json({ success: true, reports: results || [] });
  });
});

// Admin: ban driver (convenience endpoint; admin panel may already call /api/admin/drivers/:id/status)
app.put("/api/admin/drivers/:id/ban", (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ success: false, message: "Missing driver id" });

  const sql = "UPDATE drivers SET Status = 'banned' WHERE DriverID = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("DB error banning driver:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Driver not found" });
    return res.json({ success: true, message: "Driver banned" });
  });
});

// ensure inquiries upload folder exists
ensureDir(path.join(__dirname, "uploads/inquiries"));

// multer for inquiries attachments
const inquiriesStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "uploads/inquiries")),
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, name);
  }
});
const uploadInquiry = multer({ storage: inquiriesStorage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

// POST new inquiry (public)
app.post("/api/inquiries", uploadInquiry.single("attachment"), (req, res) => {
  const { firstName, lastName, phoneNumber, email, message, country, countryCode } = req.body;
  const attachmentPath = req.file ? `/uploads/inquiries/${req.file.filename}` : null;

  if (!firstName || !lastName || !phoneNumber || !message) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const sql = `INSERT INTO inquiries (FirstName, LastName, Country, CountryCode, PhoneNumber, Email, Message, AttachmentPath)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [
    firstName, lastName, country || "Philippines", countryCode || "+63",
    phoneNumber, email || null, message, attachmentPath
  ], (err, result) => {
    if (err) {
      console.error("DB error inserting inquiry:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    res.json({ success: true, message: "Inquiry submitted", inquiryId: result.insertId });
  });
});

// Admin: fetch inquiries
app.get("/api/admin/inquiries", (req, res) => {
  const sql = `SELECT InquiryID, FirstName, LastName, Country, CountryCode, PhoneNumber, Email, Message, AttachmentPath, CreatedAt
               FROM inquiries ORDER BY CreatedAt DESC`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB error fetching inquiries:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    res.json({ success: true, inquiries: results || [] });
  });
});

// Serve frontend build in production and fallback to index.html for client routes
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "..", "dist"); // adjust if your build output is different
  if (fs.existsSync(clientDist)) {
    app.use(express.static(clientDist));
    app.get("*", (req, res) => {
      res.sendFile(path.join(clientDist, "index.html"));
    });
  } else {
    console.warn("Client dist folder not found:", clientDist);
  }
}

// Handle all other undefined routes safely
app.use((req, res) => {
  res.status(404).send("❌ Route not found");
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API listening on ${port}`);
});


