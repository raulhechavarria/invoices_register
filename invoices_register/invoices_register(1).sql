-- phpMyAdmin SQL Dump
-- version 3.5.8.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 12, 2014 at 03:29 PM
-- Server version: 5.5.31-0ubuntu0.13.04.1
-- PHP Version: 5.4.9-4ubuntu2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `invoices_register`
--

-- --------------------------------------------------------

--
-- Table structure for table `entities`
--

CREATE TABLE IF NOT EXISTS `entities` (
  `entity_id` int(11) NOT NULL AUTO_INCREMENT,
  `entity_name` varchar(70) COLLATE latin1_general_ci NOT NULL,
  `entity_nit` varchar(30) COLLATE latin1_general_ci NOT NULL,
  `entity_reup_code` varchar(30) COLLATE latin1_general_ci NOT NULL,
  `entity_ministry` varchar(70) COLLATE latin1_general_ci NOT NULL,
  `entity_address` text COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`entity_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=2 ;

--
-- Dumping data for table `entities`
--

INSERT INTO `entities` (`entity_id`, `entity_name`, `entity_nit`, `entity_reup_code`, `entity_ministry`, `entity_address`) VALUES
(1, 'Etecsa', '2222', '3333', '4444', '5555');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE IF NOT EXISTS `invoices` (
  `invoice_id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_bill` varchar(30) COLLATE latin1_general_ci NOT NULL,
  `invoice_code` varchar(30) COLLATE latin1_general_ci NOT NULL,
  `invoice_value_cup` float NOT NULL,
  `invoice_value_cuc` float NOT NULL,
  `invoice_status` enum('issued','signed','payed','canceled') COLLATE latin1_general_ci NOT NULL DEFAULT 'issued',
  `invoice_transfer_details` text COLLATE latin1_general_ci NOT NULL,
  `invoice_date` date NOT NULL,
  `entity_id` int(11) NOT NULL,
  PRIMARY KEY (`invoice_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=10 ;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`invoice_id`, `invoice_bill`, `invoice_code`, `invoice_value_cup`, `invoice_value_cuc`, `invoice_status`, `invoice_transfer_details`, `invoice_date`, `entity_id`) VALUES
(1, '23213123', '22', 1500, 0, 'canceled', 'asdas asdasd', '2014-05-05', 1),
(3, '333333', '44444', 55555.5, 0, 'canceled', '', '2014-05-06', 1),
(4, '22222', '33333', 44444.4, 0, 'payed', '', '2014-05-05', 1),
(5, '555555', '6666', 777777, 0, 'signed', '', '2014-03-02', 1),
(6, '777777', '77777', 77777, 0, 'canceled', '', '2014-05-28', 1),
(7, '44444', '33333', 11111, 22222, 'signed', 'asd', '2014-06-11', 1),
(8, '3245342', '23452', 7, 4, 'signed', '234', '2014-03-10', 1),
(9, 'hgfh', 'jytu', 6, 4, 'signed', '', '2013-08-05', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_firstname` varchar(80) NOT NULL,
  `user_lastname` varchar(80) NOT NULL,
  `user_login` varchar(80) NOT NULL,
  `user_password` varchar(80) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_firstname`, `user_lastname`, `user_login`, `user_password`) VALUES
(4, 'Raul', 'Hechavarria', 'admin', '21232f297a57a5a743894a0e4a801fc3'),
(6, 'Olivia', 'perez', 'olivia', 'd41d8cd98f00b204e9800998ecf8427e'),
(7, 'p', 'p', 'p', '415290769594460e2e485922904f345d');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
