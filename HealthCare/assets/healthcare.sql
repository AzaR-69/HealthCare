-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2021 at 01:04 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `healthcare`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `id` varchar(255) NOT NULL,
  `availability` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `speciality` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id`, `availability`, `name`, `speciality`) VALUES
('DOC1001', b'1', 'Dexter', 'Cardiologist'),
('DOC1002', b'1', 'Najjma', 'Audilogist'),
('DOC1003', b'1', 'Vetri', 'Dentist'),
('DOC1004', b'1', 'Maaran', 'Paediatrician'),
('DOC1005', b'1', 'Sarah', 'Gynaecologist'),
('DOC1006', b'1', 'Vetri Maaran', 'Psychiatrist'),
('DOC1007', b'1', 'SJ', 'Veterinarian'),
('DOC1008', b'1', 'JD', 'Neurologist'),
('DOC1010', b'0', 'Sidrah', 'Pulmonologist');

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(35);

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `request_id` bigint(20) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `doctor_id` varchar(255) DEFAULT NULL,
  `patient_id` varchar(255) DEFAULT NULL,
  `problem` varchar(255) DEFAULT NULL,
  `status` bit(1) NOT NULL,
  `rejected` bit(1) NOT NULL,
  `response` varchar(255) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `visited` bit(1) NOT NULL,
  `prescription` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`request_id`, `date`, `doctor_id`, `patient_id`, `problem`, `status`, `rejected`, `response`, `patient_name`, `visited`, `prescription`) VALUES
(34, '2021-07-03', 'DOC1003', '8521-7896-4523', 'Faffsfaf', b'0', b'0', NULL, 'Arthur Shelby', b'0', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`, `role`, `username`, `mobile_number`) VALUES
('3214-8745-9987', 'tommy@gmail.com', 'Thomas Shelby', '$2a$10$MaoQO4RPz9CHOUhCBPdDQutO34shKRQqVdMxKLpQ9C85uiSr6qoFq', 'ROLE_USER', 'tommy_grace', '7458963201'),
('5789-4125-9632', 'dowla@gmail.com', 'Dowlath Begum S', '$2a$10$fFcg54OvnEuZ1huBIXSz0e2gNYrTJSlyfTvbAenADeoLa.oCQW5M6', 'ROLE_USER', 'dowla16', '7894155632'),
('7458-8520-9633', 'azar@bazar.com', 'Azaruddin ', '$2a$10$Nt9t4Ah/vyKsl7EP/GSZ/ulAIy/n.FviTIGcbZc6.A1SoRzb.R8Hi', 'ROLE_USER', 'azar_69', '7896412530'),
('8521-7896-4523', 'arthur99@gmail.com', 'Arthur Shelby', '$2a$10$nmrYwf5j5BW.7pasYyf0Je4HMi9O30pKQkVlqgInxFMLfFrmUr1Ri', 'ROLE_USER', 'arthur_shelby', '9541203647'),
('8541-9633-8852', 'pranav@gmail.com', 'Pranav P', '$2a$10$dUhJX5clGFCpT3WwzqwEf.ZUmev7zBa6W.FP221ayzbu.I4wwIlQO', 'ROLE_USER', 'pranav_prakash', '9996668887'),
('9631-7854-8541', 'shah@gmail.com', 'Shahul Hameed', '$2a$10$VKokaOsX8.1YqiiidUIF9.QRIGjt..NjC0FyUsZL4nJelrc/pMo5W', 'ROLE_USER', 'shah20', '7412036880'),
('ADMIN100', 'adminazar@hc.com', 'Mohammed Azaruddin', '$2a$10$DGGjPCMJqWHI/X9sMNNW0O/ULXx63duFqCrOd7WEgPGPWZSrHqd7m', 'ROLE_ADMIN', 'admin_azar', NULL),
('ADMIN101', 'adminsaravana@hc.com', 'Saravana', '$2a$10$z9TkUFh4.RkNF.OtZAeghOk9PgqOVhiVfj7kuBhO/gWpgRwR7fNMi', 'ROLE_ADMIN', 'admin_saravana', NULL),
('DOC1001', 'DocDexter@gmail.com', 'Dexter', '$2a$10$LQZ0kJQr1jGtYw0PhKyOT.anAYNjz56daLfLnJr.3hEiryPRxZxKi', 'ROLE_DOCTOR', 'dexter', '9896412530'),
('DOC1002', 'DocNajjma@gmail.com', 'Najjma', '$2a$10$UlzDymfI/E.4qiIbqsWhjuy8uInebQiryaKLwzY4HTYtUbqhwszD.', 'ROLE_DOCTOR', 'najjma', '7996412530'),
('DOC1003', 'DocVetri@gmail.com', 'Vetri', '$2a$10$rytg79G07sVdJw8e.73Zc.fi2zAft644YysZ7qsLFlLoSKcFqPs5.', 'ROLE_DOCTOR', 'vetri', '7816412530'),
('DOC1004', 'DocMaaran@gmail.com', 'Maaran', '$2a$10$XI2b/GPTOr8DUbiE1czR4O7TQZtcBC9Z0ONCPySOsgOPF0O2tCT3.', 'ROLE_DOCTOR', 'maaran', '7899412530'),
('DOC1005', 'DocSarah@gmail.com', 'Sarah', '$2a$10$z/8gfHoJliHqMdOG9RBFFuLTsN1ys00FG2Hd5KRso.lOH9B7N1jEy', 'ROLE_DOCTOR', 'sarah', '7896419530'),
('DOC1006', 'DocVetriMaaran@gmail.com', 'VetriMaaran', '$2a$10$ftto3z3BDxJTMdMP2ytrYevirJJSc5GCIs37BiNGL60zVY3Sr/A36', 'ROLE_DOCTOR', 'vetrimaaran', '8996412530'),
('DOC1007', 'DocSJ@gmail.com', 'SJ', '$2a$10$E7qwLEfz8VyW1ExzcLu./uqgOdp4CLy1ETXM.4iHriV0SMN/PmZp6', 'ROLE_DOCTOR', 'SJ', '7896410021'),
('DOC1008', 'DocJD@gmail.com', 'JD', '$2a$10$Rd91uJe6tHocu2KrYJa/LOKCYJn2HIlTFWn6J5GTLYjiOAC9djPRC', 'ROLE_DOCTOR', 'JD', '7897892530'),
('DOC1010', 'docsidrah@hc.com', 'Sidrah', '$2a$10$BukYYLvmYXzqsz91MQRHqebomCaMkCSKEOizFsk86yplkNyvjGaBm', 'ROLE_DOCTOR', 'sidrah', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
