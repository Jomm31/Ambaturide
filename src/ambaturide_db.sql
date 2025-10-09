-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 10, 2025 at 01:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ambaturide_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `BookingID` int(11) NOT NULL,
  `PassengerID` int(11) DEFAULT NULL,
  `PickupArea` enum('Toril','Mintal','Catalunan','Bago Gallera','Ulas','Bankal','Matina Crossing','Maa','Ecoland','Roxas','Magsaysay','Agdao','Buhangin','Lanang','Sasa') NOT NULL,
  `DropoffArea` enum('Toril','Mintal','Catalunan','Bago Gallera','Ulas','Bankal','Matina Crossing','Maa','Ecoland','Roxas','Magsaysay','Agdao','Buhangin','Lanang','Sasa') NOT NULL,
  `PickupFullAddress` varchar(255) DEFAULT NULL,
  `DropoffFullAddress` varchar(255) DEFAULT NULL,
  `RideDate` date NOT NULL,
  `RideTime` time NOT NULL,
  `VehicleType` enum('4 Seaters','6 Seaters') NOT NULL,
  `Fare` decimal(10,2) NOT NULL,
  `Status` enum('pending','accepted','completed','cancelled') DEFAULT 'pending',
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `DriverID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`BookingID`, `PassengerID`, `PickupArea`, `DropoffArea`, `PickupFullAddress`, `DropoffFullAddress`, `RideDate`, `RideTime`, `VehicleType`, `Fare`, `Status`, `CreatedAt`, `DriverID`) VALUES
(1, 10, 'Toril', 'Mintal', '', '', '2025-10-11', '06:28:00', '6 Seaters', 600.00, 'accepted', '2025-10-09 22:26:27', NULL),
(2, 10, 'Toril', 'Catalunan', '', '', '2025-10-01', '07:35:00', '6 Seaters', 600.00, 'accepted', '2025-10-09 22:35:17', NULL),
(3, 10, 'Bankal', 'Lanang', '', '', '2025-10-03', '10:15:00', '6 Seaters', 600.00, 'accepted', '2025-10-09 23:11:48', NULL),
(4, 10, 'Bankal', 'Sasa', '', '', '2025-10-03', '11:34:00', '4 Seaters', 500.00, 'accepted', '2025-10-09 23:30:27', NULL),
(5, 10, 'Bago Gallera', 'Lanang', '', '', '2025-10-10', '10:35:00', '4 Seaters', 500.00, 'accepted', '2025-10-09 23:33:01', NULL),
(6, 10, 'Mintal', 'Lanang', '', '', '2025-10-03', '11:38:00', '6 Seaters', 600.00, 'accepted', '2025-10-09 23:35:30', 1),
(7, 10, 'Mintal', 'Buhangin', '', '', '2025-10-03', '21:41:00', '6 Seaters', 600.00, 'accepted', '2025-10-09 23:39:23', 1),
(8, 10, 'Toril', 'Lanang', '', '', '2025-10-04', '09:46:00', '4 Seaters', 500.00, 'pending', '2025-10-09 23:44:29', NULL),
(9, 10, 'Ulas', 'Sasa', '', '', '2025-10-11', '00:00:00', '4 Seaters', 500.00, 'pending', '2025-10-09 23:47:31', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bookings_backup`
--

