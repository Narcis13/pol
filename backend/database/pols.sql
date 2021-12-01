CREATE DATABASE  IF NOT EXISTS `pols` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `pols`;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cabinets`
--

LOCK TABLES `cabinets` WRITE;
/*!40000 ALTER TABLE `cabinets` DISABLE KEYS */;
INSERT INTO `cabinets` VALUES (1,'Cabinet ORL',1,NULL,NULL,'Luni: 08.00-15.00;Marti: 09.15-14.20','2021-11-30 10:31:42','2021-11-30 10:31:42'),(2,'Cabinet Psihiatrie 1',1,'sfsdaasdfasdf asdf asdf asdf asdf asdfasd fasdf asdf asd fasdjfkhasdkhfkjamsdfkjasdhfjkahsdkfhasdkj fhaksjdhf kjasdhf kajsdhf kjasdhfkasdjhfkajsdhfkjasd hfkjasdhf kjasdhfkjasdhfkjasdhf kjasdhf kjasdhfkjasdhfkjasdh fkahskdjfhaskdfiueryhfJSDNfgndsakjhfbvjshdgvbkjsdhvkjadshfkjasdkljfh askdjfhasdkhfaksdfhaskdjhfkasjdhfkajsdhfkjasdhfkjashd kasjdhfkjasdhfkjasdhfkjahsdkjfhasdkjfhasdkjhfkajsdhfkjasdh fbaksdjfhasdkjfh askdjhf kajsdhfkasdjhfkjasdh fkjasdhf kjasdh fkajsdhf kjasdhfkjasdhfkjasdhfkjhasdkjfha kkjfasdhf kjasdhfkasjdhfkjasdhfkjsdkfusdjhghfhuysdgfabsdhjkbfkjsdcsdbcsdjbckjhsdbckjsdhbbhsdckhjsdbcksdjhbcsjkdhbchjksdbjksdcyhbsbbbbbkbsdhjbcsdkjhcbksdjhgbcljhksd jsdhgcsdhkjgc jhsdgchkjsdgc sdkhcjsgdckjhsdgskhdjgfjhfgkjhsd fsdkhj fskdhjggfsdkhgfskdhj fsdkhjgfskdjhgfkjsdhgfhkjsdgfsdjkhdfgjsdhyejkfgskdjfgbsdhjfg bsdkhjf gksdhj fgksdhfgskdjgfksdjhgfksysegksjhgdfhsdkjhbfsjdlkfjbsdlfsdhjcbsdlcjg lkjsdhcksjhdlgkchjsdkjlhcsdkhj cksjhd sdkjh dshkjgfkjsdgf sdkjhf gsdkjhfg sdkjhfg ksjdhgf khjsdgf ksdjhfg khjsdgfkhjgsdkjhfgshdkjkfglskfhjgsdhj fsdkjhg fkjshdgf kjhsdgf kjsdhgfkjsdgf kjhsdg kjhsdgfkjsdgf hsjd fggjkshdgfhkjs fkjsdh fskdjhgf skdjhf gsdkjhgfkjhsdgf kjhsdlhkfg ksjhdgf skhjdf gkjhsdfg kjhsdgg fkjhsdgf kjhsdgf kjhsdgf kjhsdgf kjhsdgf khjsdgf skjhdg kjhsdg fkjhsdg fhjkgsd hfkjsd fgkshjdf kjhsgd fkhjsdgbfkjsdhgkfgskdhjf gksjhdg kjshdgf khjsdfgkhjsdgf kjhsdgf khjsdgf jkhsdgf khsjdgf kjhsdf skdjhg jhskdg fkjhsdghjsdgfkhjsdg f',NULL,'Luni: 08.00-15.00;Marti: 09.15-14.20','2021-11-30 10:41:50','2021-11-30 10:49:19');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indisponibilitates`
--

