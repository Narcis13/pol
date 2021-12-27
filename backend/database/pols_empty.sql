-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pols
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adonis_schema`
--

DROP TABLE IF EXISTS `adonis_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adonis_schema` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  `migration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema`
--

LOCK TABLES `adonis_schema` WRITE;
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;
INSERT INTO `adonis_schema` VALUES (1,'database\\migrations\\1637592775987_specialitatis',1,'2021-11-22 14:57:39'),(2,'database\\migrations\\1637655548271_users',2,'2021-11-23 08:32:42'),(3,'database\\migrations\\1637752483729_serviciis',3,'2021-11-24 11:19:00'),(4,'database\\migrations\\1637832873034_medics',4,'2021-11-25 09:50:47'),(5,'database\\migrations\\1637849452388_indisponibilitates',5,'2021-11-25 14:17:50'),(6,'database\\migrations\\1637946228054_solicitares',6,'2021-11-26 17:07:18'),(7,'database\\migrations\\1638263666751_cabinets',7,'2021-11-30 09:24:09'),(8,'database\\migrations\\1638354769825_programs',8,'2021-12-01 11:01:32');
/*!40000 ALTER TABLE `adonis_schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cabinets`
--

DROP TABLE IF EXISTS `cabinets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cabinets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `denumire` varchar(255) NOT NULL,
  `idoperator` int(11) NOT NULL,
  `dotare` mediumtext,
  `servicii` mediumtext,
  `orar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cabinets`
--

LOCK TABLES `cabinets` WRITE;
/*!40000 ALTER TABLE `cabinets` DISABLE KEYS */;
/*!40000 ALTER TABLE `cabinets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indisponibilitates`
--

DROP TABLE IF EXISTS `indisponibilitates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `indisponibilitates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idmedic` int(11) NOT NULL,
  `tipindisponibilitate` varchar(255) NOT NULL,
  `datastart` date NOT NULL,
  `datastop` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indisponibilitates`
--

LOCK TABLES `indisponibilitates` WRITE;
/*!40000 ALTER TABLE `indisponibilitates` DISABLE KEYS */;
/*!40000 ALTER TABLE `indisponibilitates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medics`
--

DROP TABLE IF EXISTS `medics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medics` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nume` varchar(255) NOT NULL,
  `grad` varchar(255) NOT NULL,
  `competente` varchar(255) DEFAULT NULL,
  `urlpoza` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `codparafa` varchar(255) NOT NULL,
  `idspecialitate` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medics`
--

LOCK TABLES `medics` WRITE;
/*!40000 ALTER TABLE `medics` DISABLE KEYS */;
/*!40000 ALTER TABLE `medics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programarises`
--

DROP TABLE IF EXISTS `programarises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `programarises` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idsolicitare` int(11) NOT NULL,
  `idmedic` int(11) NOT NULL,
  `idcabinet` int(11) NOT NULL,
  `idserviciumedical` int(11) NOT NULL,
  `idprogram` int(11) NOT NULL,
  `data` date NOT NULL,
  `orastart` time NOT NULL,
  `orastop` time NOT NULL,
  `indexzi` int(11) NOT NULL,
  `indexslot` int(11) NOT NULL,
  `stare` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programarises`
--

LOCK TABLES `programarises` WRITE;
/*!40000 ALTER TABLE `programarises` DISABLE KEYS */;
/*!40000 ALTER TABLE `programarises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programs`
--

DROP TABLE IF EXISTS `programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `programs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idcabinet` int(11) NOT NULL,
  `ziuadinsaptamina` int(11) NOT NULL,
  `idserviciumedical` int(11) NOT NULL,
  `orastart` time NOT NULL,
  `orastop` time NOT NULL,
  `idmedic` int(11) NOT NULL,
  `stare` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `idspecialitate` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs`
--

LOCK TABLES `programs` WRITE;
/*!40000 ALTER TABLE `programs` DISABLE KEYS */;
/*!40000 ALTER TABLE `programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicius`
--

DROP TABLE IF EXISTS `servicius`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servicius` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `denumire` varchar(255) NOT NULL,
  `durata` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicius`
--

LOCK TABLES `servicius` WRITE;
/*!40000 ALTER TABLE `servicius` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicius` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitares`
--

DROP TABLE IF EXISTS `solicitares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solicitares` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nume` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefon` varchar(255) NOT NULL,
  `idspecialitate` int(11) NOT NULL,
  `mesaj` varchar(255) DEFAULT NULL,
  `confirmat` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `hash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitares`
--

LOCK TABLES `solicitares` WRITE;
/*!40000 ALTER TABLE `solicitares` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialitates`
--

DROP TABLE IF EXISTS `specialitates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `specialitates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `denumire` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialitates`
--

LOCK TABLES `specialitates` WRITE;
/*!40000 ALTER TABLE `specialitates` DISABLE KEYS */;
/*!40000 ALTER TABLE `specialitates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `numeintreg` varchar(255) NOT NULL,
  `nume` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,NULL,'Mirica Mihaita','admin1','admin','$bcrypt$v=98$r=10$RdI3jEr1JxnINGkWkJo/2Q$H09elIsw9c+0Kyh1Y5q4gcVvBr7FW/E','2021-12-16 08:53:20','2021-12-16 08:53:20'),(5,NULL,'Dumitrescu Ionel','admin2','admin','$bcrypt$v=98$r=10$qSvEwAKbhxv+9vWu6bTRGg$piMll/66YTdndSzfulV/CyW8S9GXDQ4','2021-12-16 11:46:33','2021-12-16 11:46:33'),(6,NULL,'Narcis Brindusescu','admin3','admin','$bcrypt$v=98$r=10$4mT5QP3oUmkjPGLyQvwCdw$Ic815qGJ1vtWRzNnEMiKI1hQkUV5A+E','2021-12-16 11:47:10','2021-12-16 11:47:10');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-22 19:31:08
