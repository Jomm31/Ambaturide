-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2025 at 05:23 PM
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
(18, 15, 'Mintal', 'Sasa', '', '', '2025-10-17', '07:16:00', '6 Seaters', 600.00, 'pending', '2025-10-12 08:13:44', NULL),
(25, 10, 'Ulas', 'Lanang', '', '', '2025-10-12', '17:58:00', '6 Seaters', 600.00, 'completed', '2025-10-12 09:58:38', 5),
(26, 17, 'Catalunan', 'Catalunan', '', '', '2025-10-12', '17:59:00', '6 Seaters', 600.00, 'accepted', '2025-10-12 09:59:31', 5),
(28, 10, 'Mintal', 'Buhangin', '', '', '2025-10-30', '00:00:00', '6 Seaters', 600.00, 'accepted', '2025-10-12 14:36:25', 5);

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
-- Table structure for table `booking_declines`
--

CREATE TABLE `booking_declines` (
  `id` int(11) NOT NULL,
  `BookingID` int(11) NOT NULL,
  `DriverID` int(11) NOT NULL,
  `Reason` varchar(255) DEFAULT NULL,
  `DeclinedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking_declines`
--

INSERT INTO `booking_declines` (`id`, `BookingID`, `DriverID`, `Reason`, `DeclinedAt`) VALUES
(1, 18, 5, NULL, '2025-10-12 08:19:53'),
(2, 18, 5, NULL, '2025-10-12 08:19:56'),
(3, 18, 5, NULL, '2025-10-12 08:19:57'),
(4, 18, 5, NULL, '2025-10-12 08:19:58'),
(5, 18, 5, NULL, '2025-10-12 08:19:59'),
(6, 18, 5, NULL, '2025-10-12 08:20:01'),
(7, 18, 5, NULL, '2025-10-12 08:20:09'),
(8, 18, 5, NULL, '2025-10-12 08:22:34'),
(9, 18, 5, NULL, '2025-10-12 08:22:36'),
(10, 18, 5, NULL, '2025-10-12 08:22:37'),
(11, 19, 5, NULL, '2025-10-12 08:23:14'),
(12, 21, 5, NULL, '2025-10-12 09:01:56');

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
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `Reports` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`DriverID`, `TransactionID`, `FirstName`, `LastName`, `Gender`, `BirthDate`, `Email`, `Password`, `PhoneNumber`, `Address`, `ProfilePicture`, `LicenseNumber`, `LicenseImage`, `VehicleType`, `PlateNumber`, `VehicleBrand`, `VehiclePicture`, `Status`, `CreatedAt`, `Reports`) VALUES
(1, NULL, 'jomm', 'jommax', 'Female', '2025-06-08', 'asdf@asdf', '$2b$10$DYQEE4JSfGyDUdUtkd.E0exf31oiWa7pbI.FVNIDkBLpuHqtHNElq', '123', '', '/uploads/profile-pictures/1760045839788.png', '111111', '/uploads/driver-license/1760037738467.jpg', '', '123', '', '/uploads/vehicle-images/1760037738475.png', 'active', '2025-10-09 19:22:18', 0),
(3, NULL, 'Driver', 'aa', '', '0000-00-00', 'asd@asd', '$2b$10$5MYO83YfW6LhFylGaelohe5M6yxgkrjgICbJhgp98RGcmzMihYfyS', '', '', '/uploads/profile-pictures/1760046302833.png', 'License Number', '/uploads/driver-license/1760045951573.png', '', 'Vehicle Plate Number', '', '/uploads/vehicle-images/1760045951573.jpg', 'active', '2025-10-09 21:39:11', 0),
(4, NULL, 'Driver', 'User', NULL, NULL, 'dsa@dsa', '$2b$10$FP7SAyxu6ByljPmXbJtf5.noAAxL/D7/y9zhovjhhtr6fxQIBPHXG', '', '', NULL, '111', '/uploads/driver-license/1760046333518.png', 'SUV', '123', '', '/uploads/vehicle-images/1760046333519.jpg', 'active', '2025-10-09 21:45:33', 0),
(5, NULL, 'az', 'jmma', 'Female', '2025-09-28', '123@123', '$2b$10$E7DZN.sYjQ9k8F77.GOq4eslOCOKQzYHPapw2KqXw4.FEtQSX372m', '7563425', '', '/uploads/profile-pictures/1760088331525.png', '11432', '/uploads/driver-license/1760120164970.png', 'Hatchback', '123432', 'carvra', '/uploads/vehicle-images/1760120690300-totoy.png', 'banned', '2025-10-10 09:23:55', 4),
(6, NULL, 'Driver', 'User', NULL, NULL, '12345@12345', '$2b$10$w./2DbrXXoTFQD..Ud4bp.KjqVGW6fZBCNA8T9bzyC1NbTfHyBpLq', '', '', NULL, '1234', '/uploads/driver-license/1760279894408.jpg', 'Sedan', '123', '', '/uploads/vehicle-images/1760279894409.jpg', 'active', '2025-10-12 14:38:14', 0);