CREATE TABLE `bookings_backup` (
  `BookingID` int(11) NOT NULL,
  `PassengerID` int(11) DEFAULT NULL,
  `PickupArea` enum('Toril','Mintal','Catalunan','Bago Gallera','Ulas','Bankal','Matina Crossing','Maa','Ecoland','Roxas','Magsaysay','Agdao','Buhangin','Lanang','Sasa') NOT NULL,
  `DropoffArea` enum('Toril','Mintal','Catalunan','Bago Gallera','Ulas','Bankal','Matina Crossing','Maa','Ecoland','Roxas','Magsaysay','Agdao','Buhangin','Lanang','Sasa') NOT NULL,
  `PickupFullAddress` varchar(255) DEFAULT NULL,
  `DropoffFullAddress` varchar(255) DEFAULT NULL,
  `RideDate` date NOT NULL,
  `RideTime` time NOT NULL,
  `VehicleType` enum('4 Seaters','6 Seaters') NOT NULL,
  `Fare` decimal(10,2) NOT NULL,
  `Status` enum('pending','accepted','completed','cancelled') DEFAULT 'pending',
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `DriverID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings_backup`
--

INSERT INTO `bookings_backup` (`BookingID`, `PassengerID`, `PickupArea`, `DropoffArea`, `PickupFullAddress`, `DropoffFullAddress`, `RideDate`, `RideTime`, `VehicleType`, `Fare`, `Status`, `CreatedAt`, `DriverID`) VALUES
(1, 10, 'Toril', 'Mintal', '', '', '2025-10-11', '06:28:00', '6 Seaters', 600.00, 'accepted', '2025-10-09 22:26:27', NULL),
(2, 10, 'Toril', 'Catalunan', '', '', '2025-10-01', '07:35:00', '6 Seaters', 600.00, 'accepted', '2025-10-09 22:35:17', NULL),
(3, 10, 'Bankal', 'Lanang', '', '', '2025-10-03', '10:15:00', '6 Seaters', 600.00, 'accepted', '2025-10-09 23:11:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `DriverID` int(11) NOT NULL,
  `TransactionID` int(11) DEFAULT NULL,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Gender` enum('Male','Female','Other') DEFAULT NULL,
  `BirthDate` date DEFAULT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `PhoneNumber` varchar(15) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `ProfilePicture` varchar(255) DEFAULT NULL,
  `LicenseNumber` varchar(100) DEFAULT NULL,
  `LicenseImage` varchar(255) DEFAULT NULL,
  `VehicleType` varchar(50) DEFAULT NULL,
  `PlateNumber` varchar(20) DEFAULT NULL,
  `VehicleBrand` varchar(50) DEFAULT NULL,
  `VehiclePicture` varchar(255) DEFAULT NULL,
  `Status` enum('pending','active','inactive','banned') DEFAULT 'active',
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`DriverID`, `TransactionID`, `FirstName`, `LastName`, `Gender`, `BirthDate`, `Email`, `Password`, `PhoneNumber`, `Address`, `ProfilePicture`, `LicenseNumber`, `LicenseImage`, `VehicleType`, `PlateNumber`, `VehicleBrand`, `VehiclePicture`, `Status`, `CreatedAt`) VALUES
(1, NULL, 'jomm', 'jomma', 'Female', '2025-06-10', 'asdf@asdf', '$2b$10$DYQEE4JSfGyDUdUtkd.E0exf31oiWa7pbI.FVNIDkBLpuHqtHNElq', '123', '', '/uploads/profile-pictures/1760045839788.png', '111111', '/uploads/driver-license/1760037738467.jpg', '', '123', '', '/uploads/vehicle-images/1760037738475.png', 'pending', '2025-10-09 19:22:18'),
(3, NULL, 'Driver', 'aa', '', '0000-00-00', 'asd@asd', '$2b$10$5MYO83YfW6LhFylGaelohe5M6yxgkrjgICbJhgp98RGcmzMihYfyS', '', '', '/uploads/profile-pictures/1760046302833.png', 'License Number', '/uploads/driver-license/1760045951573.png', '', 'Vehicle Plate Number', '', '/uploads/vehicle-images/1760045951573.jpg', 'pending', '2025-10-09 21:39:11'),
(4, NULL, 'Driver', 'User', NULL, NULL, 'dsa@dsa', '$2b$10$FP7SAyxu6ByljPmXbJtf5.noAAxL/D7/y9zhovjhhtr6fxQIBPHXG', '', '', NULL, '111', '/uploads/driver-license/1760046333518.png', 'SUV', '123', '', '/uploads/vehicle-images/1760046333519.jpg', 'pending', '2025-10-09 21:45:33');

-- --------------------------------------------------------

--
-- Table structure for table `passengers`
--

CREATE TABLE `passengers` (
  `PassengerID` int(11) NOT NULL,
  `TransactionID` int(11) DEFAULT NULL,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `PhoneNumber` varchar(15) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `BirthDate` date DEFAULT NULL,
  `Gender` enum('Male','Female','Other') DEFAULT NULL,
  `ProfilePicture` varchar(255) DEFAULT NULL,
  `Status` enum('active','inactive','banned') DEFAULT 'active',
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `FullName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `passengers`
--

INSERT INTO `passengers` (`PassengerID`, `TransactionID`, `FirstName`, `LastName`, `Email`, `Password`, `PhoneNumber`, `Address`, `BirthDate`, `Gender`, `ProfilePicture`, `Status`, `CreatedAt`, `FullName`) VALUES
(3, NULL, 'Passenger', 'User', 'j.loremas.550813@umindanao.edu.ph', '$2b$10$i69fApAXwmDztANX/oApSujRYW.GFGKmCL6Up4MZ6fSubnNOEgWjK', '0000000000', 'Unknown', '2000-01-01', NULL, NULL, 'active', '2025-10-09 16:38:07', 'Passenger User'),
(4, NULL, 'Passenger', 'Userasdas', 'ljoemiredave@gmail.com', '$2b$10$ws8DWIVb3kLM3OaXlnjMGuQltGObOxRHWoGgtzXE4o1i/XwMePLFi', '0000000000', 'Unknown', '1999-12-31', '', '/uploads/profile-pictures/1760048361935.jpg', 'active', '2025-10-09 16:39:25', 'Passenger Userasdas'),
(10, NULL, 'naynay', 'niga', 'jomm21212@gmail.com', '$2b$10$M6nCcYUF5JNV1qKDQqvQa.md0o9lTc2gsiYB3pSUbCCPUXI1lmpK2', '876534', 'Unknown', '2025-09-09', 'Male', '/uploads/profile-pictures/1760044576337.jpg', 'active', '2025-10-09 17:38:58', 'naynay niga'),
(14, NULL, 'Passenger', 'User', 'abc@abc', '$2b$10$bnrximL6RoedDJz17lQEJOheav6PtOHvx7EKqUQ46WkDo/ITqK/p.', '0000000000', 'Unknown', '2000-01-01', NULL, NULL, 'active', '2025-10-09 17:43:18', 'Passenger User');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `ReportID` int(11) NOT NULL,
  `TransactionID` int(11) DEFAULT NULL,
  `Reason` varchar(255) DEFAULT NULL,
  `NoteFromRider` text DEFAULT NULL,
  `NoteFromDriver` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `Gender` enum('Male','Female','Other') DEFAULT NULL,
  `Type` enum('Rider','Driver') DEFAULT NULL,
  `Offenses` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `Email`, `Password`, `Name`, `Age`, `Gender`, `Type`, `Offenses`) VALUES
(1, 'alice@example.com', 'alice123', 'Alice', 25, 'Female', 'Rider', 0),
(2, 'bob@example.com', 'bob123', 'Bob', 30, 'Male', 'Driver', 1),
(3, 'carol@example.com', 'carol123', 'Carol', 28, 'Female', 'Rider', 0),
(4, 'dave@example.com', 'dave123', 'Dave', 35, 'Male', 'Driver', 2),
(5, 'eve@example.com', 'eve123', 'Eve', 22, 'Other', 'Rider', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`BookingID`),
  ADD KEY `fk_bookings_driver_new` (`DriverID`),
  ADD KEY `fk_bookings_passenger_new` (`PassengerID`);

--
-- Indexes for table `bookings_backup`
--
ALTER TABLE `bookings_backup`
  ADD PRIMARY KEY (`BookingID`),
  ADD KEY `fk_bookings_driver` (`DriverID`),
  ADD KEY `fk_bookings_passenger` (`PassengerID`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`DriverID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `passengers`
--
ALTER TABLE `passengers`
  ADD PRIMARY KEY (`PassengerID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`ReportID`),
  ADD KEY `TransactionID` (`TransactionID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `BookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `bookings_backup`
--
ALTER TABLE `bookings_backup`
  MODIFY `BookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `DriverID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `passengers`
--
ALTER TABLE `passengers`
  MODIFY `PassengerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `ReportID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`PassengerID`) REFERENCES `passengers` (`PassengerID`),
  ADD CONSTRAINT `fk_bookings_driver_new` FOREIGN KEY (`DriverID`) REFERENCES `drivers` (`DriverID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_bookings_passenger_new` FOREIGN KEY (`PassengerID`) REFERENCES `passengers` (`PassengerID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
