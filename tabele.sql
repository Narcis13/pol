CREATE TABLE `clinici` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `denumire` varchar(45) NOT NULL,
  `fisiersigla` varchar(45) DEFAULT NULL,
  `adresa` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `facebook` varchar(45) DEFAULT NULL,
  `instagram` varchar(45) DEFAULT NULL,
  `youtube` varchar(45) DEFAULT NULL,
  `numeconducere1` varchar(45) DEFAULT NULL,
  `numeconducere2` varchar(45) DEFAULT NULL,
  `numeconducere3` varchar(45) DEFAULT NULL,
  `telconducere1` varchar(15) DEFAULT NULL,
  `telconducere2` varchar(15) DEFAULT NULL,
  `telconducere3` varchar(15) DEFAULT NULL,
  `emailconducere1` varchar(45) DEFAULT NULL,
  `emailconducere2` varchar(45) DEFAULT NULL,
  `emailconducere3` varchar(45) DEFAULT NULL,
  `numePR` varchar(45) DEFAULT NULL,
  `telPR` varchar(15) DEFAULT NULL,
  `emailPR` varchar(45) DEFAULT NULL,
  `website` varchar(45) DEFAULT NULL,
  `urlpol` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
