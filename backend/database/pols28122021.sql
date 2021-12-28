-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: pols
-- ------------------------------------------------------
-- Server version	5.5.68-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cabinets`
--

LOCK TABLES `cabinets` WRITE;
/*!40000 ALTER TABLE `cabinets` DISABLE KEYS */;
INSERT INTO `cabinets` VALUES (7,'Cabinet Ortopedie',7,NULL,NULL,NULL,'2021-12-23 09:32:11','2021-12-23 09:32:11'),(8,'Cabinet Chir. Plastica',8,NULL,NULL,NULL,'2021-12-27 07:31:17','2021-12-27 07:31:17'),(9,'Cabinet Neurologie',9,NULL,NULL,NULL,'2021-12-27 07:44:33','2021-12-27 07:44:33'),(10,'Cabinet ORL',10,NULL,NULL,NULL,'2021-12-27 07:53:40','2021-12-27 07:53:40'),(11,'Cabinet CHIRURGIE',11,NULL,NULL,NULL,'2021-12-27 08:26:49','2021-12-27 08:26:49'),(12,'Cabinet Medicina Interna',12,NULL,NULL,NULL,'2021-12-27 08:34:38','2021-12-27 08:34:38'),(13,'Cabinet Cardiologie',13,NULL,NULL,NULL,'2021-12-27 08:44:21','2021-12-27 08:44:21'),(14,'Cabinet Urologie',14,NULL,NULL,NULL,'2021-12-27 08:59:28','2021-12-27 08:59:28'),(15,'Cabinet Oftalmologie',15,NULL,NULL,NULL,'2021-12-27 09:09:59','2021-12-27 09:09:59'),(16,'Cabinet RadioImagistica',16,NULL,NULL,NULL,'2021-12-27 10:03:39','2021-12-27 10:03:39');
/*!40000 ALTER TABLE `cabinets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indisponibilitates`
--

DROP TABLE IF EXISTS `indisponibilitates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `indisponibilitates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idmedic` int(11) NOT NULL,
  `tipindisponibilitate` varchar(255) NOT NULL,
  `datastart` date NOT NULL,
  `datastop` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indisponibilitates`
--

LOCK TABLES `indisponibilitates` WRITE;
/*!40000 ALTER TABLE `indisponibilitates` DISABLE KEYS */;
INSERT INTO `indisponibilitates` VALUES (4,12,'ALte activitati','2021-12-24','2022-01-24','2021-12-23 09:35:40','2021-12-23 09:35:40');
/*!40000 ALTER TABLE `indisponibilitates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medics`
--

DROP TABLE IF EXISTS `medics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medics`
--

LOCK TABLES `medics` WRITE;
/*!40000 ALTER TABLE `medics` DISABLE KEYS */;
INSERT INTO `medics` VALUES (12,'Dr. Cirlan Alexandru','Medic specialaist',NULL,NULL,NULL,'E11111',8,'2021-12-23 09:30:11','2021-12-23 09:30:11'),(13,'Dr. Alina GOMOI','Medic specialist',NULL,NULL,NULL,'E01040',9,'2021-12-27 07:30:39','2021-12-27 07:30:39'),(14,'Dr. Florin PETRIA','Medic primar',NULL,NULL,NULL,'A11111',10,'2021-12-27 07:44:18','2021-12-27 07:44:18'),(15,'Dr. Draghici Alexandru','Medic specialist',NULL,NULL,NULL,'A00001',11,'2021-12-27 08:11:33','2021-12-27 08:11:33'),(16,'Dr. Mociofan  Doina','Medic primar',NULL,NULL,NULL,'A00002',11,'2021-12-27 08:15:39','2021-12-27 08:15:39'),(17,'Dr. Florea Marius','Medic primar',NULL,NULL,NULL,'A0003',12,'2021-12-27 08:24:41','2021-12-27 08:24:41'),(18,'Dr. Dragnea Adrian','Medic primar',NULL,NULL,NULL,'A0004',12,'2021-12-27 08:25:06','2021-12-27 08:25:06'),(19,'Dr. Ierima MIhai','Medic specialist',NULL,NULL,NULL,'A0005',12,'2021-12-27 08:26:31','2021-12-27 08:26:31'),(20,'Dr. Gheorghe TUDOR','Medic primar',NULL,NULL,NULL,'A0006',13,'2021-12-27 08:33:26','2021-12-27 08:33:40'),(21,'Dr. Leoveanu Larisa','Medic primar',NULL,NULL,NULL,'D94691',13,'2021-12-27 08:34:22','2021-12-27 08:34:22'),(22,'Dr. Valentin SIMON','Medic specialist',NULL,NULL,NULL,'D87296',14,'2021-12-27 08:43:10','2021-12-27 08:43:10'),(23,'Dr. Lavinia SPIRIDON','Medic specialist',NULL,NULL,NULL,'D99326',14,'2021-12-27 08:43:58','2021-12-27 08:43:58'),(24,'Dr. Mugurel Crasneanu','Medic specialist',NULL,NULL,NULL,'D98171',15,'2021-12-27 08:59:17','2021-12-27 08:59:17'),(25,'Dr. Diaconu Emanoil','Medic primar',NULL,NULL,NULL,'A00010',16,'2021-12-27 09:11:07','2021-12-27 09:11:07'),(26,'Dr. Diaconu Alexandru','Medic specialist',NULL,NULL,NULL,'A00011',16,'2021-12-27 09:11:29','2021-12-27 09:11:29'),(27,'Dr. Nicolescu Iulia','Medic specialist',NULL,NULL,NULL,'A100011',10,'2021-12-27 09:23:55','2021-12-27 09:23:55'),(28,'Dr. Lamba Razvan','Medic specialist',NULL,NULL,NULL,'A1100011',17,'2021-12-27 10:03:22','2021-12-27 10:03:22');
/*!40000 ALTER TABLE `medics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programarises`
--

DROP TABLE IF EXISTS `programarises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programarises`
--

LOCK TABLES `programarises` WRITE;
/*!40000 ALTER TABLE `programarises` DISABLE KEYS */;
INSERT INTO `programarises` VALUES (12,24,12,7,5,13,'2022-01-24','10:00:00','10:15:00',1,0,'activ','2021-12-23 09:48:02','2021-12-23 09:48:02','JGJjcnlwdCR2PTk4JHI9MTAkQ29hSUtLM3FFVmRrY0dTS1dFeVovUSQwd09teCtzZ0ZzNlBZb2dqVTlkcVEyKzNmVFc0dG1J'),(14,27,23,13,11,52,'2021-12-28','11:30:00','11:45:00',2,0,'activ','2021-12-27 11:54:43','2021-12-27 11:54:43','JGJjcnlwdCR2PTk4JHI9MTAka1NYUGtjS2I4UjV3aldkWFdockxndyR1Uzd4cGV6SFhFZWJyRXNMTUtNbittbnBBYVhHS09R'),(15,28,23,13,11,53,'2021-12-29','11:45:00','12:00:00',3,1,'activ','2021-12-27 17:58:32','2021-12-27 17:58:32','JGJjcnlwdCR2PTk4JHI9MTAkZlBLT0FDWW9vdkFnc2ttRVh0aW42dyRkak5JQW5pelo0aDMzSkFVUG5tUXJEV1haNThqLzBR'),(17,30,21,12,10,44,'2022-01-06','11:00:00','11:15:00',4,0,'activ','2021-12-28 08:49:04','2021-12-28 08:49:04','JGJjcnlwdCR2PTk4JHI9MTAkOFMzY0dENy83VXZoZWdmK0FLVFhydyRYMHZFQXltSUNqZFpGZFNoNVExQSt1a3dIQWFTZnl3');
/*!40000 ALTER TABLE `programarises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programs`
--

DROP TABLE IF EXISTS `programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs`
--

LOCK TABLES `programs` WRITE;
/*!40000 ALTER TABLE `programs` DISABLE KEYS */;
INSERT INTO `programs` VALUES (18,8,1,6,'10:00:00','10:15:00',13,'test','2021-12-27 07:33:02','2021-12-27 07:33:02',9),(19,8,2,6,'10:00:00','10:15:00',13,'test','2021-12-27 07:33:16','2021-12-27 07:33:16',9),(20,8,3,6,'10:00:00','10:15:00',13,'test','2021-12-27 07:33:32','2021-12-27 07:33:32',9),(21,8,4,6,'10:00:00','10:15:00',13,'test','2021-12-27 07:37:09','2021-12-27 07:37:09',9),(27,10,1,8,'11:00:00','12:00:00',16,'test','2021-12-27 08:16:56','2021-12-27 08:16:56',11),(28,10,2,8,'11:00:00','12:00:00',15,'test','2021-12-27 08:17:26','2021-12-27 08:17:26',11),(29,10,3,8,'11:00:00','12:00:00',16,'test','2021-12-27 08:19:28','2021-12-27 08:19:28',11),(30,10,4,8,'11:00:00','12:00:00',15,'test','2021-12-27 08:19:53','2021-12-27 08:19:53',11),(31,7,1,5,'13:00:00','14:00:00',12,'test','2021-12-27 08:21:22','2021-12-27 08:21:22',8),(32,7,5,5,'12:00:00','14:00:00',12,'test','2021-12-27 08:21:51','2021-12-27 08:21:51',8),(33,11,4,9,'08:00:00','09:00:00',17,'test','2021-12-27 08:28:55','2021-12-27 08:28:55',12),(34,11,1,9,'08:00:00','09:00:00',18,'test','2021-12-27 08:29:36','2021-12-27 08:29:36',12),(35,11,2,9,'09:00:00','10:00:00',18,'test','2021-12-27 08:30:07','2021-12-27 08:30:07',12),(36,11,4,9,'10:00:00','11:00:00',19,'test','2021-12-27 08:30:39','2021-12-27 08:30:39',12),(37,11,5,9,'10:00:00','11:00:00',19,'test','2021-12-27 08:31:17','2021-12-27 08:31:17',12),(38,12,1,10,'10:00:00','10:15:00',20,'test','2021-12-27 08:36:05','2021-12-27 08:36:05',13),(39,12,2,10,'10:00:00','10:15:00',20,'test','2021-12-27 08:36:29','2021-12-27 08:36:29',13),(40,12,3,10,'10:00:00','10:15:00',20,'test','2021-12-27 08:36:50','2021-12-27 08:36:50',13),(41,12,1,10,'11:00:00','11:15:00',21,'test','2021-12-27 08:37:56','2021-12-27 08:37:56',13),(42,12,2,10,'11:00:00','11:15:00',21,'test','2021-12-27 08:38:46','2021-12-27 08:38:46',13),(43,12,3,10,'11:00:00','11:15:00',21,'test','2021-12-27 08:39:08','2021-12-27 08:39:08',13),(44,12,4,10,'11:00:00','11:15:00',21,'test','2021-12-27 08:39:30','2021-12-27 08:39:30',13),(45,12,5,10,'11:00:00','11:15:00',21,'test','2021-12-27 08:40:26','2021-12-27 08:40:26',13),(51,13,1,11,'11:30:00','12:00:00',23,'test','2021-12-27 08:53:55','2021-12-27 08:53:55',14),(52,13,2,11,'11:30:00','12:00:00',23,'test','2021-12-27 08:54:14','2021-12-27 08:54:14',14),(53,13,3,11,'11:30:00','12:00:00',23,'test','2021-12-27 08:54:33','2021-12-27 08:54:33',14),(54,13,4,11,'11:30:00','12:00:00',23,'test','2021-12-27 08:55:15','2021-12-27 08:55:15',14),(55,13,5,11,'11:30:00','12:00:00',23,'test','2021-12-27 08:55:38','2021-12-27 08:55:38',14),(56,13,1,11,'13:00:00','13:30:00',22,'test','2021-12-27 08:56:03','2021-12-27 08:56:03',14),(57,13,2,11,'13:00:00','13:30:00',22,'test','2021-12-27 08:56:29','2021-12-27 08:56:29',14),(58,13,3,11,'13:00:00','13:30:00',22,'test','2021-12-27 08:56:49','2021-12-27 08:56:49',14),(59,13,4,11,'13:00:00','13:30:00',22,'test','2021-12-27 08:57:18','2021-12-27 08:57:18',14),(60,13,5,11,'13:00:00','13:30:00',22,'test','2021-12-27 08:57:38','2021-12-27 08:57:38',14),(61,14,4,12,'09:00:00','10:00:00',24,'test','2021-12-27 08:59:55','2021-12-27 08:59:55',15),(62,15,1,13,'08:30:00','10:00:00',26,'test','2021-12-27 09:12:11','2021-12-27 09:12:11',16),(63,15,3,13,'08:30:00','10:00:00',25,'test','2021-12-27 09:12:55','2021-12-27 09:12:55',16),(64,9,1,7,'10:00:00','10:20:00',14,'test','2021-12-27 09:20:21','2021-12-27 09:20:21',10),(65,9,2,7,'10:00:00','10:20:00',14,'test','2021-12-27 09:20:47','2021-12-27 09:20:47',10),(66,9,3,7,'10:00:00','10:20:00',14,'test','2021-12-27 09:21:13','2021-12-27 09:21:13',10),(67,9,4,7,'10:00:00','10:20:00',14,'test','2021-12-27 09:21:42','2021-12-27 09:21:42',10),(68,9,5,7,'10:00:00','10:20:00',14,'test','2021-12-27 09:22:51','2021-12-27 09:22:51',10),(69,9,1,7,'11:00:00','11:40:00',27,'test','2021-12-27 09:24:28','2021-12-27 09:24:28',10),(70,9,3,7,'11:00:00','11:40:00',27,'test','2021-12-27 09:24:57','2021-12-27 09:24:57',10),(71,9,4,7,'11:00:00','11:40:00',27,'test','2021-12-27 09:25:26','2021-12-27 09:25:26',10),(72,16,1,14,'10:00:00','10:30:00',28,'test','2021-12-27 10:04:00','2021-12-27 10:04:00',17),(73,16,2,14,'10:00:00','10:30:00',28,'test','2021-12-27 10:04:13','2021-12-27 10:04:13',17),(74,16,3,14,'10:00:00','10:30:00',28,'test','2021-12-27 10:04:29','2021-12-27 10:04:29',17),(75,16,4,14,'10:00:00','10:30:00',28,'test','2021-12-27 10:04:43','2021-12-27 10:04:43',17),(76,16,5,14,'10:00:00','10:30:00',28,'test','2021-12-27 10:04:58','2021-12-27 10:04:58',17);
/*!40000 ALTER TABLE `programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicius`
--

DROP TABLE IF EXISTS `servicius`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicius` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `denumire` varchar(255) NOT NULL,
  `durata` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicius`
--

LOCK TABLES `servicius` WRITE;
/*!40000 ALTER TABLE `servicius` DISABLE KEYS */;
INSERT INTO `servicius` VALUES (5,'Consult ortopedie',15,'2021-12-23 09:29:11','2021-12-23 09:29:11'),(6,'Consultatie ch. plastica',15,'2021-12-27 07:29:58','2021-12-27 07:29:58'),(7,'Consult neurologie',20,'2021-12-27 07:45:06','2021-12-27 07:45:06'),(8,'Consultatie ORL',15,'2021-12-27 07:51:53','2021-12-27 07:51:53'),(9,'Consult chirurgie',15,'2021-12-27 08:23:31','2021-12-27 08:23:31'),(10,'Consult medicina interna',15,'2021-12-27 08:32:56','2021-12-27 08:32:56'),(11,'Consult cardiologie',15,'2021-12-27 08:42:29','2021-12-27 08:42:29'),(12,'Consult Urologie',15,'2021-12-27 08:58:43','2021-12-27 08:58:43'),(13,'Consult oftalmologie',15,'2021-12-27 09:09:14','2021-12-27 09:09:14'),(14,'Radiografie',15,'2021-12-27 10:02:52','2021-12-27 10:02:52');
/*!40000 ALTER TABLE `servicius` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitares`
--

