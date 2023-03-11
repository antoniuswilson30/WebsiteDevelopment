-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 27, 2022 at 03:32 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sdsmarty`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `NIK` varchar(25) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `idUser` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`NIK`, `nama`, `idUser`) VALUES
('12345', 'admin ke 1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `guru`
--

CREATE TABLE `guru` (
  `NIK` varchar(25) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `kelasAjar` varchar(10) NOT NULL,
  `idUser` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guru`
--

INSERT INTO `guru` (`NIK`, `nama`, `kelasAjar`, `idUser`) VALUES
('22222222', 'guru 1', 'contoh1', 2),
('22345551', 'Aulia', '1A', 629),
('22345552', 'Zaki', '1B', 630),
('22345553', 'Ferhand', '2A', 631),
('22345554', 'Farah', '2B', 632),
('22345555', 'Brian', '3A', 633),
('22345556', 'Kesha', '3B', 634),
('22345557', 'Lesandro', '4A', 635),
('22345558', 'Reynald', '4B', 636),
('22345559', 'Eko', '5A', 637),
('22345560', 'Febri', '5B', 638),
('2234567', 'Nanda', '1C', 644),
('2234568', 'Alleeya Na', '2C', 645),
('2234569', 'Bershny', '3C', 646),
('2234570', 'Adel', '4C', 647),
('2234571', 'Versha', '5C', 648),
('2234572', 'Ecoco', '6A', 649),
('2234573', 'Freya', '6B', 650),
('2234574', 'Atalia Ela', '6C', 651);

-- --------------------------------------------------------

--
-- Stand-in structure for view `kapasitaskelasptmt`
-- (See below for the actual view)
--
CREATE TABLE `kapasitaskelasptmt` (
`namaPeriode` varchar(50)
,`namaKelas` varchar(10)
,`kapasitasKelas` decimal(21,0)
);

-- --------------------------------------------------------

--
-- Table structure for table `kehadiran`
--

CREATE TABLE `kehadiran` (
  `NISN` varchar(25) NOT NULL,
  `namaPeriode` varchar(50) NOT NULL,
  `status` varchar(5) DEFAULT NULL,
  `namaKelas` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kehadiran`
--

INSERT INTO `kehadiran` (`NISN`, `namaPeriode`, `status`, `namaKelas`) VALUES
('11111', 'periode1', 'YES', 'contoh1'),
('2345678', 'periode1', 'NO', '3A'),
('2345679', 'periode1', 'NO', '3A'),
('2345680', 'periode1', 'NO', '3A'),
('2345681', 'periode1', 'NO', '3A'),
('2345682', 'periode1', 'NO', '3A'),
('2345683', 'periode1', 'NO', '3A'),
('2345684', 'periode1', 'NO', '3A'),
('2345685', 'periode1', 'NO', '3A'),
('2345686', 'periode1', 'NO', '3A'),
('2345687', 'periode1', 'NO', '3A'),
('2345688', 'periode1', 'NO', '3B'),
('2345689', 'periode1', 'NO', '3B'),
('2345690', 'periode1', 'NO', '3B'),
('2345691', 'periode1', 'NO', '3B'),
('2345692', 'periode1', 'NO', '3B'),
('2345693', 'periode1', 'NO', '3B'),
('2345694', 'periode1', 'NO', '3B'),
('2345695', 'periode1', 'NO', '3B'),
('2345696', 'periode1', 'NO', '3B'),
('2345697', 'periode1', 'NO', '3B'),
('3456789', 'periode1', 'NO', '1A'),
('3456790', 'periode1', 'NO', '1B'),
('3456791', 'periode1', 'NO', '1C'),
('3456792', 'periode1', 'NO', '2A'),
('3456793', 'periode1', 'NO', '2B'),
('3456794', 'periode1', 'NO', '2C'),
('3456795', 'periode1', 'NO', '3C'),
('3456796', 'periode1', 'NO', '4A'),
('3456797', 'periode1', 'NO', '4B'),
('3456798', 'periode1', 'NO', '5A'),
('3456799', 'periode1', 'NO', '5B'),
('3456800', 'periode1', 'NO', '5C'),
('3456801', 'periode1', 'NO', '6A'),
('3456802', 'periode1', 'NO', '6B'),
('3456803', 'periode1', 'NO', '6C'),
('3456804', 'periode1', 'NO', '1A'),
('3456805', 'periode1', 'NO', '1B'),
('3456806', 'periode1', 'NO', '1C'),
('3456807', 'periode1', 'NO', '2A'),
('3456808', 'periode1', 'NO', '2B'),
('4567890', 'periode1', 'NO', '2C'),
('4567891', 'periode1', 'NO', '3C'),
('4567892', 'periode1', 'NO', '4A'),
('4567893', 'periode1', 'NO', '4B'),
('4567894', 'periode1', 'NO', '5A'),
('4567895', 'periode1', 'NO', '5B'),
('4567896', 'periode1', 'NO', '5C'),
('4567897', 'periode1', 'NO', '6A'),
('4567898', 'periode1', 'NO', '6B'),
('4567899', 'periode1', 'NO', '6C'),
('4567900', 'periode1', 'NO', '1A'),
('4567901', 'periode1', 'NO', '1B'),
('4567902', 'periode1', 'NO', '1C'),
('4567903', 'periode1', 'NO', '2A'),
('4567904', 'periode1', 'NO', '2B'),
('4567905', 'periode1', 'NO', '2C'),
('4567906', 'periode1', 'NO', '3C'),
('4567907', 'periode1', 'NO', '4A'),
('4567908', 'periode1', 'NO', '4B'),
('4567909', 'periode1', 'NO', '5A'),
('4567910', 'periode1', 'NO', '5B'),
('4567911', 'periode1', 'NO', '5C'),
('4567912', 'periode1', 'NO', '6A');

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `namaKelas` varchar(10) NOT NULL,
  `namaGuru` varchar(100) NOT NULL,
  `noRuangan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`namaKelas`, `namaGuru`, `noRuangan`) VALUES
