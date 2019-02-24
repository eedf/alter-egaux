-- MySQL dump 10.16  Distrib 10.1.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: alteregaux
-- ------------------------------------------------------
-- Server version	10.1.38-MariaDB-0ubuntu0.18.04.1

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
-- Table structure for table `action`
--

DROP TABLE IF EXISTS `action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `action` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupename` varchar(50) DEFAULT NULL,
  `branche` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `lieu` varchar(50) DEFAULT NULL,
  `partenaires` varchar(50) DEFAULT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `datajout` datetime DEFAULT NULL,
  `ipaddress` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `action`
--

LOCK TABLES `action` WRITE;
/*!40000 ALTER TABLE `action` DISABLE KEYS */;
/*!40000 ALTER TABLE `action` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` VALUES (2,'Egalite','Livret mixicamp','Document PDF','/docs/egalite/livret-mixicampV1.pdf','/docs/egalite/livret-mixicampV1.png','/docs/egalite/livret-mixicampV1.pdf','2018-08-09 00:00:00','yasser'),(3,'Sante','Revue éclés Routes Nouvelles n° 259','Document PDF','/docs/sante/RN259_SANTE_ete2018_bd.pdf','/docs/sante/RN259_SANTE_ete2018_bd.png','/docs/sante/RN259_SANTE_ete2018_bd.pdf','2018-10-05 04:55:09','yasser'),(4,'Environnement','Kit de projets environnementals','Document PDF','/docs/environnement/KIT_ENVIRONNEMENT.pdf','/docs/environnement/KIT_ENVIRONNEMENT.png','/docs/environnement/KIT_ENVIRONNEMENT_&_KIT_GENERAL.zip','2018-10-28 13:40:22','yasser'),(5,'Interculturel','Kit de projets interculturels','Document PDF','/docs/interculturel/KIT_INTERCULTUREL.pdf','/docs/interculturel/KIT_INTERCULTUREL.png','/docs/interculturel/KIT_INTERCULTUREL_&_KIT_GENERAL.zip','2018-10-28 13:42:25','yasser'),(6,'Environnement','Kit général','Document PDF','/docs/KIT_GENERAL.pdf','/docs/KIT_GENERAL.png',NULL,'2018-11-11 21:24:36','yasser'),(7,'Interculturel','Kit général','Document PDF','/docs/KIT_GENERAL.pdf','/docs/KIT_GENERAL.png',NULL,'2018-11-11 21:25:01','yasser');
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
  `chemininvitation` varchar(250) DEFAULT NULL,
  `dateajout` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evenement`
--

LOCK TABLES `evenement` WRITE;
/*!40000 ALTER TABLE `evenement` DISABLE KEYS */;
INSERT INTO `evenement` VALUES (1,'Nuit de la belle étoile','Passer une nuit en groupe pour admirer le ciel illuminé par les étoiles','/docs/evenements/guide/nbe_guide.pdf','nbe_min.png','/docs/evenements/affiche/nbe_affiche.pdf','/docs/evenements/invitation/Invitation nuit belle etoile.pdf',NULL),(2,'Journée trapeur','Journée trapeur','/docs/evenements/guide/jt_guide.pdf','jt_min.png','/docs/evenements/affiche/jt_affiche.pdf','/docs/evenements/invitation/Invitation journée trappeur.pdf',NULL),(3,'Journée curiosité','Journée curiosité','/docs/evenements/guide/jc_guide.pdf','jc_min.png','/docs/evenements/affiche/jc_affiche.pdf','/docs/evenements/invitation/Invitation journée curiosité.pdf',NULL),(4,'Guide rentrée 2018','Guide rentrée 2018','/docs/evenements/guide/jr_guide.pdf','afficherentree.png','/docs/evenements/affiche/jr_affiche.pdf','/docs/evenements/invitation/Invitation Rentree2018.pdf',NULL);
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
  `apercu` varchar(250) DEFAULT NULL,
  `dateajout` datetime DEFAULT NULL,
  `lien` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outil`
--

LOCK TABLES `outil` WRITE;
/*!40000 ALTER TABLE `outil` DISABLE KEYS */;
INSERT INTO `outil` VALUES (2,'Polices (Alter-Egaux)','Polices à utiliser pour les documents Alter-Egaux. TrashHand pour les titres et Calibre pour le texte courant.','polices.png','2018-09-09 22:01:09','http://www.eedf.fr/download/31194/polices---alter-egaux.html'),(3,'Charte graphique Alter-Egaux','N/A','chartegraphique.png','2018-09-09 22:01:36','http://www.eedf.fr/download/31195/charte-graphique---alter-egaux.html'),(4,'Pictogrammes ODD (Format Carré)','Les pictogrammes de l\'ONU adaptés par les EEDF pour le projet Alter-égaux. ','pictos.png','2018-09-09 22:01:56','http://www.eedf.fr/download/30269/pictogrammes-odd---format-carre.html'),(5,'Pictogrammes ODD (Format Rond)','Les pictogrammes de l\'ONU adaptés par les EEDF pour le projet Alter-égaux. ','pictos.png','2018-09-09 22:02:18','http://www.eedf.fr/download/30270/pictogrammes-odd---format-rond.html'),(6,'Affiche Nuit de la belle étoile','N/A','affichenbe.png','2018-09-09 22:02:46','http://www.eedf.fr/download/31212/affiche-nuit-de-la-belle-etoile.html'),(7,'Affiche NBE (Infos et contact)','Complément à insérer sous l\'affiche Nuit de la belle étoile, pour indiquer le lieu et la date de l\'événement ainsi que le contact du groupe. Fichier personnalisable sous Powerpoint. ','affichenbeinfo.png','2018-09-09 22:03:13','http://www.eedf.fr/download/31193/affiche-nbe---infos-et-contact.html'),(8,'Guide - Nuit de la belle étoile','N/A','guidenbe.png','2018-09-09 22:03:45','http://www.eedf.fr/download/31191/guide---nuit-de-la-belle-etoile.html'),(9,'Guide - Journée Trappeur','N/A','guidejt.png','2018-09-09 22:04:10','http://www.eedf.fr/download/32625/guide---journee-trappeur.html'),(10,'Guide - Journée de la curiosité','N/A','guidejc.png','2018-09-09 22:04:33','http://www.eedf.fr/download/32626/guide---journee-de-la-curiosite.html'),(11,'Personnages de l\'histoire Alter-Egaux','Fichier compressé contenant les images des personnages de l\'histoire Alter-Egaux','personnages.png','2018-09-09 22:05:22','/asset/docs/tools/personnages-alter-egaux.zip');
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

-- Dump completed on 2019-02-24  7:08:43