DROP TABLE IF EXISTS `solicitares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitares`
--

LOCK TABLES `solicitares` WRITE;
/*!40000 ALTER TABLE `solicitares` DISABLE KEYS */;
INSERT INTO `solicitares` VALUES (24,'Narcis Brindusescu','Narcis75@gmail.com','0745089013',8,'Prima',1,'2021-12-23 09:45:20','2021-12-23 09:48:02','JGJjcnlwdCR2PTk4JHI9MTAkVWI1YUdkNWpoV3NHcThBTEtJVHBHQSRhV2IyaXorVVNvWFI1Q1NqdTMyMHZNK0ZCa2VhSjBz'),(25,'Brindusescu Stefania','stefania.brindusescu@gmail.com','0745089012',8,'astept confirmarea',1,'2021-12-23 10:01:06','2021-12-23 10:02:23','JGJjcnlwdCR2PTk4JHI9MTAkOVMvdGQ1SkljbkxPQUd6ZkFrU2ZtUSRVTTRXNW9WM09jWkFOUG9uN1Z2VHNSdm91TlVySUY0'),(26,'Petru Brindusescu','Narcis75@yahoo.com','0745089013',8,NULL,NULL,'2021-12-23 10:06:55','2021-12-23 10:06:55','JGJjcnlwdCR2PTk4JHI9MTAkTy9LSG5yV2pZZW9Qa3gvZlJJZ1E0dyRKQ01vVys2MmZkdlAzVDhQVW16cytPLzkvQno5cFdF'),(27,'Stancu Gheorghe','roxana_mihaela2002@yahoo.com','0786185453',14,NULL,1,'2021-12-27 11:53:47','2021-12-27 11:54:43','JGJjcnlwdCR2PTk4JHI9MTAkby96ZG9iYktrZ1lOK0NtdFdZTjRndyRUMUt5bjNqZDVqWDJaSDZ2d0JQSmVyUlNWR0grbFB3'),(28,'Nicolae Florentina Raluca','Ralucanicolae31@gmail.com','0744222720',14,'Am f?cut tensiune 18',1,'2021-12-27 17:48:10','2021-12-27 17:58:32','JGJjcnlwdCR2PTk4JHI9MTAkdEZ5S2hUM2F0UWliajJic2NaSkd5QSRENXZjMWxSZjNuTTA4UlNSR1MwSXU4RUx2YTdtT1pJ'),(29,'Iordache Daniela','dana030174@gmail.com','0723223783',13,NULL,1,'2021-12-28 08:41:23','2021-12-28 08:45:55','JGJjcnlwdCR2PTk4JHI9MTAkd2tVVENYb3c4QWJNaGVoYi9PMVhlQSQwajNLZzllTlB6WGdyaGxMZnRxeUVJeWxER1A4QUFr'),(30,'Iordache Daniela','dana030174@gmail.com','0723223783',13,NULL,1,'2021-12-28 08:48:03','2021-12-28 08:49:04','JGJjcnlwdCR2PTk4JHI9MTAkQTBuaDZBbEdMR0daUlI1OWk1VUNFQSRiMmNsZi9VY25PUlJKdW5FR2pVL2VPOGx1L25Yc3E4');
/*!40000 ALTER TABLE `solicitares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialitates`
--

DROP TABLE IF EXISTS `specialitates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialitates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `denumire` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialitates`
--

LOCK TABLES `specialitates` WRITE;
/*!40000 ALTER TABLE `specialitates` DISABLE KEYS */;
INSERT INTO `specialitates` VALUES (8,'Ortopedie','2021-12-23 09:28:40','2021-12-23 09:28:40'),(9,'Chirurgie plastica','2021-12-27 07:29:12','2021-12-27 07:29:12'),(10,'Neurologie','2021-12-27 07:42:47','2021-12-27 07:42:47'),(11,'ORL','2021-12-27 07:50:46','2021-12-27 07:50:46'),(12,'Chirurgie generala','2021-12-27 08:23:06','2021-12-27 08:23:06'),(13,'Medicina interna','2021-12-27 08:32:30','2021-12-27 08:32:30'),(14,'Cardiologie','2021-12-27 08:41:44','2021-12-27 08:41:44'),(15,'Urologie','2021-12-27 08:58:25','2021-12-27 08:58:25'),(16,'Oftalmologie','2021-12-27 09:08:51','2021-12-27 09:08:51'),(17,'Radioimagistica','2021-12-27 10:02:34','2021-12-27 10:02:34');
/*!40000 ALTER TABLE `specialitates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,NULL,'Mirica Mihaita','admin1','admin','$bcrypt$v=98$r=10$RdI3jEr1JxnINGkWkJo/2Q$H09elIsw9c+0Kyh1Y5q4gcVvBr7FW/E','2021-12-16 08:53:20','2021-12-16 08:53:20'),(5,NULL,'Dumitrescu Ionel','admin2','admin','$bcrypt$v=98$r=10$qSvEwAKbhxv+9vWu6bTRGg$piMll/66YTdndSzfulV/CyW8S9GXDQ4','2021-12-16 11:46:33','2021-12-16 11:46:33'),(6,NULL,'Narcis Brindusescu','admin3','admin','$bcrypt$v=98$r=10$4mT5QP3oUmkjPGLyQvwCdw$Ic815qGJ1vtWRzNnEMiKI1hQkUV5A+E','2021-12-16 11:47:10','2021-12-16 11:47:10'),(7,NULL,'As. sef Ortopedie','orto','operator','$bcrypt$v=98$r=10$xWOrTBRaIUXaZjR0v4bSVQ$Vnsx+6HAt7mxwavUvJd/QsRB4LnySzM','2021-12-23 09:31:41','2021-12-23 09:31:41'),(8,NULL,'As. sef Ch Plastica','plastica','operator','$bcrypt$v=98$r=10$IamGRVG5opkbUlsh48OUGw$l8iwdHvOh594MpoNgddiTs2HGAxzEh4','2021-12-27 07:28:59','2021-12-27 07:28:59'),(9,NULL,'As sef Neuro','neuro','operator','$bcrypt$v=98$r=10$ckxya7vcc0l3X5ZW3E1wrg$KX9+Q3hHibnzuy8eUMBBFk8XIJI9i+s','2021-12-27 07:42:37','2021-12-27 07:42:37'),(10,NULL,'As sef ORL','orl','operator','$bcrypt$v=98$r=10$lwTkwzfF0R9W6S+sUDDvtg$HorEU0jH8xIEJmzY4uslxWW2LLBp5HI','2021-12-27 07:48:56','2021-12-27 07:48:56'),(11,NULL,'As. sef Chir','chir','operator','$bcrypt$v=98$r=10$o3EDVwWQ5UDOZvn3HWYJkg$TY/ACTCoQSu5Iyf9HDqDBPVWuuMZkFI','2021-12-27 08:22:51','2021-12-27 08:22:51'),(12,NULL,'As. sef medicala','medicala','operator','$bcrypt$v=98$r=10$QBs90RkpVUtlpStEz2eAgA$ylizU17Sj6MK8EO3O9ontc5OEVumTnI','2021-12-27 08:32:17','2021-12-27 08:32:17'),(13,NULL,'As sef Cardio','cardio','operator','$bcrypt$v=98$r=10$cS/SgeC0ycJUcSUa9rfJiA$SFFC3JmXW2CysXVXHNGHK37rc2YemR4','2021-12-27 08:41:34','2021-12-27 08:41:34'),(14,NULL,'As. sef URO','uro','operator','$bcrypt$v=98$r=10$dBm4B8JNGQL5hfXXfKuUPw$4ekZdhputtFf9S+OeJfrWUOvAAgX7qE','2021-12-27 08:58:14','2021-12-27 08:58:14'),(15,NULL,'As sef Oftalmo','oftalmo','operator','$bcrypt$v=98$r=10$tbmIJWPvhbXyQbQFRUSDAQ$fRQjyvdAgj4e/8wRW4gsjEVyw1z7Znc','2021-12-27 09:08:39','2021-12-27 09:08:39'),(16,NULL,'As sef RADIO','radio','operator','$bcrypt$v=98$r=10$X7o5dPQl9bE+wTgyHdM1iA$qd1/guWPTHasEDTY781iuNgS2alyMNY','2021-12-27 10:02:16','2021-12-27 10:02:16');
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

-- Dump completed on 2021-12-28 18:09:53
