-- MySQL dump 10.16  Distrib 10.1.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: alteregaux
-- ------------------------------------------------------
-- Server version	10.1.34-MariaDB-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `document` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `categorie` char(100) NOT NULL,
  `libelle` char(100) NOT NULL,
  `nature` char(100) NOT NULL,
  `chemin` char(100) DEFAULT NULL,
  `miniature` char(100) DEFAULT NULL,
  `lienhttp` char(250) DEFAULT NULL,
  `datereation` datetime DEFAULT NULL,
  `user` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` VALUES (2,'Egalite','Livret mixicamp','Document PDF','/asset/docs/egalite/livret-mixicampV1.pdf','/asset/docs/egalite/livret-mixicampV1.png','/asset/docs/egalite/livret-mixicampV1.pdf','2018-08-09 00:00:00','yasser');
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evenement`
--

DROP TABLE IF EXISTS `evenement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evenement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(100) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `lien` varchar(250) DEFAULT NULL,
  `cheminminiature` varchar(250) DEFAULT NULL,
  `cheminaffiche` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evenement`
--

LOCK TABLES `evenement` WRITE;
/*!40000 ALTER TABLE `evenement` DISABLE KEYS */;
INSERT INTO `evenement` VALUES (1,'Nuit de la belle étoile','Passer une nuit en groupe pour admirer le ciel illuminé par les étoiles','/asset/docs/evenements/guide/nbe_guide.pdf','/asset/docs/evenements/min/nbe_min.png','/asset/docs/evenements/affiche/nbe_affiche.pdf'),(2,'Journée trapeur','Journée trapeur','/asset/docs/evenements/guide/jt_guide.pdf','/asset/docs/evenements/min/jt_min.png','/asset/docs/evenements/affiche/jt_affiche.pdf'),(3,'Journée curiosité','Journée curiosité','/asset/docs/evenements/guide/jc_guide.pdf','/asset/docs/evenements/min/jc_min.png','/asset/docs/evenements/affiche/jc_affiche.pdf');
/*!40000 ALTER TABLE `evenement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outil`
--

DROP TABLE IF EXISTS `outil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `outil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(100) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `lien` varchar(250) DEFAULT NULL,
  `dateajout` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outil`
--

LOCK TABLES `outil` WRITE;
/*!40000 ALTER TABLE `outil` DISABLE KEYS */;
/*!40000 ALTER TABLE `outil` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-05 22:21:17
