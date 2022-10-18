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
  `numePR` varchar(45) DEFAULT NULL,
  `telPR` varchar(15) DEFAULT NULL,
  `emailPR` varchar(45) DEFAULT NULL,
  `website` varchar(45) DEFAULT NULL,
  `urlpol` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `slug` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;


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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;


====== pt diacritice si STARTED
ALTER TABLE `pols`.`specialitates` 
CHARACTER SET = utf8mb4 , COLLATE = utf8mb4_unicode_ci ,
CHANGE COLUMN `denumire` `denumire` VARCHAR(255) CHARACTER SET 'utf8mb4' NULL DEFAULT NULL ,
ADD COLUMN `stare` VARCHAR(45) NOT NULL DEFAULT 'activ' AFTER `idclinica`;

