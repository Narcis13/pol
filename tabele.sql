CREATE TABLE `api_tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_tokens_token_unique` (`token`),
  KEY `api_tokens_user_id_foreign` (`user_id`),
  CONSTRAINT `api_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=347 DEFAULT CHARSET=latin1;

CREATE TABLE `cabinets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `denumire` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `idoperator` int(11) NOT NULL,
  `dotare` mediumtext CHARACTER SET latin1,
  `servicii` mediumtext CHARACTER SET latin1,
  `orar` mediumtext CHARACTER SET latin1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `stare` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT 'activ',
  `urlpoza` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT '/cabinete/cabinet.png',
  `idclinica` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `clinicas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `denumire` varchar(100) NOT NULL,
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
  `numepr` varchar(45) DEFAULT NULL,
  `telpr` varchar(15) DEFAULT NULL,
  `emailpr` varchar(45) DEFAULT NULL,
  `website` varchar(45) DEFAULT NULL,
  `urlpol` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `slug` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

CREATE TABLE `indisponibilitates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idmedic` int(11) NOT NULL,
  `tipindisponibilitate` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `datastart` date NOT NULL,
  `datastop` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `idclinica` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `medics` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nume` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `grad` varchar(255) CHARACTER SET latin1 NOT NULL,
  `competente` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `urlpoza` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `mail` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `codparafa` varchar(255) CHARACTER SET latin1 NOT NULL,
  `idspecialitate` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `idclinica` int(10) NOT NULL,
  `stare` varchar(45) CHARACTER SET latin1 DEFAULT 'activ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `idclinica` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2849 DEFAULT CHARSET=latin1;

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
  `idclinica` int(11) NOT NULL,
  `tip` varchar(10) NOT NULL DEFAULT 'online',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=latin1;

CREATE TABLE `sarbatoares` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `detalii` varchar(45) CHARACTER SET utf8mb4 DEFAULT 'Sărbătoare legală',
  `zi` int(11) NOT NULL,
  `luna` int(11) NOT NULL,
  `idclinica` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `satisfactias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idclinica` int(11) NOT NULL,
  `impresie` varchar(100) DEFAULT NULL,
  `sectie` varchar(100) DEFAULT NULL,
  `primainternare` varchar(100) DEFAULT NULL,
  `cunostintadrepturi` varchar(100) DEFAULT NULL,
  `respectaredrepturi` varchar(100) DEFAULT NULL,
  `motivaredrepturi` text,
  `informarereguli` varchar(100) DEFAULT NULL,
  `insotitor` varchar(100) DEFAULT NULL,
  `calitateconditii` varchar(100) DEFAULT NULL,
  `curatenie` varchar(100) DEFAULT NULL,
  `atitudinecpu` varchar(100) DEFAULT NULL,
  `atitudineprimire` varchar(100) DEFAULT NULL,
  `timpacordat` varchar(100) DEFAULT NULL,
  `calitatemedic` varchar(100) DEFAULT NULL,
  `calitateasistente` varchar(100) DEFAULT NULL,
  `calitateinfirmiere` varchar(100) DEFAULT NULL,
  `amabilitate` varchar(100) DEFAULT NULL,
  `disponibilitate` varchar(100) DEFAULT NULL,
  `calitatemasa` varchar(100) DEFAULT NULL,
  `distribuirehrana` varchar(100) DEFAULT NULL,
  `ingrijirepostoperatorie` varchar(100) DEFAULT NULL,
  `insotitoraltesectii` varchar(100) DEFAULT NULL,
  `transport` varchar(100) DEFAULT NULL,
  `administraremedicamente` varchar(100) DEFAULT NULL,
  `supraveghereadministrare` varchar(100) DEFAULT NULL,
  `provenientamedicatie` varchar(100) DEFAULT NULL,
  `aspectsalon` varchar(100) DEFAULT NULL,
  `aspectspatii` varchar(100) DEFAULT NULL,
  `aspectcurte` varchar(100) DEFAULT NULL,
  `calitateinformatii` varchar(100) DEFAULT NULL,
  `calitatecomunicare` varchar(100) DEFAULT NULL,
  `reinternare` varchar(100) DEFAULT NULL,
  `recomandare` varchar(100) DEFAULT NULL,
  `observatii` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE `servicius` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `denumire` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `durata` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `idclinica` int(10) NOT NULL,
  `stare` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'activ',
  `tarif` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `solicitares` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nume` varchar(255) NOT NULL,
  `email` varchar(255) CHARACTER SET latin1 NOT NULL,
  `telefon` varchar(255) CHARACTER SET latin1 NOT NULL,
  `idspecialitate` int(11) NOT NULL,
  `mesaj` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `confirmat` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `hash` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `idclinica` int(10) NOT NULL,
  `tip` varchar(10) DEFAULT 'online',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5516 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `specialitates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `denumire` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `idclinica` int(10) NOT NULL,
  `stare` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'activ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `numeintreg` varchar(255) NOT NULL,
  `nume` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `idclinica` int(10) NOT NULL,
  `stare` varchar(45) DEFAULT 'activ',
  `createdby` int(10) NOT NULL DEFAULT '0',
  `numeunic` varchar(255) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;