-- --------------------------------------------------------

--
-- Table structure for table `driver_ratings`
--

CREATE TABLE `driver_ratings` (
  `RatingID` int(11) NOT NULL,
  `BookingID` int(11) NOT NULL,
  `DriverID` int(11) NOT NULL,
  `PassengerID` int(11) NOT NULL,
  `Rating` tinyint(4) NOT NULL,
  `Comment` text DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `driver_ratings`
--

INSERT INTO `driver_ratings` (`RatingID`, `BookingID`, `DriverID`, `PassengerID`, `Rating`, `Comment`, `CreatedAt`) VALUES
(1, 25, 5, 10, 4, 'good', '2025-10-12 10:08:37'),
(2, 27, 5, 10, 4, 'a', '2025-10-12 10:13:12');

-- --------------------------------------------------------

--
-- Table structure for table `driver_reports`
--

CREATE TABLE `driver_reports` (
  `ReportID` int(11) NOT NULL,
  `DriverID` int(11) NOT NULL,
  `PassengerID` int(11) NOT NULL,
  `BookingID` int(11) DEFAULT NULL,
  `Message` text DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `driver_reports`
--

INSERT INTO `driver_reports` (`ReportID`, `DriverID`, `PassengerID`, `BookingID`, `Message`, `CreatedAt`) VALUES
(1, 5, 10, 28, 'a', '2025-10-12 15:12:43'),
(2, 5, 10, 28, 'a', '2025-10-12 15:12:47'),
(3, 5, 10, 28, 'a', '2025-10-12 15:15:17'),
(4, 5, 10, 28, 'a', '2025-10-12 15:15:19');

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
(14, NULL, 'Passenger', 'User', 'abc@abc', '$2b$10$bnrximL6RoedDJz17lQEJOheav6PtOHvx7EKqUQ46WkDo/ITqK/p.', '0000000000', 'Unknown', '2000-01-01', NULL, NULL, 'active', '2025-10-09 17:43:18', 'Passenger User'),
(15, NULL, 'Passenger', 'User', '321@321', '$2b$10$nPIbe/LvMeJJkdfYdXXybOQ0QV9GfUNMNPHl/m5jRTkjxb5ycvWse', '0000000000', 'Unknown', '2000-01-01', NULL, NULL, 'active', '2025-10-12 08:13:26', NULL),
(17, NULL, 'Passenger', 'User', '1234@1234', '$2b$10$p27A7chrsTfQI6dZVd4MJOYqaefmcE68rPqRrIQhPbtNt4/l9LUme', '0000000000', 'Unknown', '2000-01-01', NULL, NULL, 'active', '2025-10-12 09:59:16', NULL);

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
-- Indexes for table `booking_declines`
--
ALTER TABLE `booking_declines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`DriverID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `driver_ratings`
--
ALTER TABLE `driver_ratings`
  ADD PRIMARY KEY (`RatingID`),
  ADD KEY `BookingID` (`BookingID`),
  ADD KEY `DriverID` (`DriverID`),
  ADD KEY `PassengerID` (`PassengerID`);

--
-- Indexes for table `driver_reports`
--
ALTER TABLE `driver_reports`
  ADD PRIMARY KEY (`ReportID`),
  ADD KEY `DriverID` (`DriverID`),
  ADD KEY `PassengerID` (`PassengerID`);

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
  MODIFY `BookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `bookings_backup`
--
ALTER TABLE `bookings_backup`
  MODIFY `BookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `booking_declines`
--
ALTER TABLE `booking_declines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `DriverID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `driver_ratings`
--
ALTER TABLE `driver_ratings`
  MODIFY `RatingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `driver_reports`
--
ALTER TABLE `driver_reports`
  MODIFY `ReportID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `passengers`
--
ALTER TABLE `passengers`
  MODIFY `PassengerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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

--
-- Constraints for table `driver_reports`
--
ALTER TABLE `driver_reports`
  ADD CONSTRAINT `driver_reports_ibfk_1` FOREIGN KEY (`DriverID`) REFERENCES `drivers` (`DriverID`) ON DELETE CASCADE,
  ADD CONSTRAINT `driver_reports_ibfk_2` FOREIGN KEY (`PassengerID`) REFERENCES `passengers` (`PassengerID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