('1A', 'Aulia', 11),
('1B', 'Zaki', 12),
('1C', 'Nanda', 1),
('2A', 'Ferhand', 13),
('2B', 'Farah', 14),
('2C', 'Alleeya Na', 2),
('3A', 'Brian', 15),
('3B', 'Kesha', 16),
('3C', 'Bershny', 3),
('4A', 'Lesandro', 17),
('4B', 'Reynald', 18),
('4C', 'Adel', 4),
('5A', 'Eko', 19),
('5B', 'Febri', 20),
('5C', 'Versha', 5),
('6A', 'Ecoco', 6),
('6B', 'Freya', 7),
('6C', 'Atalia Ela', 8),
('contoh1', 'guru 1', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `kepalasekolah`
--

CREATE TABLE `kepalasekolah` (
  `NIK` varchar(25) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `idUser` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kepalasekolah`
--

INSERT INTO `kepalasekolah` (`NIK`, `nama`, `idUser`) VALUES
('7878787878', 'Bpk. Kepala Sekolah', 5);

-- --------------------------------------------------------

--
-- Table structure for table `periodeptmt`
--

CREATE TABLE `periodeptmt` (
  `namaPeriode` varchar(50) NOT NULL,
  `kapasitas` int(11) NOT NULL,
  `tanggalMulai` date DEFAULT NULL,
  `tanggalAkhir` date DEFAULT NULL,
  `mulaiDaftar` date DEFAULT NULL,
  `akhirDaftar` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `periodeptmt`
--

INSERT INTO `periodeptmt` (`namaPeriode`, `kapasitas`, `tanggalMulai`, `tanggalAkhir`, `mulaiDaftar`, `akhirDaftar`) VALUES
('periode1', 90, '2022-06-12', '2022-06-26', '2022-06-26', '2022-07-01');

-- --------------------------------------------------------

--
-- Table structure for table `ruangan`
--

CREATE TABLE `ruangan` (
  `noRuangan` int(11) NOT NULL,
  `kapasitas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ruangan`
--

INSERT INTO `ruangan` (`noRuangan`, `kapasitas`) VALUES
(1, 40),
(2, 40),
(3, 40),
(4, 40),
(5, 35),
(6, 35),
(7, 35),
(8, 35),
(9, 40),
(10, 40),
(11, 40),
(12, 40),
(13, 40),
(14, 40),
(15, 40),
(16, 40),
(17, 40),
(18, 35),
(19, 40),
(20, 50),
(21, 35),
(22, 40),
(23, 40),
(24, 40),
(25, 40),
(26, 40),
(27, 40),
(28, 40),
(1000, 30);

-- --------------------------------------------------------

--
-- Table structure for table `satpam`
--

CREATE TABLE `satpam` (
  `NIK` varchar(25) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `idUser` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `satpam`
--

INSERT INTO `satpam` (`NIK`, `nama`, `idUser`) VALUES
('4545454545', 'Bpk. Satpam 1', 3);

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `NISN` varchar(25) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `tglLahir` date NOT NULL,
  `namaOrangTua` varchar(100) DEFAULT NULL,
  `emailOrangTua` varchar(50) DEFAULT NULL,
  `namaKelas` varchar(10) NOT NULL,
  `idUser` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`NISN`, `nama`, `email`, `tglLahir`, `namaOrangTua`, `emailOrangTua`, `namaKelas`, `idUser`) VALUES
('11111', 'siswa contoh 1', '11111@mail.com', '2016-06-09', 'abu', 'abu@dummy.com', 'contoh1', 4),
('2345678', 'Doni', 'Doni@dummy.com', '2017-01-03', 'Amelia', 'Amelia@dummy.com', '3A', 659),
('2345679', 'Edo', 'Edo@dummy.com', '2017-01-04', 'Ava', 'Ava@dummy.com', '3A', 660),
('2345680', 'Angelina', 'Angelina@dummy.com', '2017-01-05', 'Leyla', 'Leyla@dummy.com', '3A', 661),
('2345681', 'Afifah', 'Afifah@dummy.com', '2017-01-03', 'Jake', 'Jake@dummy.com', '3A', 662),
('2345682', 'Alya', 'Alya@dummy.com', '2017-01-04', 'Jay', 'Jay@dummy.com', '3A', 663),
('2345683', 'Alvin', 'Alvin@dummy.com', '2017-01-05', 'Sophia', 'Sophia@dummy.com', '3A', 664),
('2345684', 'Keanen', 'Keanen@dummy.com', '2017-01-03', 'Jenna', 'Jenna@dummy.com', '3A', 665),
('2345685', 'Emeralda', 'Emeralda@dummy.com', '2017-01-04', 'Fairuz', 'Fairuz@dummy.com', '3A', 666),
('2345686', 'Bagas', 'Bagas@dummy.com', '2017-01-05', 'Alfie', 'Alfie@dummy.com', '3A', 667),
('2345687', 'Bagus', 'Bagus@dummy.com', '2017-01-03', 'Bernand', 'Bernand@dummy.com', '3A', 668),
('2345688', 'Beno', 'Beno@dummy.com', '2017-01-04', 'Leo', 'Leo@dummy.com', '3B', 669),
('2345689', 'Adi', 'Adi@dummy.com', '2017-01-05', 'Liam', 'Liam@dummy.com', '3B', 670),
('2345690', 'Fernando', 'Fernando@dummy.com', '2017-01-03', 'Violet', 'Violet@dummy.com', '3B', 671),
('2345691', 'Sarah', 'Sarah@dummy.com', '2017-01-04', 'Ella', 'Ella@dummy.com', '3B', 672),
('2345692', 'Sabrina', 'Sabrina@dummy.com', '2017-01-05', 'Abe', 'Abe@dummy.com', '3B', 673),
('2345693', 'Seanne', 'Seanne@dummy.com', '2017-01-03', 'Louis', 'Louis@dummy.com', '3B', 674),
('2345694', 'Isla', 'Isla@dummy.com', '2017-01-04', 'Niall', 'Niall@dummy.com', '3B', 675),
('2345695', 'Afla', 'Afla@dummy.com', '2017-01-05', 'Harry', 'Harry@dummy.com', '3B', 676),
('2345696', 'Laila', 'Laila@dummy.com', '2017-01-03', 'Shawn', 'Shawn@dummy.com', '3B', 677),
('2345697', 'Abe', 'Abe@dummy.com', '2017-01-04', 'Mendes', 'Mendes@dummy.com', '3B', 678),
('3456789', 'Anyya', 'Anyya@dummy.com', '2017-03-06', 'Amanda', 'Amanda\"@dummy.com', '1A', 690),
('3456790', 'Alea', 'Alea@dummy.com', '2017-03-07', 'Ceva', 'Ceva\"@dummy.com', '1B', 691),
('3456791', 'Anisa', 'Anisa@dummy.com', '2017-03-08', 'Jaynim', 'Jaynim\"@dummy.com', '1C', 692),
('3456792', 'Abdul', 'Abdul@dummy.com', '2017-03-09', 'Jeakshi', 'Jeakshi\"@dummy.com', '2A', 693),
('3456793', 'Budiman', 'Budiman@dummy.com', '2017-03-10', 'Alehan', 'Alehan\"@dummy.com', '2B', 694),
('3456794', 'Clea', 'Clea@dummy.com', '2017-03-11', 'Sophia the first', 'Sophia_the_first\"@dummy.com', '2C', 695),
('3456795', 'Cemara', 'Cemara@dummy.com', '2017-03-12', 'Pinus', 'Pinus\"@dummy.com', '3C', 696),
('3456796', 'Diandra', 'Diandra@dummy.com', '2017-03-13', 'Budi Dodi', 'Budi_Dodi\"@dummy.com', '4A', 697),
('3456797', 'Dominic', 'Dominic@dummy.com', '2017-03-14', 'Fergio', 'Fergio\"@dummy.com', '4B', 698),
('3456798', 'Evangeline', 'Evangeline@dummy.com', '2017-03-15', 'Aleana', 'Aleana\"@dummy.com', '5A', 699),
('3456799', 'Ferli', 'Ferli@dummy.com', '2017-03-15', 'Sagitarius', 'Sagitarius\"@dummy.com', '5B', 700),
('3456800', 'Gesani', 'Gesani@dummy.com', '2017-03-16', 'Libra', 'Libra\"@dummy.com', '5C', 701),
('3456801', 'Harianto', 'Harianto@dummy.com', '2017-03-20', 'Pisces', 'Pisces\"@dummy.com', '6A', 702),
('3456802', 'Inul', 'Inul@dummy.com', '2017-03-23', 'Aquarius', 'Aquarius\"@dummy.com', '6B', 703),
('3456803', 'Kanami', 'Kanami@dummy.com', '2017-01-24', 'Gemini', 'Gemini\"@dummy.com', '6C', 704),
('3456804', 'Leannab', 'Leannab@dummy.com', '2017-01-13', 'Caelum', 'Caelum\"@dummy.com', '1A', 705),
('3456805', 'Mentari', 'Mentari@dummy.com', '2017-05-05', 'Justin', 'Justin\"@dummy.com', '1B', 706),
('3456806', 'Narara', 'Narara@dummy.com', '2017-06-02', 'Veriberi', 'Veriberi\"@dummy.com', '1C', 707),
('3456807', 'Queena', 'Queena@dummy.com', '2017-05-01', 'Camilla', 'Camilla\"@dummy.com', '2A', 708),
('3456808', 'Xavier', 'Xavier@dummy.com', '2017-01-04', 'Cabello', 'Cabello\"@dummy.com', '2B', 709),
('4567890', 'Abudu', 'Abudu@dummy.com', '2017-03-06', 'Ariana', 'Ariana\"@dummy.com', '2C', 721),
('4567891', 'Adudu', 'Adudu@dummy.com', '2017-03-07', 'Grande', 'Grande\"@dummy.com', '3C', 722),
('4567892', 'Charlize', 'Charlize@dummy.com', '2017-03-08', 'Namjun', 'Namjun\"@dummy.com', '4A', 723),
('4567893', 'Dududu', 'Dududu@dummy.com', '2017-03-09', 'Dadada da', 'Dadada_da\"@dummy.com', '4B', 724),
('4567894', 'Emily', 'Emily@dummy.com', '2017-03-10', 'Kylie', 'Kylie\"@dummy.com', '5A', 725),
('4567895', 'Gerly', 'Gerly@dummy.com', '2017-03-11', 'Kendall', 'Kendall\"@dummy.com', '5B', 726),
('4567896', 'Hiyyih', 'Hiyyih@dummy.com', '2017-03-12', 'Na Hee Do', 'Na_Hee_Do\"@dummy.com', '5C', 727),
('4567897', 'Huening', 'Huening@dummy.com', '2017-03-13', 'Jamal Kai', 'Jamal_Kai\"@dummy.com', '6A', 728),
('4567898', 'Jeykey', 'Jeykey@dummy.com', '2017-03-14', 'Darari Dara', 'Darari_Dara\"@dummy.com', '6B', 729),
('4567899', 'Kanari', 'Kanari@dummy.com', '2017-03-15', 'Kanari Kena', 'Kanari_Kena\"@dummy.com', '6C', 730),
('4567900', 'Minari', 'Minari@dummy.com', '2017-03-15', 'Sebastian', 'Sebastian\"@dummy.com', '1A', 731),
('4567901', 'Naninu', 'Naninu@dummy.com', '2017-03-16', 'Iqbal', 'Iqbal\"@dummy.com', '1B', 732),
('4567902', 'Obelia', 'Obelia@dummy.com', '2017-03-20', 'Dylllan', 'Dylllan\"@dummy.com', '1C', 733),
('4567903', 'Pangestu', 'Pangestu@dummy.com', '2017-03-23', 'Milea', 'Milea\"@dummy.com', '2A', 734),
('4567904', 'Renan', 'Renan@dummy.com', '2017-01-24', 'Steffani', 'Steffani\"@dummy.com', '2B', 735),
('4567905', 'Salma', 'Salma@dummy.com', '2017-01-13', 'Salsabila', 'Salsabila\"@dummy.com', '2C', 736),
('4567906', 'Safira', 'Safira@dummy.com', '2017-05-05', 'Erbando', 'Erbando\"@dummy.com', '3C', 737),
('4567907', 'Tia', 'Tia@dummy.com', '2017-06-02', 'Lombardi', 'Lombardi\"@dummy.com', '4A', 738),
('4567908', 'Verlincia', 'Verlincia@dummy.com', '2017-05-01', 'Raphaell', 'Raphaell\"@dummy.com', '4B', 739),
('4567909', 'Vander', 'Vander@dummy.com', '2017-01-04', 'Sisianne Rey', 'Sisianne_Rey\"@dummy.com', '5A', 740),
('4567910', 'Wonder Woman', 'WonderWoman@dummy.com', '2017-03-06', 'Super Woman', 'Super_Woman\"@dummy.com', '5B', 741),
('4567911', 'Xeira', 'Xeira@dummy.com', '2017-03-07', 'Denisa Desti', 'Denisa_Desti\"@dummy.com', '5C', 742),
('4567912', 'Zidane', 'Zidane@dummy.com', '2017-03-08', 'Lesty', 'Lesty\"@dummy.com', '6A', 743);

-- --------------------------------------------------------

--
-- Stand-in structure for view `terisikelas`
-- (See below for the actual view)
--
CREATE TABLE `terisikelas` (
`namaPeriode` varchar(50)
,`namaKelas` varchar(10)
,`terisi` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `terisiptmt`
-- (See below for the actual view)
--
CREATE TABLE `terisiptmt` (
`namaPeriode` varchar(50)
,`namaKelas` varchar(10)
,`kapasitasKelas` decimal(21,0)
,`terisi` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `tipeuser`
--

CREATE TABLE `tipeuser` (
  `idTipe` int(11) NOT NULL,
  `namaTipe` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tipeuser`
--

INSERT INTO `tipeuser` (`idTipe`, `namaTipe`) VALUES
(1, 'Siswa'),
(2, 'Guru'),
(3, 'Satpam'),
(4, 'Kepala Sekolah'),
(5, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `tmp_guru`
--

CREATE TABLE `tmp_guru` (
  `NIK` varchar(25) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `kelasAjar` varchar(10) NOT NULL,
  `noRuangan` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tmp_siswa`
--

CREATE TABLE `tmp_siswa` (
  `NISN` varchar(25) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `tglLahir` date NOT NULL,
  `namaOrangTua` varchar(100) DEFAULT NULL,
  `emailOrangTua` varchar(50) DEFAULT NULL,
  `namaKelas` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `idUser` bigint(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `idTipe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`idUser`, `username`, `password`, `nama`, `idTipe`) VALUES
(1, 'admin1', 'abcd1234', 'admin 1', 5),
(2, 'guru1', 'abcd1234', 'guru 1', 2),
(3, 'satpam1', 'abcd1234', 'Bpk. Satpam 1', 3),
(4, '11111', 'abcd1234', 'siswa contoh 1', 1),
(5, 'kepsek1', 'abcd1234', 'Bpk. Kepala Sekolah', 4),
(629, 'aulia56', 'aulia1A', 'Aulia', 2),
(630, 'zaki57', 'zaki1B', 'Zaki', 2),
(631, 'ferhand58', 'ferhand2A', 'Ferhand', 2),
(632, 'farah59', 'farah2B', 'Farah', 2),
(633, 'brian60', 'brian3A', 'Brian', 2),
(634, 'kesha61', 'kesha3B', 'Kesha', 2),
(635, 'lesandro62', 'lesandro4A', 'Lesandro', 2),
(636, 'reynald63', 'reynald4B', 'Reynald', 2),
(637, 'eko64', 'eko5A', 'Eko', 2),
(638, 'febri65', 'febri5B', 'Febri', 2),
(644, 'nanda67', 'nanda1C', 'Nanda', 2),
(645, 'alleeya68', 'alleeya2C', 'Alleeya Na', 2),
(646, 'bershny69', 'bershny3C', 'Bershny', 2),
(647, 'adel70', 'adel4C', 'Adel', 2),
(648, 'versha71', 'versha5C', 'Versha', 2),
(649, 'ecoco72', 'ecoco6A', 'Ecoco', 2),
(650, 'freya73', 'freya6B', 'Freya', 2),
(651, 'atalia74', 'atalia6C', 'Atalia Ela', 2),
(659, '2345678', '20170103', 'Doni', 1),
(660, '2345679', '20170104', 'Edo', 1),
(661, '2345680', '20170105', 'Angelina', 1),
(662, '2345681', '20170103', 'Afifah', 1),
(663, '2345682', '20170104', 'Alya', 1),
(664, '2345683', '20170105', 'Alvin', 1),
(665, '2345684', '20170103', 'Keanen', 1),
(666, '2345685', '20170104', 'Emeralda', 1),
(667, '2345686', '20170105', 'Bagas', 1),
(668, '2345687', '20170103', 'Bagus', 1),
(669, '2345688', '20170104', 'Beno', 1),
(670, '2345689', '20170105', 'Adi', 1),
(671, '2345690', '20170103', 'Fernando', 1),
(672, '2345691', '20170104', 'Sarah', 1),
(673, '2345692', '20170105', 'Sabrina', 1),
(674, '2345693', '20170103', 'Seanne', 1),
(675, '2345694', '20170104', 'Isla', 1),
(676, '2345695', '20170105', 'Afla', 1),
(677, '2345696', '20170103', 'Laila', 1),
(678, '2345697', '20170104', 'Abe', 1),
(690, '3456789', '20170306', 'Anyya', 1),
(691, '3456790', '20170307', 'Alea', 1),
(692, '3456791', '20170308', 'Anisa', 1),
(693, '3456792', '20170309', 'Abdul', 1),
(694, '3456793', '20170310', 'Budiman', 1),
(695, '3456794', '20170311', 'Clea', 1),
(696, '3456795', '20170312', 'Cemara', 1),
(697, '3456796', '20170313', 'Diandra', 1),
(698, '3456797', '20170314', 'Dominic', 1),
(699, '3456798', '20170315', 'Evangeline', 1),
(700, '3456799', '20170315', 'Ferli', 1),
(701, '3456800', '20170316', 'Gesani', 1),
(702, '3456801', '20170320', 'Harianto', 1),
(703, '3456802', '20170323', 'Inul', 1),
(704, '3456803', '20170124', 'Kanami', 1),
(705, '3456804', '20170113', 'Leannab', 1),
(706, '3456805', '20170505', 'Mentari', 1),
(707, '3456806', '20170602', 'Narara', 1),
(708, '3456807', '20170501', 'Queena', 1),
(709, '3456808', '20170104', 'Xavier', 1),
(721, '4567890', '20170306', 'Abudu', 1),
(722, '4567891', '20170307', 'Adudu', 1),
(723, '4567892', '20170308', 'Charlize', 1),
(724, '4567893', '20170309', 'Dududu', 1),
(725, '4567894', '20170310', 'Emily', 1),
(726, '4567895', '20170311', 'Gerly', 1),
(727, '4567896', '20170312', 'Hiyyih', 1),
(728, '4567897', '20170313', 'Huening', 1),
(729, '4567898', '20170314', 'Jeykey', 1),
(730, '4567899', '20170315', 'Kanari', 1),
(731, '4567900', '20170315', 'Minari', 1),
(732, '4567901', '20170316', 'Naninu', 1),
(733, '4567902', '20170320', 'Obelia', 1),
(734, '4567903', '20170323', 'Pangestu', 1),
(735, '4567904', '20170124', 'Renan', 1),
(736, '4567905', '20170113', 'Salma', 1),
(737, '4567906', '20170505', 'Safira', 1),
(738, '4567907', '20170602', 'Tia', 1),
(739, '4567908', '20170501', 'Verlincia', 1),
(740, '4567909', '20170104', 'Vander', 1),
(741, '4567910', '20170306', 'Wonder Woman', 1),
(742, '4567911', '20170307', 'Xeira', 1),
(743, '4567912', '20170308', 'Zidane', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vaksin`
--

CREATE TABLE `vaksin` (
  `idSertif` varchar(100) NOT NULL,
  `sertifVaksin` varchar(150) NOT NULL,
  `tanggalVaksin` date NOT NULL,
  `vaksinKe` int(11) NOT NULL,
  `NISN` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vaksin`
--

INSERT INTO `vaksin` (`idSertif`, `sertifVaksin`, `tanggalVaksin`, `vaksinKe`, `NISN`) VALUES
('43434343', '/mnt/c/Users/rrein/proyek/TugasBesar/public/image/11111-2.png', '2022-05-30', 2, '11111'),
('45454545', '/mnt/c/Users/rrein/proyek/TugasBesar/public/image/11111-1.png', '2022-04-06', 1, '11111');

-- --------------------------------------------------------

--
-- Stand-in structure for view `viewsiswausername`
-- (See below for the actual view)
--
CREATE TABLE `viewsiswausername` (
`NISN` varchar(25)
,`nama` varchar(100)
,`namaKelas` varchar(10)
,`username` varchar(50)
);

-- --------------------------------------------------------

--
-- Structure for view `kapasitaskelasptmt`
--
DROP TABLE IF EXISTS `kapasitaskelasptmt`;

CREATE ALGORITHM=UNDEFINED DEFINER=`admin01`@`localhost` SQL SECURITY DEFINER VIEW `kapasitaskelasptmt`  AS SELECT `periodeptmt`.`namaPeriode` AS `namaPeriode`, `kelas`.`namaKelas` AS `namaKelas`, floor(`periodeptmt`.`kapasitas` * `ruangan`.`kapasitas` / 100) AS `kapasitasKelas` FROM ((`periodeptmt` join `kelas`) join `ruangan` on(`kelas`.`noRuangan` = `ruangan`.`noRuangan`))  ;

-- --------------------------------------------------------

--
-- Structure for view `terisikelas`
--
DROP TABLE IF EXISTS `terisikelas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`admin01`@`localhost` SQL SECURITY DEFINER VIEW `terisikelas`  AS SELECT `kehadiran`.`namaPeriode` AS `namaPeriode`, `kehadiran`.`namaKelas` AS `namaKelas`, count(`kehadiran`.`status`) AS `terisi` FROM `kehadiran` WHERE `kehadiran`.`status` = 'YES' GROUP BY `kehadiran`.`namaPeriode`, `kehadiran`.`namaKelas``namaKelas`  ;

-- --------------------------------------------------------

--
-- Structure for view `terisiptmt`
--
DROP TABLE IF EXISTS `terisiptmt`;

CREATE ALGORITHM=UNDEFINED DEFINER=`admin01`@`localhost` SQL SECURITY DEFINER VIEW `terisiptmt`  AS SELECT `kapasitaskelasptmt`.`namaPeriode` AS `namaPeriode`, `kapasitaskelasptmt`.`namaKelas` AS `namaKelas`, `kapasitaskelasptmt`.`kapasitasKelas` AS `kapasitasKelas`, coalesce(`terisikelas`.`terisi`,0) AS `terisi` FROM (`kapasitaskelasptmt` left join `terisikelas` on(`kapasitaskelasptmt`.`namaPeriode` = `terisikelas`.`namaPeriode` and `kapasitaskelasptmt`.`namaKelas` = `terisikelas`.`namaKelas`))  ;

-- --------------------------------------------------------

--
-- Structure for view `viewsiswausername`
--
DROP TABLE IF EXISTS `viewsiswausername`;

CREATE ALGORITHM=UNDEFINED DEFINER=`admin01`@`localhost` SQL SECURITY DEFINER VIEW `viewsiswausername`  AS SELECT `siswa`.`NISN` AS `NISN`, `siswa`.`nama` AS `nama`, `siswa`.`namaKelas` AS `namaKelas`, `user`.`username` AS `username` FROM (`siswa` join `user` on(`siswa`.`idUser` = `user`.`idUser`))  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`NIK`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`NIK`),
  ADD KEY `kelasAjar` (`kelasAjar`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `kehadiran`
--
ALTER TABLE `kehadiran`
  ADD PRIMARY KEY (`NISN`,`namaPeriode`),
  ADD KEY `namaPeriode` (`namaPeriode`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`namaKelas`),
  ADD KEY `noRuangan` (`noRuangan`);

--
-- Indexes for table `kepalasekolah`
--
ALTER TABLE `kepalasekolah`
  ADD PRIMARY KEY (`NIK`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `periodeptmt`
--
ALTER TABLE `periodeptmt`
  ADD PRIMARY KEY (`namaPeriode`);

--
-- Indexes for table `ruangan`
--
ALTER TABLE `ruangan`
  ADD PRIMARY KEY (`noRuangan`);

--
-- Indexes for table `satpam`
--
ALTER TABLE `satpam`
  ADD PRIMARY KEY (`NIK`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`NISN`),
  ADD KEY `namaKelas` (`namaKelas`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `tipeuser`
--
ALTER TABLE `tipeuser`
  ADD PRIMARY KEY (`idTipe`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`),
  ADD KEY `idTipe` (`idTipe`);

--
-- Indexes for table `vaksin`
--
ALTER TABLE `vaksin`
  ADD PRIMARY KEY (`idSertif`),
  ADD KEY `NISN` (`NISN`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=752;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`);

--
-- Constraints for table `guru`
--
ALTER TABLE `guru`
  ADD CONSTRAINT `guru_ibfk_1` FOREIGN KEY (`kelasAjar`) REFERENCES `kelas` (`namaKelas`),
  ADD CONSTRAINT `guru_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`);

--
-- Constraints for table `kehadiran`
--
ALTER TABLE `kehadiran`
  ADD CONSTRAINT `kehadiran_ibfk_1` FOREIGN KEY (`NISN`) REFERENCES `siswa` (`NISN`),
  ADD CONSTRAINT `kehadiran_ibfk_2` FOREIGN KEY (`namaPeriode`) REFERENCES `periodeptmt` (`namaPeriode`);

--
-- Constraints for table `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `kelas_ibfk_1` FOREIGN KEY (`noRuangan`) REFERENCES `ruangan` (`noRuangan`);

--
-- Constraints for table `kepalasekolah`
--
ALTER TABLE `kepalasekolah`
  ADD CONSTRAINT `kepalasekolah_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`);

--
-- Constraints for table `satpam`
--
ALTER TABLE `satpam`
  ADD CONSTRAINT `satpam_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`);

--
-- Constraints for table `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `siswa_ibfk_1` FOREIGN KEY (`namaKelas`) REFERENCES `kelas` (`namaKelas`),
  ADD CONSTRAINT `siswa_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`idTipe`) REFERENCES `tipeuser` (`idTipe`);

--
-- Constraints for table `vaksin`
--
ALTER TABLE `vaksin`
  ADD CONSTRAINT `vaksin_ibfk_1` FOREIGN KEY (`NISN`) REFERENCES `siswa` (`NISN`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