LOCK TABLES `indisponibilitates` WRITE;
/*!40000 ALTER TABLE `indisponibilitates` DISABLE KEYS */;
INSERT INTO `indisponibilitates` VALUES (1,2,'CM','2021-12-01','2021-12-01','2021-11-25 15:27:40','2021-11-25 15:32:22');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medics`
--

LOCK TABLES `medics` WRITE;
/*!40000 ALTER TABLE `medics` DISABLE KEYS */;
INSERT INTO `medics` VALUES (1,'Dr. Tudor Gheorghe','Medic primar',NULL,NULL,NULL,'A131313',NULL,'2021-11-25 10:17:48','2021-11-25 10:17:48'),(2,'Dr. Ierima Mihai','Medic specialist',NULL,NULL,NULL,'A131314',NULL,'2021-11-25 10:18:33','2021-11-25 10:18:33');
/*!40000 ALTER TABLE `medics` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs`
--

LOCK TABLES `programs` WRITE;
/*!40000 ALTER TABLE `programs` DISABLE KEYS */;
INSERT INTO `programs` VALUES (1,1,1,2,'08:00:00','09:45:00',2,'test','2021-12-01 11:48:33','2021-12-01 11:50:34');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicius`
--

LOCK TABLES `servicius` WRITE;
/*!40000 ALTER TABLE `servicius` DISABLE KEYS */;
INSERT INTO `servicius` VALUES (1,'Consulatie medicina interna',20,'2021-11-24 13:23:50','2021-11-24 13:23:50'),(2,'Consultatie chirurgie generala',50,'2021-11-24 13:24:42','2021-11-24 14:32:47');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitares`
--

LOCK TABLES `solicitares` WRITE;
/*!40000 ALTER TABLE `solicitares` DISABLE KEYS */;
INSERT INTO `solicitares` VALUES (1,'Popa Ionut','sdasda@gmail.com','0745088741',3,NULL,NULL,'2021-11-26 17:13:39','2021-11-26 17:13:39',NULL),(2,'popesdc iiuiuuyh','sdsdff@ddd.com','074545555',3,NULL,NULL,'2021-11-26 17:13:58','2021-11-26 17:13:58',NULL),(3,'popp ujuyuuj','saxdasda@sdfsf.com','0714545741',2,'sadsfsdfsdf sdf',NULL,'2021-11-28 22:31:37','2021-11-28 22:31:37',NULL),(4,'popop asdasd','sdfsdf@qaz.asa','0741147741',3,'sadasdas',NULL,'2021-11-28 22:56:50','2021-11-28 22:56:50','$argon2id$v=19$t=3,m=4096,p=1$S6qKwD2q3KGhm7b85IDrhQ$3gluibnnwiqTnDodaP3vDAR4ltAqMLONFfXrjyUNiME'),(5,'dwerqwe wwww','sdfsdf@qaz.asa','0741147874',4,'sdfsdfsdf',NULL,'2021-11-28 22:58:01','2021-11-28 22:58:01','$argon2id$v=19$t=3,m=4096,p=1$ajGpDct1v1sUeBQlnQnZ0A$MRDzen+szpjt4LBNe/eXWPdPAvp+iRd18+d13YufTjU'),(6,'wewewew qqqq','sadsa@qaz.com','0741546547',4,'sadsa',NULL,'2021-11-28 23:03:11','2021-11-28 23:03:11','$argon2id$v=19$t=3,m=4096,p=1$4b5GxcH8sgfElkIrQlgEzA$6rBui4xw4yzBdy5wwqdP8kTOka2eH6nvN76QtPZVKHc'),(7,'Popescu Darius','narcis75@gmail.com','0745089013',3,'dddddddd',NULL,'2021-11-28 23:05:31','2021-11-28 23:05:31','$argon2id$v=19$t=3,m=4096,p=1$IqhaIv+j63dT9u0YrroUpg$8H4SC4grTUOP1RTR0ay4d00V1b1IEyHaXlbmEJ99PEc'),(8,'Nicolescu Teodor','narcis75@gmail.com','0745588417',4,'sdfsdfsdf',NULL,'2021-11-29 16:31:39','2021-11-29 16:31:39','$argon2id$v=19$t=3,m=4096,p=1$ApZBpxgjT32t7F0slOSmCw$bgVAZoH+X58cKXt+AhWyHsVX7wSWeQXCOyJ3z2VIUrw'),(9,'ionescu floarea','ddssds@ddd.com','0745014414',4,NULL,NULL,'2021-11-29 17:07:19','2021-11-29 17:07:19','$argon2id$v=19$t=3,m=4096,p=1$EmZTPjvBhlvchilusJLTYA$Xg6ZVvmvw8GuSuqmRPP3MoHK/lnphNHLqjuh76/SHpE'),(10,'popica vali','aaaaaaa@sadfsafds.com','0745089014',4,NULL,NULL,'2021-11-29 17:08:04','2021-11-29 17:08:04','$argon2id$v=19$t=3,m=4096,p=1$qzVBV2aLfITyeskPgzgy2w$Orr2eOrXRjdPxck4CyjPr94RhO5McrMp9rzJoqkLQCU'),(11,'Dilimescu Dili','narcis75@gmail.com','0745089012',4,'zx',NULL,'2021-11-29 17:18:22','2021-11-29 17:18:22','$argon2id$v=19$t=3,m=4096,p=1$y8TePE7VgUDmxT6hL0EUMw$htRky6XQtgklSCIcrCfLvnRwGas4c1ULu5AGuh3Jleo'),(12,'popa ionut','sasaaa@qaz.de','0745088741',4,NULL,NULL,'2021-11-29 17:22:20','2021-11-29 17:22:20','$argon2id$v=19$t=3,m=4096,p=1$LDnfOC1KbTHeXOxMWjsu8Q$3haXHQAaZWnGoqSoWJvkhL41NOmwQDAAmI2qkLb+ILg'),(13,'Popa Dan','kaka@maka.de','0745014014',3,'sdfsdfsdf sdf',NULL,'2021-12-01 14:45:33','2021-12-01 14:45:33','$argon2id$v=19$t=3,m=4096,p=1$KRORhuYOk0KXpJuqzjSbTw$ClMYEC+5rodq7fYi3gu0TfCDH1aNNF916SZ6hL7iuLA'),(14,'Bunescu Ovidiu','narcis75@gmail.com','0745014444',5,'sdf',NULL,'2021-12-01 14:46:41','2021-12-01 14:46:41','$argon2id$v=19$t=3,m=4096,p=1$wsBfFCJ0iv9hUVAETS2+mA$BtlapfFNJFirRkQJxV0dp1ju1mfph0FNjRltUE8yMAM');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialitates`
--

LOCK TABLES `specialitates` WRITE;
/*!40000 ALTER TABLE `specialitates` DISABLE KEYS */;
INSERT INTO `specialitates` VALUES (2,'ORL','2021-11-24 10:47:24','2021-11-24 10:47:24'),(3,'Medicina interna','2021-11-24 10:47:39','2021-11-24 10:47:39'),(4,'Chirurgie generala','2021-11-24 10:47:54','2021-11-24 10:53:41'),(5,'Neurologie','2021-11-30 10:20:29','2021-11-30 10:20:29'),(6,'Psihiatrie','2021-11-30 10:21:03','2021-11-30 10:21:21');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'me@me.me','Narcis Brindusescu','admin','admin','$argon2id$v=19$t=3,m=4096,p=1$OZZabmS5RrPaQ7aZ5/rdYA$TsOR6bX8OhGjZ/rnAPQDvGRxw+yA+wOu+lVlygzKebQ','2021-11-23 10:17:37','2021-11-23 10:17:37'),(2,NULL,'As. Carmen Roman','medicala','operator','$argon2id$v=19$t=3,m=4096,p=1$cwNVFSCkXQLW05BjtSz8Vg$lZRxMavSSRXT79NkOio2yPwOBgCz81Zfz9JjGWf5JNo','2021-12-01 15:06:48','2021-12-01 15:06:48');
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

-- Dump completed on 2021-12-01 19:02:26
